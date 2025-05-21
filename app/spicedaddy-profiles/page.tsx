import SpicedaddyProfile from "@/components/profile/SpicedaddyProfile"
import { Group, SimpleGrid } from "@mantine/core";
import { Flex } from "@mantine/core";
import { HistoricSpiceDaddyStats } from "@/utils/getHistoricSpicedaddies"
import initAdmin from "@/scripts/initAdmin"


async function getSpicedaddyStats() {

    const app = await initAdmin();
    const db = app.firestore();
    const spicedaddyStats = await db.collection('historicStats').get()

    const historicSpiceDaddies: any[] = []

    spicedaddyStats.docs.map(doc => historicSpiceDaddies.push(doc.data()))

    return historicSpiceDaddies
}

export default async function Page() {

    

    const spicedaddyStats = await getSpicedaddyStats()


    return (
        <Flex justify="center">
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 4 }}
            >
                {spicedaddyStats.map((spicedaddy) => (
                    <SpicedaddyProfile
                        key={spicedaddy.id}
                        spicedaddy={spicedaddy}
                    />
                ))}
            </SimpleGrid>
        </Flex>
    );
}