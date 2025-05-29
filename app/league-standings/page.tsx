import { Grid, GridCol, Container } from '@mantine/core';
import { Paper } from '@mantine/core';
import LeagueStandings from '../../components/LeagueStandings';
import GwSelector from '../../components/GwSelector';
import { Standing } from '@/utils/getStandings';
import initAdmin from '@/scripts/initAdmin';

async function getSeasonStandings(gw: number) {

  const firebase_string: string = `gw${gw}`

  const app = await initAdmin();
  const db = app.firestore();
  const gwStandings = db.collection('seasonStandings').doc(firebase_string).collection('standings')

  const standings: Standing[] = []

  await gwStandings.get().then(querySnapshot => {

    querySnapshot.forEach(doc => {
      const docId = parseInt(doc.id)

      standings.push({
        id: docId,
        event_total: doc.data().event_total,
        player_name: doc.data().player_name,
        rank: doc.data().rank,
        total: doc.data().total,
        entry_name: doc.data().entry_name,
        transfer_hits: doc.data().transfer_hits,
      }
      )
    });
  })
    .catch(error => {
      console.error("Error getting documents: ", error);
    })

  return standings


}


export default async function HomePage({ searchParams }: {
  searchParams: Promise<{ gw: string | string[] | undefined }>
}) {
  let defaultGw = 38;
  const { gw } = await searchParams

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
    standings = await getSeasonStandings(defaultGw);
  } catch {
    standings = [placeholderStanding];
  }


  standings.sort((a, b) => b.total - a.total);
  return (
    <Container size="sm">
      <Grid>
        <GridCol span={{ base: 12, md: 2 }} order={{ base: 1, md: 2 }}>
          <GwSelector currentGw={defaultGw} />
        </GridCol>
        <GridCol span={{ base: 12, md: 10 }} order={{ base: 2, md: 1 }}>
          <Paper>
            <LeagueStandings standings={standings} gw={defaultGw} />
          </Paper>
        </GridCol>
      </Grid>
    </Container>
  );
}