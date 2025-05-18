'use client'

import { Paper } from "@mantine/core"
import classes from './SpicedaddyProfile.module.css'
import { Text } from "@mantine/core"
import { Group } from "@mantine/core"
import { HistoricSpiceDaddy, HistoricSpiceDaddyStats } from "@/utils/getHistoricSpicedaddies"

interface ProfileProps {
    spicedaddy: HistoricSpiceDaddyStats,
}

export default function SpicedaddyProfile({
    spicedaddy,
}: ProfileProps) {

    return (
        <Paper
            className={classes.profile}
        >
            <Text size='lg' fw={500}>{spicedaddy.name}</Text>
            <Group>
                <Text>Wins: {spicedaddy.wins}</Text>
                <Text>Top 3: {spicedaddy.top_three}</Text>
            </Group>
        </Paper>
    )

}