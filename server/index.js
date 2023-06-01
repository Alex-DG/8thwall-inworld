import 'dotenv/config'

import { InworldClient } from '@inworld/nodejs-sdk'

import fs from 'fs'
import https from 'https'
import express from 'express'
import cors from 'cors'
import path from 'path'

/**
 * Init Server
 */
const app = express()
const port = process.env.PORT || 3001

const privateKey = fs.readFileSync('./keys/key.pem', 'utf8')
const certificate = fs.readFileSync('./keys/cert.pem', 'utf8')

const credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: process.env.PASSPHRASE,
}

// create https server
const httpsServer = https.createServer(credentials, app)

/**
 * Inworld Client
 */
if (!process.env.INWORLD_KEY) {
  throw new Error('INWORLD_KEY env variable is required')
}

if (!process.env.INWORLD_SECRET) {
  throw new Error('INWORLD_SECRET env variable is required')
}

const client = new InworldClient()
  // Get key and secret from the integrations page.
  .setApiKey({
    key: process.env.INWORLD_KEY,
    secret: process.env.INWORLD_SECRET,
  })
  // Setup a user name.
  // It allows character to call you by name.
  .setUser({ fullName: 'Your name' })
  // Setup required capabilities.
  // In this case you can receive character emotions.
  .setConfiguration({
    capabilities: { audio: true, emotions: true },
  })
  // Use a full character name.
  // It should be like workspaces/{WORKSPACE_NAME}/characters/{CHARACTER_NAME}.
  // Or like workspaces/{WORKSPACE_NAME}/scenes/{SCENE_NAME}.
  .setScene(process.env.INWORLD_SCENE)
  // Attach handlers
  .setOnError((err) => console.error(err))
  .setOnMessage((packet) => {
    console.log(packet)

    if (packet.isInteractionEnd()) {
      // Close connection.
      client.close()
    }
  })

/**
 * Middlewares
 */
app.use(express.static('public'))
app.use(cors())

/**
 * Routes
 */
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') })
})

app.get('/api/bonjour/:json?', (req, res) => {
  const name = req.query.name || ''
  const message = `Bonjour 👋 ${name}`

  if (req.params.json) return res.json({ message })

  return res.send(message)
})

app.get('/api/inworld/session-token', async (_, res) => {
  const token = await client.generateSessionToken()

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(token))
})

httpsServer.listen(port, () => {
  console.log('============================')

  console.log(`Server started ✨`)
  console.log(`local: https://localhost:${port}`)

  console.log('============================')
})

export default app
