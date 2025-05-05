'use client'

import { Grid, Container } from "@mantine/core"
import SeasonSelector from "./SeasonSelector"
import { HistoricStanding } from "@/utils/getHistoricSpicedaddies"
import HistoricStandings from "./HistoricLeagueStandings"
import { Paper } from "@mantine/core"

interface HistoricLeagueStandingProps {
    standings: HistoricStanding[]
}


export default function HistoricLeagueStandingsWithSeasonSelector({ standings }: HistoricLeagueStandingProps) {
    return (
        <Grid>
            <Grid.Col span={9}>
                <Paper>
                    <HistoricStandings standings={standings} />
                </Paper>
            </Grid.Col>
            <Grid.Col span={3}>
                <SeasonSelector />
            </Grid.Col>
        </Grid>
    )
}