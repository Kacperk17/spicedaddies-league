import { Grid, Container, Title, Center, Space } from '@mantine/core';
import LeagueStandings from '@/components/LeagueStandings';
import { getSpicedaddiesLeagueStanding } from '@/utils/getStandings';
import GwSelector from '@/components/GwSelector';
import LeagueStandingsWithGwSelector from '@/components/LeagueStandingsWithGwSelector';
import { HeaderSimple } from '@/components/Header';
import { Standing } from '@/utils/getStandings';

export default async function HomePage({ searchParams }: { 
  searchParams: Promise<{ gw: string | string[] | undefined }> 
}) {
  let defaultGw = 35;
  const { gw } = await searchParams

  console.log("rawGw: ", gw);

  if (typeof gw === 'string') {
    const parsed = parseInt(gw, 10);
    if (!isNaN(parsed)) {
      defaultGw = parsed;
    }
  }


  let standings;

  const placeholderStanding: Standing = {
    id: 1,
    event_total: 1,
    player_name: "placeholder",
    rank: 1,
    total: 1,
    entry_name: "placeholder team",
    transfer_hits: 0
  };


  try {
    standings = await getSpicedaddiesLeagueStanding(defaultGw);
  } catch {
    standings = [placeholderStanding];
  }

  return (
    <>
      <Container size={'sm'}>
        <LeagueStandingsWithGwSelector standings={standings} gw={defaultGw} />
      </Container>
    </>
  );
}