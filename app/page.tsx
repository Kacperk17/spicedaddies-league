

import { Button, Container, Title } from '@mantine/core';
import LeagueStandings from '@/components/LeagueStandings';
import { getSpicedaddiesLeagueStanding } from '@/utils/getStandings';


export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  let gw = 35

  let rawGw = searchParams.gw

  if (typeof rawGw === 'string') {
    const parsed = parseInt(rawGw, 10);
    if (!isNaN(parsed)) {
      gw = parsed;
    }
  }

  const standings = await getSpicedaddiesLeagueStanding(gw)

  return (
    <>
      <Container size={'xs'} >
        <Title order={1}>SpiceDaddies Live League Table</Title>
        <Container size={'xs'}>
          <LeagueStandings standings={standings} gw={gw}/>
        </Container>
      </Container>
      
    </>
  );
}
