import { useState, useEffect } from 'react'
import { Box, Text, Newline } from 'ink'
import BigText from 'ink-big-text'
import si from 'systeminformation'
import Spinner from 'ink-spinner'
import chalk from 'chalk'
import ProgressBar from './components/progress-bar'

export default function App() {
  const [cpu, setCpu] = useState<number>(0)
  const [memory, setMemory] = useState<{ used: number; total: number }>({
    used: 0,
    total: 1,
  })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(function () {
    const interval = setInterval(async () => {
      try {
        const cpuData = await si.currentLoad()
        setCpu(cpuData.currentLoad)

        const memData = await si.mem()
        setMemory({ used: memData.active, total: memData.total })

        setLoading(false)
      } catch (error) {
        console.error(chalk.red('Error fetching system data:', error))
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (loading) {
    return (
      <Text>
        <Spinner /> <Text color="cyan">Loading system data...</Text>
      </Text>
    )
  }

  return (
    <Box flexDirection="column" padding={1} borderStyle="round" borderColor="green">
      <Box justifyContent="center">
        <BigText text="GTop" font="block" />
      </Box>

      <Text color="greenBright" bold>
        Terminal System Monitor
      </Text>
      <Text dimColor>──────────────────────────────────────────────</Text>
      <Newline />

      <Box flexDirection="row" justifyContent="space-between" gap={4}>
        <Box flexDirection="column" width="50%">
          <Text bold color="yellow">
            🧠 CPU Usage
          </Text>
          <ProgressBar value={cpu} />
          <Text>{chalk.yellow(cpu.toFixed(1))}%</Text>
        </Box>

        <Box flexDirection="column" width="50%">
          <Text bold color="magenta">
            💾 Memory Usage
          </Text>
          <ProgressBar value={(memory.used / memory.total) * 100} />
          <Text>
            {chalk.cyan(((memory.used / memory.total) * 100).toFixed(1))}% ({Math.round(memory.used / 1024 / 1024)} MB /{' '}
            {Math.round(memory.total / 1024 / 1024)} MB)
          </Text>
        </Box>
      </Box>

      <Newline />
      <Text dimColor>Press Ctrl+C to exit</Text>
    </Box>
  )
}
