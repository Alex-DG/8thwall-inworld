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
        'eyJraWQiOiJkZWZhdWx0LTIwMjItMDItMDEiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2MiOiI5ZjcxYTMwYi1lYTJjLTQ5ODktODgzOC1hZGFmYjliNTc5ODUiLCJhdWQiOiJ3b3JsZC1lbmdpbmUiLCJzdWIiOiJzZXJ2aWNlIiwic2NvcGUiOiJ3ZTpzZXNzaW9uIHdlOnV0aWxzIHdlOndvcmxkOmRlZmF1bHQtbmh0dWdqeHdpZ2JicnUwdHNnaGxycTo3N2ZkZjY2NC1hN2YwLTQ2OGEtYTVjNi01OGFlZTM4NDNlNzIgd2U6d29ya3NwYWNlOmRlZmF1bHQtbmh0dWdqeHdpZ2JicnUwdHNnaGxycSIsImlzcyI6InN0dWRpby1wcm9kLWlud29ybGQtYWkiLCJleHAiOjE2ODU2ODQ5ODEsIndzIjoiZGVmYXVsdC1uaHR1Z2p4d2lnYmJydTB0c2dobHJxIiwiaWF0IjoxNjg1NjgxMzgxLCJhcHBfdCI6IlNUVURJTyIsImtleSI6IndwWTVNWFFpVE9xWHpqYlJmcEloVGphcU9QNDNxUzF4In0.yqgzjsPIbYciXqn1Vpgp3GbMt4hSyeDfHpQhDL9o_jk6imOwkBXe9iys4aG_UhuKpb4wWWtgoqqcrknLxGGbZi243iFWG8iXKLaXS_aRXlbAkYSs5KIz4O1MN7NwY4ZsyDNCqLKAo-y_MEpbRt8TFtkjt9H8uPKREgXMsoDYf_nJo2xDidFq0AjeU0zh1ePb1P0T_Fbyf7hCiYENP6tAr2bnicm8ry1OFkD3MNQVWm7DU12wVEoE3NkW08G1JRkMy8HWusehzS-LZpUNyVTwjgdg70t_KQHxcgIOU2uFjd9Yo0Jhyh99Fb0oqPkZOxRkmeJJyw19HSdLWq5BdWf636W6cZ_r8cwIZgKbumpi6w5IlFxYXYDhqGSIRJ8rXOhvIro3ToN7JFzinV72Htr6yADElMAB8aEs2MLTyoM6InL7jrupEI1EDERY9Xd_2f6t_pcP3AYNZD1Hvf9UbB63RsTQc0lIkyc0sRQkx470CO9nlVmUAFkXoV_L9m1tMvfZeSuSTHKv86Ud9aLWXF54JLUdeBantsqBXrrg6EKPHEqlNM4XjBVBDuAGklwoFnQinLabd73pu3xCp28LNTEZZCLZ4ygcY3si6p6c8zMkKZY936suvhTy7WjtCftTGNsEutkJ2M5lICHZHgKA3Ral7tykVR-M5xkFefoGgmqt86c',
      type: 'Bearer',
      expirationTime: '2023-06-02T05:49:41.000Z',
      sessionId:
        'default-nhtugjxwigbbru0tsghlrq:77fdf664-a7f0-468a-a5c6-58aee3843e72',
    }
  }
}

export default InworldService
