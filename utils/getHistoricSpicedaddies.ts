import { spiceDaddyIds, getSpiceDaddy, KACPER_HISTORIC_ID, KACPER_ID } from "./getSpiceDaddies"
import { getIdToSpicedaddyNameMap } from "./getSpiceDaddies"

interface HistoricSpiceDaddy {
    id: number,
    performances: HistoricPerformance[]
}

export interface HistoricStanding {
    id: number,
    points: number,
    spiceDaddyName: string,
    globalRank: number
}

export interface HistoricPerformance {
    season: string,
    points: number,
    rank: number
}

function historicInfoUrl(spicedaddyId: number): string {
    return 'https://fantasy.premierleague.com/api/entry/' + spicedaddyId + '/history/'

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

    console.log(historicStandings)

    return historicStandings
}
    

export async function getHistoricSpicedaddy(spicedaddyId: number): Promise<HistoricSpiceDaddy> {
    const historicSpicedaddyResponse = await fetch(historicInfoUrl(spicedaddyId))
    const historicSpicedaddyData = await historicSpicedaddyResponse.json()

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
        performances: historicPerformances
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
