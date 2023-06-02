import { Clock } from 'three'

import Avatar from '../classes/Avatar/Avatar'
import Chat from '../classes/Chat'
import InworldCharacter from '../classes/Inworld/InworldCharacter'
import Lights from '../classes/Lights'
import ParticlesSystem from '../classes/ParticlesSystem'

// import InworldService from '../classes/InworldService'

export const initWorldPipelineModule = () => {
  const clock = new Clock()

  const init = () => {
    Lights.init()
    Chat.init()
    Avatar.init()
    ParticlesSystem.init()

    InworldCharacter.init()

    console.log('✨', 'World ready')
  }

  const render = () => {
    const deltaTime = clock.getDelta()

    Avatar?.update(deltaTime)
    ParticlesSystem?.update()
  }

  return {
    name: 'world-content',

    onStart: () => init(),

    onRender: () => render(),
  }
}
