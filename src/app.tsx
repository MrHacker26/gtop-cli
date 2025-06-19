import { useState, useEffect } from 'react'
import { Box, Text, Newline } from 'ink'
import si from 'systeminformation'
import Spinner from 'ink-spinner'
import chalk from 'chalk'
import Header from './components/header'
import SystemMetrics from './components/system-metrics'

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
      <Header />
      <Newline />
      <SystemMetrics cpu={cpu} memory={memory} />
      <Newline />
      <Text dimColor>Press Ctrl+C to exit</Text>
    </Box>
  )
}
