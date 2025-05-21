import { Paper } from "@mantine/core";
import initAdmin from "@/scripts/initAdmin";

import { KACPER_ID } from "@/utils/getSpiceDaddies"
import SpicedaddyInfo from "@/components/profile/SpicedaddyInfo";
import { HistoricSpiceDaddyStats } from "@/utils/getHistoricSpicedaddies";

const placeholderSpicedaddy: HistoricSpiceDaddyStats = {
    id: 1,
    name: "placeholder spicedaddy",
    wins: 1,
    top_three: 1,
    last_place: 1,
    champion_seasons: ["hi"],
    losing_seasons: ["hi"],
    alias: "hi",
    seasonToRankMap: new Map(),
    bio: ""
}
async function getSpicedaddyStats(spicedaddyId: string): Promise<HistoricSpiceDaddyStats> {
    const app = await initAdmin();
    const db = app.firestore();
    const doc = await db.collection('historicStats').doc(spicedaddyId).get();
    
    if (!doc.exists) {
        return placeholderSpicedaddy;
    }
    
    return doc.data() as HistoricSpiceDaddyStats;
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ spicedaddyId: string | string[] | undefined }>;
}) {
    let defaultSpicedaddy: string = String(KACPER_ID)

    const { spicedaddyId } = await searchParams

    if (typeof spicedaddyId === 'string') {
        defaultSpicedaddy = spicedaddyId
    }

    const spicedaddy = await getSpicedaddyStats(defaultSpicedaddy)
    return (
        <>
            <SpicedaddyInfo spicedaddy={spicedaddy}/>
        </>
    )
}