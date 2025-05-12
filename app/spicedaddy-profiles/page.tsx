import SpicedaddyProfile from "@/components/SpicedaddyProfile"
import { SpiceDaddy } from "@/utils/getSpiceDaddies"

export default function Page() {

    const placeholderSpicedaddy: SpiceDaddy = {
        id: 1,
        name: "placeholder spicedaddy",
        teamName: "Placeholder team",
        total_points: 5,
        current_gw_points: 7,
        transfer_hits: 0
    }

    return <SpicedaddyProfile
        spicedaddy={placeholderSpicedaddy}
    />
}