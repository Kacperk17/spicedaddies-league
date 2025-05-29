import initAdmin from "./initAdmin";
import { getSpicedaddiesLeagueStanding } from "../utils/getStandings";
import { firestore } from "firebase-admin";

async function uploadSeasonStandings(db: firestore.Firestore) {
    const totalGameweeks = 38;

    for (let gw = 1; gw <= totalGameweeks; gw++) {
        const standings = await getSpicedaddiesLeagueStanding(gw);

        const batch = db.batch();
        for (const standing of standings) {
            const docRef = db
                .collection("seasonStandings")
                .doc(`gw${gw}`)
                .collection("standings")
                .doc(String(standing.id));

            batch.set(docRef, {
                event_total: standing.event_total,
                player_name: standing.player_name,
                rank: standing.rank,
                total: standing.total,
                entry_name: standing.entry_name,
                transfer_hits: standing.transfer_hits,
            });
        }

        await batch.commit();
        console.log(`Uploaded standings for GW${gw}`);
    }

    console.log("All gameweeks uploaded successfully.");
}

async function main() {
    try {
        const app = await initAdmin();
        const db = app.firestore();
        await uploadSeasonStandings(db);
    } catch (err) {
        console.error("Failed to upload:", err);
    }
}

main();
