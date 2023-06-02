import * as THREE from 'three'
import { BehaviorToFacial } from './FacialEmotionMap'

import LipSync from './LipSync'
import Facial from './Facial'

const MODELS_URI_PREFIX = 'https://assets.inworld.ai/models'
const ANIMATION_FADE_TIME_S = 0.5
const END_TALKING_DEBOUNCE_TIME_MS = 500

class Animation {
  bind() {
    this.startIdleAnimation = this.startIdleAnimation.bind(this)
    this.startTalkingAnimation = this.startTalkingAnimation.bind(this)
  }
  constructor({ model }) {
    this.bind()

    this.animations = [
      'TalkingNeutral2',
      'TalkingNeutral3',
      'TalkingNeutral4',
      'TalkingNeutral5',
      'TalkingNeutral6',
      'TalkingNeutral7',
    ]

    this.talkingCountDown = 0
    this.animationClips = {}
    this.model = model
    this.mixer = new THREE.AnimationMixer(model)
    this.head = model.getObjectByName('Head')

    this.loadIdleAnimation()
    this.loadTalkingAnimation()

    LipSync.init({ animations: this })
    Facial.init()
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  async loadIdleAnimation() {
    try {
      const idleResponse = await fetch(
        `${MODELS_URI_PREFIX}/idle/IdleNeutral.json`
      )

      const idle = await idleResponse.json()
      const animationClip = THREE.AnimationClip.parse(idle[0])

      this.animationClips['Idle'] = animationClip

      this.startIdleAnimation()
    } catch (error) {
      console.log('Failed: load idle animation', { error })
    }
  }

  async loadTalkingAnimation() {
    try {
      await Promise.all(
        this.animations.map((name) =>
          fetch(`${MODELS_URI_PREFIX}/talking/${name}.json`).then(
            async (response) => {
              const clip = await response.json()
              const animationClip = THREE.AnimationClip.parse(clip[0])
              this.animationClips[name] = animationClip
            }
          )
        )
      )
    } catch (error) {
      console.log('Failed: load talking animations', { error })
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  startIdleAnimation() {
    this.playStill('Idle')
  }

  startTalkingAnimation() {
    if (this.idleTimeout !== null) {
      clearTimeout(this.idleTimeout)
    }

    let clipName = ''
    while (!clipName || clipName === this.lastClipName) {
      clipName = this.getTalkingClipName()
    }

    if (this.mixer) {
      if (this.lastClipName) {
        this.mixer
          .clipAction(this.animationClips[this.lastClipName])
          .fadeOut(ANIMATION_FADE_TIME_S)
      }
      this.mixer
        .clipAction(this.animationClips[clipName])
        .reset()
        .fadeIn(ANIMATION_FADE_TIME_S)
        .setLoop(THREE.LoopPingPong, 20)
        .play()
      this.lastClipName = clipName
    }
  }

  playStill(name = 'Idle', fadeInTime = 0.5) {
    if (this.talkingCountDown > 0 || this.lastClipName === 'Idle') return

    if (this.lastClipName) {
      this.mixer
        .clipAction(this.animationClips[this.lastClipName])
        .fadeOut(ANIMATION_FADE_TIME_S)
    }

    let clipName = name
    if (this.animationClips[clipName]) {
      const clip = this.animationClips[clipName]

      const durationSeconds = clip.duration

      this.mixer.clipAction(clip).reset().fadeIn(fadeInTime).play()

      this.lastClipName = clipName
      this.idleTimeout = setTimeout(
        this.startIdleAnimation,
        durationSeconds * 1000
      )
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  getTalkingClipName() {
    // At least 2 animations to rotate!
    if (this.animations.length < 2) return ''

    return this.animations[
      Math.floor(Math.random() * (this.animations.length - 1))
    ]
  }

  setEmotionEvent(emotionEvent) {
    this.emotionEvent = emotionEvent

    this.emotion = BehaviorToFacial[emotionEvent.behavior.code]
  }

  setPhonemes(phonemes) {
    this.talkingCountDown += phonemes.length

    this.phonemes = phonemes

    this.startTalkingAnimation()
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  updateMixer(deltaTime) {
    this.mixer?.update(deltaTime)
  }

  updateTalkingCountDown() {
    if (this.talkingCountDown > 0) {
      this.talkingCountDown -= 0.9999 // Not Integer to make sure the timing "count down < 0" can happen only once per sentence.
    }

    if (this.talkingCountDown < 0) {
      this.talkingCountDown = 0
      this.emotion = 'Neutral'
      setTimeout(this.startIdleAnimation, END_TALKING_DEBOUNCE_TIME_MS)
    }
  }

  update(deltaTime) {
    this.updateMixer(deltaTime)
    this.updateTalkingCountDown()

    LipSync?.update(this.phonemes, deltaTime)
    Facial?.update(this.emotion, deltaTime)
  }
}

export default Animation
