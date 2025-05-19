import { spiceDaddyIds, getSpiceDaddy, KACPER_HISTORIC_ID, KACPER_ID } from "./getSpiceDaddies"
import { getIdToSpicedaddyNameMap } from "./getSpiceDaddies"

export const seasonOptions = [
    "2023/24",
    "2022/23",
    "2021/22",
    "2020/21",
    "2019/20",
    "2018/19",
    "2017/18"
];

export interface HistoricSpiceDaddy {
    id: number,
    name: string,
    performances: HistoricPerformance[],
}

export interface HistoricStanding {
    id: number,
    points: number,
    spiceDaddyName: string,
    globalRank: number
}

export interface HistoricSpiceDaddyStats {
    id: number,
    name: string,
    wins: number,
    top_three: number,
    last_place: number,
    champion_seasons: string[],
    losing_seasons: string[]
}

export interface HistoricPerformance {
    season: string,
    points: number,
    rank: number
}

function historicInfoUrl(spicedaddyId: number): string {
    return 'https://fantasy.premierleague.com/api/entry/' + spicedaddyId + '/history/'

}

export async function getSpiceDaddyStats(spicedaddyId: number): Promise<HistoricSpiceDaddyStats> {

    const idToDaddyNameMap = await getIdToSpicedaddyNameMap()
    let wins: number = 0
    let top_three: number = 0
    let last_place: number = 0
    const winning_seasons: string[] = []
    const losing_seasons: string[] = []

    const daddyIdToUse = spicedaddyId === KACPER_ID ? KACPER_HISTORIC_ID : spicedaddyId

    for (const season of seasonOptions) {
        const historicSpicedaddies: HistoricStanding[] = await getHistoricSpicedaddyStanding(season)

        const sortedStandings = [...historicSpicedaddies].sort((a, b) => b.points - a.points);
        const index = sortedStandings.findIndex(entry => entry.id === daddyIdToUse);

        const rank = index + 1

        if (rank <= 3) {
            top_three++
        }

        if (rank == 7) {
            last_place++
            losing_seasons.push(season)
        }

        if (rank == 1) {
            wins++
            winning_seasons.push(season)
        }
    }

    return {
        id: spicedaddyId,
        name: idToDaddyNameMap.get(spicedaddyId) || "no name",
        wins: wins,
        top_three: top_three,
        last_place: last_place,
        champion_seasons: winning_seasons,
        losing_seasons: losing_seasons
    }
}




export async function getHistoricSpicedaddyStanding(season: string): Promise<HistoricStanding[]> {
    const historicSpicedaddies: HistoricSpiceDaddy[] = await getAllHistoricSpicedaddies()
    const idToDaddyNameMap = await getIdToSpicedaddyNameMap()

    const historicStandings: HistoricStanding[] = []


    historicSpicedaddies.forEach((historicSpiceDaddy) => {
        const performance = historicSpiceDaddy.performances.find(p => p.season === season)


        const historicStanding = {
            id: historicSpiceDaddy.id,
            points: performance?.points || 0,
            globalRank: performance?.rank || 0,
            spiceDaddyName: idToDaddyNameMap.get(historicSpiceDaddy.id) || ''
        }

        historicStandings.push(historicStanding)
    })

    return historicStandings
}



export async function getHistoricSpicedaddy(spicedaddyId: number): Promise<HistoricSpiceDaddy> {
    const historicSpicedaddyResponse = await fetch(historicInfoUrl(spicedaddyId))

    const historicSpicedaddyData = await historicSpicedaddyResponse.json()
    const idToDaddyNameMap = await getIdToSpicedaddyNameMap()

    const historicPerformances: HistoricPerformance[] = []

    historicSpicedaddyData.past.forEach((pastPerformance: any) => {
        const historicPerformance: HistoricPerformance = {
            season: pastPerformance.season_name,
            points: pastPerformance.total_points,
            rank: pastPerformance.rank,
        }

        historicPerformances.push(historicPerformance)
    })

    return {
        id: spicedaddyId,
        name: idToDaddyNameMap.get(spicedaddyId) || "error name",
        performances: historicPerformances,
    }
}

export async function getAllHistoricSpicedaddies(): Promise<HistoricSpiceDaddy[]> {
    const promises: Promise<HistoricSpiceDaddy>[] = []

    spiceDaddyIds.forEach((spicedaddyId) => {
        const promise = getHistoricSpicedaddy(
            spicedaddyId === KACPER_ID ? KACPER_HISTORIC_ID : spicedaddyId
        )
        promises.push(promise)
    })

    const historicSpicedaddyList = await Promise.all(promises)
    return historicSpicedaddyList
}
