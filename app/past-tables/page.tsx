
import { getHistoricSpicedaddyStanding, HistoricStanding } from "@/utils/getHistoricSpicedaddies"

import HistoricStandings from "@/components/HistoricLeagueStandings";
import { HistoricPerformance } from "@/utils/getHistoricSpicedaddies";

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

  let spicedaddies

  const placeholderStanding: HistoricStanding = {
    id: 1,
    points: 1,
    spiceDaddyName: "placeholder",
    globalRank: 1
  }

  try {
    spicedaddies = await getHistoricSpicedaddyStanding(season)
  } catch {
    spicedaddies = [placeholderStanding]
  }

  


  return (
    <>
      <Container size={'sm'}>
        <HistoricLeagueStandingsWithSeasonSelector standings={spicedaddies} />
      </Container>
    </>
  )
}