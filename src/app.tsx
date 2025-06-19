import { useState, useEffect } from 'react'
import { Box, Text, Newline } from 'ink'
import si from 'systeminformation'
import Spinner from 'ink-spinner'
import chalk from 'chalk'
import Header from './components/header'
import SystemMetrics from './components/system-metrics'
import ProcessTable, { type Process } from './components/process-table'

export default function App() {
  const [cpu, setCpu] = useState<number>(0)
  const [memory, setMemory] = useState<{ used: number; total: number }>({ used: 0, total: 1 })
  const [processes, setProcesses] = useState<Process[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(function () {
    const interval = setInterval(async () => {
      try {
        const [cpuData, memData, procData] = await Promise.all([si.currentLoad(), si.mem(), si.processes()])

        setCpu(cpuData.currentLoad)
        setMemory({ used: memData.active, total: memData.total })

        const sortedProcesses = procData.list
          .map(p => ({
            pid: p.pid,
            user: p.user || 'unknown',
            cpu: `${p.cpu.toFixed(1)}%`,
            memory: `${p.mem.toFixed(1)}%`,
            command: p.command,
          }))
          .slice(0, 10)

        setProcesses(sortedProcesses)
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
      <ProcessTable processes={processes} />
      <Newline />
      <Text dimColor>Press Ctrl+C to exit</Text>
    </Box>
  )
}
