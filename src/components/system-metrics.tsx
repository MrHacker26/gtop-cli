import { Box, Text } from 'ink'
import chalk from 'chalk'
import ProgressBar from './progress-bar'

type Memory = {
  used: number
  total: number
}

type SystemMetricsProps = {
  cpu: number
  memory: Memory
}

export default function SystemMetrics({ cpu, memory }: SystemMetricsProps) {
  const memoryPercent = (memory.used / memory.total) * 100

  return (
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
        <ProgressBar value={memoryPercent} />
        <Text>
          {chalk.cyan(((memory.used / memory.total) * 100).toFixed(1))}% ({Math.round(memory.used / 1024 / 1024)} MB /{' '}
          {Math.round(memory.total / 1024 / 1024)} MB)
        </Text>
      </Box>
    </Box>
  )
}
