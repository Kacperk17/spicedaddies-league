

import { Grid, Container, Title, Center, Space } from '@mantine/core';
import LeagueStandings from '@/components/LeagueStandings';
import { getSpicedaddiesLeagueStanding } from '@/utils/getStandings';
import GwSelector from '@/components/GwSelector';
import LeagueStandingsWithGwSelector from '@/components/LeagueStandingsWithGwSelector';
import { HeaderSimple } from '@/components/Header';



export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  let gw = 35

  const rawGw = await searchParams.gw

  if (typeof rawGw === 'string') {
    const parsed = parseInt(rawGw, 10);
    if (!isNaN(parsed)) {
      gw = parsed;
    }
  }

  const standings = await getSpicedaddiesLeagueStanding(gw)



  return (
    <>
      <Container size={'sm'} >
        <LeagueStandingsWithGwSelector standings={standings} gw={gw} />
      </Container>
    </>
  );
}
