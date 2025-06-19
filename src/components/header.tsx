import { Box, Text } from 'ink'
import BigText from 'ink-big-text'

export default function Header() {
  return (
    <Box flexDirection="column">
      <Box justifyContent="center">
        <BigText text="GTop" font="block" />
      </Box>

      <Text color="greenBright" bold>
        Terminal System Monitor
      </Text>
      <Text dimColor>──────────────────────────────────────────────</Text>
    </Box>
  )
}
