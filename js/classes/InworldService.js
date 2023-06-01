import {
  Capabilities,
  HistoryItem,
  InworldClient,
  InworldConnectionService,
} from '@inworld/web-sdk'

//   interface InworldServiceProps {
//     capabilities: Capabilities;
//     sceneName: string;
//     playerName: string;
//     onReady: () => void;
//     onDisconnect: () => void;
//     onHistoryChange: (history: HistoryItem[]) => void;
//   }

export class InworldService {
  connection

  constructor(props) {
    const client = new InworldClient()
      .setConfiguration({
        capabilities: props.capabilities,
      })
      .setUser({ fullName: props.playerName })
      .setScene(props.sceneName)
      .setGenerateSessionToken(this.generateSessionToken)
      .setOnError((err) => console.log(err))
      .setOnHistoryChange(props.onHistoryChange)
      .setOnReady(props.onReady)
      .setOnDisconnect(props.onDisconnect)

    this.connection = client.build()
  }

  async generateSessionToken() {
    const response = await fetch(GENERATE_TOKEN_URL)

    return response.json()
  }
}
