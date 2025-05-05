'use client'

import { Grid, Container } from "@mantine/core"
import LeagueStandings from "./LeagueStandings"
import GwSelector from "./GwSelector"
import { LeagueStandingProps } from "./LeagueStandings"
import { Paper } from "@mantine/core"


export default function LeagueStandingsWithGwSelector({ standings, gw }: LeagueStandingProps) {
    return (

        <Grid>
            <Grid.Col span={10}>
                <Paper>
                    <LeagueStandings standings={standings} gw={gw} />
                </Paper>
            </Grid.Col>
            <Grid.Col span={2}>
                <GwSelector currentGw={gw} />
            </Grid.Col>
        </Grid>

    )
}