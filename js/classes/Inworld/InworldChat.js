import InworldCharacter from './InworldCharacter'

class _InworldChat {
  constructor() {
    this.isRecording = false
  }

  stopRecording() {
    if (!this.isRecording) return

    InworldCharacter.connection.recorder.stop()
    this.isRecording = false
    connection.sendAudioSessionEnd()
  }

  async startRecording() {
    if (this.isRecording) return

    try {
      this.isRecording = true
      InworldCharacter.connection.sendAudioSessionStart()
      await InworldCharacter.connection.recorder.start()
    } catch (e) {
      console.error(e)
    }
  }
}
const InworldChat = new _InworldChat()
export default InworldChat
