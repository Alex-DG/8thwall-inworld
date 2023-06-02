import InworldChat from './Inworld/InworldChat'

/**
 * Chat UI
 */
class _Chat {
  handleRecording() {
    const isRecording = InworldChat.isRecording

    if (!isRecording) {
      this.audioBtn.classList.add('recording')
      InworldChat.startRecording()
    } else {
      this.audioBtn.classList.remove('recording')
      InworldChat.stopRecording()
    }
  }

  bind() {
    this.handleRecording = this.handleRecording.bind(this)
  }

  init() {
    this.bind()

    this.audioBtn = document.getElementById('audio-btn')
    this.audioBtn.addEventListener('click', this.handleRecording)
  }

  update() {}
}
const Chat = new _Chat()
export default Chat
