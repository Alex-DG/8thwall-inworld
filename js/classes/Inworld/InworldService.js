import { InworldClient } from '@inworld/web-sdk'

const GENERATE_TOKEN_URL = 'http://192.168.0.101:4000/'

class InworldService {
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
      .setOnReady(props.onReady)
      .setOnMessage(props.onMessage)
      .setOnPhoneme(props.onPhoneme)
      .setOnHistoryChange(props.onHistoryChange)
      .setOnDisconnect(props.onDisconnect)

    this.connection = client.build()
  }

  async generateSessionToken() {
    // try {
    //   const response = await fetch(GENERATE_TOKEN_URL)
    //   console.log({ response })
    //   return response.json()
    // } catch (error) {
    //   console.log('❌', 'Failed: session token', { error })
    // }

    return {
      token:
        'eyJraWQiOiJkZWZhdWx0LTIwMjItMDItMDEiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2MiOiI5ZjcxYTMwYi1lYTJjLTQ5ODktODgzOC1hZGFmYjliNTc5ODUiLCJhdWQiOiJ3b3JsZC1lbmdpbmUiLCJzdWIiOiJzZXJ2aWNlIiwic2NvcGUiOiJ3ZTpzZXNzaW9uIHdlOnV0aWxzIHdlOndvcmxkOmRlZmF1bHQtbmh0dWdqeHdpZ2JicnUwdHNnaGxycTo3Nzk3N2Q0Yy05ZWYzLTQ5Y2YtOTJmZi1kNGNiMWMzYTI0Y2Ygd2U6d29ya3NwYWNlOmRlZmF1bHQtbmh0dWdqeHdpZ2JicnUwdHNnaGxycSIsImlzcyI6InN0dWRpby1wcm9kLWlud29ybGQtYWkiLCJleHAiOjE2ODU2NzM0NDksIndzIjoiZGVmYXVsdC1uaHR1Z2p4d2lnYmJydTB0c2dobHJxIiwiaWF0IjoxNjg1NjY5ODQ5LCJhcHBfdCI6IlNUVURJTyIsImtleSI6IndwWTVNWFFpVE9xWHpqYlJmcEloVGphcU9QNDNxUzF4In0.pcuuKhkf89SHh2OZXWNFGjlG0B4OMXZXiSwNTZ6H_5HgzZVVB2b7Heo76OB66LftZi4hh8echEQMtnooAJS_xDITGKmu7qTI9heOxUokMcOU25sP2Wg_6lKdERHuprcKh4HCGnNaOi1_GWszC6gCx4PnzWuFBWYQeF0RBhfp27JUpksQp1wNltzJVcG-_30nnv1v5UcG6W8gw5J5M2KDFODg1IwdyRCgd0n3FHneQ88kPWHsBg9fl2ieEV9FyY0bOHoYs2U7Ki2NvS7KHFIT-wbHpaFtS17dTmoaKf0qUZLM4lyuYw6EptZ1zTqNnnQYlP0AAVzHhbfeAjc1de4LVtfplLu1y4Z5cU1t5WSv5sLv7ro6JnP5lvDMGuZ2WhuTiuir1mJdmKWjlXH3hCYU2WatN-iSkMrojJonI-SxxjRjlT-y0-vLouxMHl9Z6y3Akx-FkmjnH9-yBhV5RTlMXgmLF0Pedosd9pB27KPS0j9nziXB0g6ZqGFGZDwBEAV3pXjEUPm9vhgwzMI-33R43J-qZSf952SqiKpsj5lSfqYVU2YiU6RN-htuxSr9w-a0IXYJMFZHfUliBLinfUTTbrME6YYw0woZgesCCkZUcfG9uEjzhwSBSglwLot52YoEShahjIqMluBGxePZYpKWSk1NB7lH1qmhJ6j9bL1j2lE',
      type: 'Bearer',
      expirationTime: '2023-06-02T02:37:29.000Z',
      sessionId:
        'default-nhtugjxwigbbru0tsghlrq:77977d4c-9ef3-49cf-92ff-d4cb1c3a24cf',
    }
  }
}

export default InworldService
