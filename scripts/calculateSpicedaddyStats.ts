
import { KACPER_ID, DUG_ID, SHANE_ID } from "../utils/getSpiceDaddies";

import { getSpiceDaddyStats } from "../utils/getHistoricSpicedaddies";
import { firestore } from "firebase-admin";
import { spiceDaddyIds } from "../utils/getSpiceDaddies";
import initAdmin from "./initAdmin";
import { HistoricSpiceDaddyStats } from "../utils/getHistoricSpicedaddies";

async function uploadSpicedaddyStats(db: firestore.Firestore) {

    for (const spiceDaddyId of spiceDaddyIds) {
        const stats: HistoricSpiceDaddyStats = await getSpiceDaddyStats(spiceDaddyId)
       
        const batch = db.batch();

        const docRef = db
            .collection("historicStats")
            .doc(String(spiceDaddyId))

        batch.set(docRef, {
            id: stats.id,
            name: stats.name,
            wins: stats.wins,
            top_three: stats.top_three,
            last_place: stats.last_place,
            champions_seasons: stats.champion_seasons,
            losing_seasons: stats.losing_seasons,
            seasonToRankMap: Object.fromEntries(stats.seasonToRankMap)
        })
        await batch.commit();
        console.log(`Uploaded stats for ${stats.name}`)
        
       console.log(stats.seasonToRankMap)
    }

    console.log(`Uploaded all stats`)


}

async function main() {
    try {
        const app = await initAdmin();
        const db = app.firestore();
        await uploadSpicedaddyStats(db);
    } catch (err) {
        console.error("Failed to upload: ", err)
    }
}

main();

