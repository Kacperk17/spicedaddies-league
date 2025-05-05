'use client'

import { Grid, Container } from "@mantine/core"
import SeasonSelector from "./SeasonSelector"
import { HistoricStanding } from "@/utils/getHistoricSpicedaddies"
import HistoricStandings from "./HistoricLeagueStandings"

interface HistoricLeagueStandingProps {
    standings: HistoricStanding[]
}


export default function HistoricLeagueStandingsWithSeasonSelector({ standings }: HistoricLeagueStandingProps) {
    return (
        <Grid>
            <Grid.Col span={9}>
                <Container size={'xs'}>
                    <HistoricStandings standings={standings} />
                </Container>
            </Grid.Col>
            <Grid.Col span={3}>
                <SeasonSelector />
            </Grid.Col>
        </Grid>
    )
}