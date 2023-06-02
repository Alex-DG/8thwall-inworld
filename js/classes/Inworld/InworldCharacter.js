import InworldService from './InworldService'

class _InworldCharacter {
  //////////////////////////////////////////////////////////////////////////////////////////

  onHistoryChange(history) {
    console.log('->', 'onHistoryChange', { history })
  }

  async onReady() {
    console.log('->', 'Ready!')
  }

  onDisconnect() {
    console.log('->', 'Disconnected!')
  }

  onPhoneme(phonemes) {
    // Pass phonemes to lip sync.
    console.log('->', 'onPhoneme', { phonemes })
  }

  onMessage(inworldPacket) {
    if (inworldPacket.isEmotion() && inworldPacket.packetId?.interactionId) {
      this.setEmotionEvent(inworldPacket.emotions)
      this.setEmotions(inworldPacket.emotions)
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  async openConnection() {
    console.log('Please wait, openning connection...')
    try {
      const service = new InworldService({
        onHistoryChange: this.onHistoryChange,
        capabilities: {
          phonemes: true,
          emotions: true,
          narratedActions: true,
        },
        sceneName: this.sceneName,
        playerName: this.playerName,
        onPhoneme: this.onPhoneme,
        onReady: this.onReady,
        onDisconnect: this.onDisconnect,
        onMessage: this.onMessage,
      })

      const characters = await service.connection.getCharacters()
      console.log({ characters })

      const character = characters.find(
        (c) => c.resourceName === this.characterName
      )
      console.log({ character })

      if (character) {
        service.connection.setCurrentCharacter(character)

        const assets = character?.assets
        const rpmImageUri = assets?.rpmImageUriPortrait
        const avatarImg = assets?.avatarImg
        //   setAvatar(avatarImg || rpmImageUri || '')
      }

      this.connection = service.connection
      this.character = character
      this.characters = characters

      console.log('✅', 'Connection opened!')
    } catch (error) {
      console.log('❌', 'Failed: Open connection', { error })
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  bind() {
    this.onReady = this.onReady.bind(this)
    this.onMessage = this.onMessage.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
    this.onPhoneme = this.onPhoneme.bind(this)
    this.onHistoryChange = this.onHistoryChange.bind(this)
  }

  init() {
    this.playerName = 'Alex'

    this.characterName =
      'workspaces/default-nhtugjxwigbbru0tsghlrq/characters/leo'
    this.sceneName = 'workspaces/default-nhtugjxwigbbru0tsghlrq/scenes/my_scene'

    this.isRecordingAudio = false

    this.connection = null
    this.character = null
    this.characters = []

    this.bind()
    this.openConnection()
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  update() {}
}
const InworldCharacter = new _InworldCharacter()
export default InworldCharacter
