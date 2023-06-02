import Avatar from './Avatar'
import { FacialEmotionMap } from './FacialEmotionMap'

const MORPH_DURATION = 0.25
const LERP_FACTOR = 0.25

class _Facial {
  init() {
    this.lastEmo = 'Neutral'
    this.currEmo = 'Neutral'
    this.currMorph = 0
  }

  getIndex(morphName) {
    let nResult = -1

    if (Avatar.skinnedMesh) {
      for (
        let i = 0;
        i < Avatar.skinnedMesh?.userData.targetNames.length;
        i++
      ) {
        if (Avatar.skinnedMesh?.userData.targetNames[i] === morphName) {
          nResult = i
          break
        }
      }
    }

    return nResult
  }

  update(emotion, deltaTime) {
    const currEmo = emotion

    if (this.currEmo != this.lastEmo) {
      this.currMorph += deltaTime
      // Morph Emo!
      if (FacialEmotionMap[currEmo]) {
        // Reset OLD EMO
        if (FacialEmotionMap[lastEmo]) {
          for (const [key, value] of Object.entries(
            FacialEmotionMap[lastEmo]
          )) {
            const targetVal = FacialEmotionMap[currEmo][key] ?? 0
            const targetIndex = getIndex(key)
            if (targetIndex != -1) {
              Avatar.skinnedMesh.morphTargetInfluences[targetIndex] =
                MathUtils.lerp(
                  Avatar.skinnedMesh.morphTargetInfluences[targetIndex],
                  targetVal * 0.01,
                  LERP_FACTOR
                )
            }
          }
        }
        // APPly NEW Emo
        for (const [key, value] of Object.entries(FacialEmotionMap[currEmo])) {
          const targetIndex = getIndex(key)
          if (targetIndex != -1) {
            Avatar.skinnedMesh.morphTargetInfluences[targetIndex] =
              MathUtils.lerp(
                Avatar.skinnedMesh.morphTargetInfluences[targetIndex],
                value * 0.01,
                LERP_FACTOR
              )
          }
        }
      }
      if (this.currMorph >= MORPH_DURATION) {
        this.currMorph = 0
        this.lastEmo = currEmo
      }
    }
  }
}

const Facial = new _Facial()
export default Facial
