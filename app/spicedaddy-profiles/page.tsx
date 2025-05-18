import SpicedaddyProfile from "@/components/SpicedaddyProfile"
import { KACPER_ID, SpiceDaddy } from "@/utils/getSpiceDaddies"
import { getAllHistoricSpicedaddies, HistoricSpiceDaddy } from "@/utils/getHistoricSpicedaddies"
import { getSpiceDaddyStats } from "@/utils/getHistoricSpicedaddies"

export default async function Page() {

    const placeholderSpicedaddy: SpiceDaddy = {
        id: 1,
        name: "placeholder spicedaddy",
        teamName: "Placeholder team",
        total_points: 5,
        current_gw_points: 7,
        transfer_hits: 0
    }

    const historicSpiceDaddy = await getSpiceDaddyStats(KACPER_ID)

    console.log(historicSpiceDaddy)


    return <SpicedaddyProfile
        spicedaddy={historicSpiceDaddy}
    />
}