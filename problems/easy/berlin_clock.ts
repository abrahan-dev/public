export function berlin_clock(
    time: string | null = null,
    row: number | null = null
): string {
    const formatTime = (time: string | null): [number, number, number] => {
        const timeString =
            time || new Date().toLocaleTimeString('en-GB', { hour12: false })
        const [hours, minutes, seconds] = timeString.split(':').map(Number)
        return [hours, minutes, seconds]
    }

    const singleMinutes = (minutes: number): string => {
        const bulbsOn = minutes % 5
        const totalBulbs = 4
        return 'Y'.repeat(bulbsOn).padEnd(totalBulbs, 'O')
    }

    const [hours, minutes, seconds] = formatTime(time)
    const berlinTime: Record<number, string> = {
        0: singleMinutes(minutes),
    }

    return row !== null ? berlinTime[row] : Object.values(berlinTime).join('')
}
