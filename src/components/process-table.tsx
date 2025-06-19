import { Box, Text, Newline } from 'ink'
import Spinner from 'ink-spinner'
import { Suspense, lazy } from 'react'

const Table = lazy(() => import('ink-table'))

export type Process = {
  pid: number
  user: string
  cpu: string
  memory: string
  command: string
}

type ProcessTableProps = {
  processes: Process[]
}

export default function ProcessTable({ processes }: ProcessTableProps) {
  return (
    <Box flexDirection="column">
      <Text bold>⚡Processes</Text>
      <Suspense
        fallback={
          <Text>
            <Spinner /> <Text color="cyan">Loading table data...</Text>
          </Text>
        }
      >
        <Table
          data={processes}
          columns={['pid', 'user', 'cpu', 'memory', 'command']}
          cell={({ children, column }) => {
            const value = children?.toString() || ''
            if (column === 2 || column === 3) {
              const num = parseFloat(value.replace('%', ''))
              const color = num > 50 ? 'red' : num > 20 ? 'yellow' : 'green'
              return <Text color={color}>{value}</Text>
            }
            return <Text>{value}</Text>
          }}
        />
      </Suspense>
      <Newline />
    </Box>
  )
}
