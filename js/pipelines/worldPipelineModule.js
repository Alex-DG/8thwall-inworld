// import { InworldClient } from '@inworld/nodejs-sdk'

import Avatar from '../classes/Avatar'
import Chat from '../classes/Chat'
import InworldCharacter from '../classes/Inworld/InworldCharacter'
import Lights from '../classes/Lights'
import ParticlesSystem from '../classes/ParticlesSystem'

// import InworldService from '../classes/InworldService'

export const initWorldPipelineModule = () => {
  const init = () => {
    Lights.init()
    Chat.init()
    Avatar.init()
    ParticlesSystem.init()

    InworldCharacter.init()

    console.log('✨', 'World ready')
  }

  const render = () => {
    ParticlesSystem?.update()
  }

  return {
    name: 'world-content',

    onStart: () => init(),

    onRender: () => render(),
  }
}
