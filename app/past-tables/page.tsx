
import { getHistoricSpicedaddyStanding } from "@/utils/getHistoricSpicedaddies"

import { Container } from "@mantine/core"
import HistoricLeagueStandingsWithSeasonSelector from "@/components/LeagueStandingWithSeasonSelector"
import { Title } from "@mantine/core";
import { Center } from "@mantine/core";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  let season = "2023/24"


  const rawSeason = searchParams.season

  if (typeof rawSeason === 'string') {
    season = rawSeason
  }


  const spicedaddies = await getHistoricSpicedaddyStanding(season)

  return (
    <>

      <Container size={'sm'}>
        <Center>
          <Title c={'black'}>Historic League Titles</Title>
        </Center>
        <HistoricLeagueStandingsWithSeasonSelector standings={spicedaddies} />
      </Container>
    </>
  )
}