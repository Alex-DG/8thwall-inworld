import Avatar from './Avatar'

import { getVisemeData } from './PhonemDataToVisemeDataConverter'

const VISEMES_AMOUNT = 15
const VISEME_SIL_USERDATA_NAME = 'viseme_sil'

class _LypSync {
  init({ animations }) {
    this.visemeOffsetS = 0
    this.animations = animations

    const idx =
      Avatar.skinnedMesh.morphTargetDictionary[VISEME_SIL_USERDATA_NAME]
    console.log({ idx })
    this.startingIndex = idx
  }

  update(phonemes, deltaTime) {
    const phonemeData = phonemes
    if (phonemeData?.length && this.startingIndex != -1) {
      this.visemeOffsetS += deltaTime
      const data = getVisemeData(this.visemeOffsetS, phonemeData)

      if (!data) {
        this.visemeOffsetS = 0
        this.animations.phonemes = []
        return
      }
      for (let i = 0; i < VISEMES_AMOUNT; i++) {
        Avatar.skinnedMesh.morphTargetInfluences[this.startingIndex + i] =
          data[i]
      }
    } else {
      if (Avatar.skinnedMesh) {
        Avatar.skinnedMesh.morphTargetInfluences[this.startingIndex] = 1 // then every other morph would be cancelled.
        for (let i = 1; i < VISEMES_AMOUNT; i++) {
          Avatar.skinnedMesh.morphTargetInfluences[this.startingIndex + i] = 0
        }
      }
    }
  }
}

const LypSync = new _LypSync()
export default LypSync
