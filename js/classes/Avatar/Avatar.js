import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import * as THREE from 'three'
import Animation from './Animation'

const EYES_CLOSED = 'eyesClosed'
const BLINK_SPEED = 1
const BLINK_THRESH = 1000

class _Avatar {
  loader = new GLTFLoader()
  scene
  gltf
  root
  morphTargetMeshes = []
  url
  skinnedMesh

  //////////////////////////////////////////////////////////////////////////////////////////

  setEmotionEvent(value) {
    this.animations.setEmotionEvent(value)
  }

  setPhonemes(value) {
    this.animations.setPhonemes(value)
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  //'https://assets.inworld.ai/models/Default.glb'
  init(
    url = 'https://models.readyplayer.me/64796a2c786b05cdb7c244e8.glb?textureAtlas=1024&morphTargets=eyesClosed,Oculus%20Visemes'
  ) {
    const { scene } = XR8.Threejs.xrScene()

    this.url = url
    this.scene = scene

    this.elapsdTime = 0
    this.skinnedMesh = null
    this.eyesClosedIndex = -1

    this.loadModel(this.url)
  }

  async loadModel(url) {
    this.url = url

    this.loader.load(
      // URL of the model you want to load
      url,
      // Callback when the resource is loaded
      (gltf) => {
        if (this.gltf) {
          // Reset GLTF and morphTargetMeshes if a previous model was loaded.
          this.gltf.scene.remove()
          this.morphTargetMeshes = []
        }
        this.gltf = gltf
        this.scene.add(gltf.scene)
        this.start(gltf)
      },

      // Called while loading is progressing
      (progress) =>
        console.log(
          'Loading model...',
          100.0 * (progress.loaded / progress.total),
          '%'
        ),
      // Called when loading has errors
      (error) => console.error(error)
    )
  }

  start(gltf) {
    gltf.scene.traverse((object) => {
      // Register first bone found as the root
      if (object.isBone && !this.root) {
        this.root = object
      }
      // Return early if no mesh is found.
      if (!object.isMesh) {
        // console.warn(`No mesh found`);
        return
      }

      const mesh = object
      // Reduce clipping when model is close to camera.
      mesh.frustumCulled = false

      // Return early if mesh doesn't include morphable targets
      if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) {
        // console.warn(`Mesh ${mesh.name} does not have morphable targets`);
        return
      }
      this.morphTargetMeshes.push(mesh)
    })

    this.skinnedMesh = this.morphTargetMeshes[0]
    const idx = this.skinnedMesh.morphTargetDictionary[EYES_CLOSED]
    this.eyesClosedIndex = idx

    this.animations = new Animation({ model: gltf.scene })
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  updateBlendshapes(blendshapes) {
    for (const mesh of this.morphTargetMeshes) {
      if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) {
        console.warn(`Mesh ${mesh.name} does not have morphable targets`)
        continue
      }
      for (const [name, value] of blendshapes) {
        if (!Object.keys(mesh.morphTargetDictionary).includes(name)) {
          console.warn(`Model morphable target ${name} not found`)
          continue
        }

        const idx = mesh.morphTargetDictionary[name]

        mesh.morphTargetInfluences[idx] = value
      }
    }
  }
  updateEyesBlink(deltaTime) {
    if (this.skinnedMesh) {
      this.elapsdTime += deltaTime

      let eyeClosedVal = THREE.MathUtils.clamp(
        Math.sin(this.elapsdTime * BLINK_SPEED) * BLINK_THRESH -
          BLINK_THRESH +
          1,
        0,
        1
      )

      if (this.eyesClosedIndex !== -1) {
        this.skinnedMesh.morphTargetInfluences[this.eyesClosedIndex] =
          eyeClosedVal
      }
    }
  }
  updateAnimations(deltaTime) {
    this.animations?.update(deltaTime)
  }

  update(deltaTime) {
    this.updateEyesBlink(deltaTime)
    this.updateAnimations(deltaTime)
  }
}

const Avatar = new _Avatar()
export default Avatar
