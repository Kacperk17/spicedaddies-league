import initAdmin from "./initAdmin";
import { getHistoricSpicedaddyStanding } from "../utils/getHistoricSpicedaddies";

import { seasonOptions } from "../utils/getHistoricSpicedaddies";
import { firestore } from "firebase-admin";

async function uploadHistoricStandings(db: firestore.Firestore) {
    const seasonOptionsList = seasonOptions
    console.log("list ", seasonOptionsList)


    for (const season of seasonOptionsList) {
        const standings = await getHistoricSpicedaddyStanding(season);
        const seasonKey = season.replace("/", "_");

        const batch = db.batch();
        for (const standing of standings) {
            const docRef = db
                .collection("historicStandings")
                .doc(seasonKey)
                .collection("standings")
                .doc(String(standing.id));

            batch.set(docRef, {
                spiceDaddyName: standing.spiceDaddyName,
                points: standing.points,
                globalRank: standing.globalRank,
            });
        }

        await batch.commit();
        console.log(`✅ Uploaded standings for ${season}`);
    }

    console.log("🎉 All seasons uploaded successfully.");
}

async function main() {
    try {
        const app = await initAdmin();
        const db = app.firestore();
        await uploadHistoricStandings(db);
    } catch (err) {
        console.error("❌ Failed to upload:", err);
    }
}

main();


