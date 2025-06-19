import chalk from 'chalk'
import { Text } from 'ink'

type ProgressBarProps = {
  value: number
}

export default function ProgressBar({ value }: ProgressBarProps) {
  const barLength = 20
  const filled = Math.round((value / 100) * barLength)
  const bar = '█'.repeat(filled) + '-'.repeat(barLength - filled)
  return (
    <Text>
      {chalk.blue(bar)} {value.toFixed(1)}%
    </Text>
  )
}
