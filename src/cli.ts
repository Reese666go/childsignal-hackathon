import { captureObservation } from './capture-agent.js'
import { DEMO_OBSERVATION } from './demo-data.js'

async function main(): Promise<void> {
  const args = process.argv.slice(2).filter((arg) => arg !== '--demo')
  const input = args.join(' ').trim() || DEMO_OBSERVATION
  const mode = process.env.CHILDSIGNAL_MODEL === 'bedrock' ? 'bedrock' : 'offline-demo'

  console.log(`ChildSignal Capture Agent · ${mode}`)
  console.log(`\n教师原话：\n${input}\n`)

  const result = await captureObservation(input)
  console.log('待教师确认的结构化观察：')
  console.log(JSON.stringify(result, null, 2))
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`Capture failed: ${message}`)
  process.exitCode = 1
})
