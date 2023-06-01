// import { InworldClient } from '@inworld/nodejs-sdk'

import Avatar from '../classes/Avatar'
import Lights from '../classes/Lights'
import ParticlesSystem from '../classes/ParticlesSystem'

export const initWorldPipelineModule = () => {
  const initInworldClient = () => {
    console.log('initInworldClient...')

    // try {
    //   const client = new InworldClient().setApiKey({
    //     key: import.meta.env.INWORLD_KEY,
    //     secret: import.meta.env.INWORLD_SECRET,
    //   })

    //   console.log({ client })
    // } catch (error) {
    //   console.log({ error })
    // }
  }
  const init = () => {
    Lights.init()
    Avatar.init()
    ParticlesSystem.init()

    initInworldClient()

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
