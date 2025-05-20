import { Paper } from "@mantine/core";
import initAdmin from "@/scripts/initAdmin";
import { placeholderSpicedaddy } from "../spicedaddy-profiles/page";

import { KACPER_ID } from "@/utils/getSpiceDaddies"
import SpicedaddyInfo from "@/components/SpicedaddyInfo";
import { HistoricSpiceDaddyStats } from "@/utils/getHistoricSpicedaddies";


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