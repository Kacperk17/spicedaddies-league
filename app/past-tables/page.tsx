
import { HistoricStanding } from "@/utils/getHistoricSpicedaddies"
import initAdmin from "@/scripts/initAdmin";

import { Container, Space } from "@mantine/core"
import SeasonSelector from "@/components/SeasonSelector";
import HistoricStandings from "@/components/HistoricLeagueStandings";
import { Paper } from "@mantine/core";

async function getHistoricStandings(season: string) {

  const firebaseString = season.replace("/", "_")

  const app = await initAdmin();
  const db = app.firestore();
  const testSeason = db.collection('historicStandings').doc(firebaseString).collection('standings')

  const standings: HistoricStanding[] = []

  await testSeason.get().then(querySnapshot => {

    querySnapshot.forEach(doc => {
      const docId = parseInt(doc.id)

      standings.push({
        id: docId,
        points: doc.data().points,
        spiceDaddyName: doc.data().spiceDaddyName,
        globalRank: doc.data().globalRank
      })
    });
  })
    .catch(error => {
      console.error("Error getting documents: ", error);
    })

  return standings
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ season: string | string[] | undefined }>;
}) {

  let defaultSeason = "2023/24"
  const { season } = await searchParams

  if (typeof season === 'string') {
    defaultSeason = season
  }


  let spicedaddies

  const placeholderStanding: HistoricStanding = {
    id: 1,
    points: 1,
    spiceDaddyName: "placeholder",
    globalRank: 1
  }

  try {
    spicedaddies = await getHistoricStandings(defaultSeason)
  }
  catch (error) {
    spicedaddies = [placeholderStanding]
    throw new Error("Could not fetch data from server")
  }


  return (
    <>
      <Container size={'sm'}>
        <SeasonSelector />
        <Space h={'md'} />
        <Paper>
          <HistoricStandings standings={spicedaddies} />
        </Paper>
      </Container>
    </>
  )
}