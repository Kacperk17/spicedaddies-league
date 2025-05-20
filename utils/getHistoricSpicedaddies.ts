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
    losing_seasons: string[],
    alias: string,
    seasonToRankMap: Map<string, number>,
    bio: string
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
    const seasonToRankMap: Map<string, number> = new Map()

    const daddyIdToUse = spicedaddyId === KACPER_ID ? KACPER_HISTORIC_ID : spicedaddyId

    for (const season of seasonOptions) {


        console.log("Getting Historing Spicedaddy Standing")
        const historicSpicedaddies: HistoricStanding[] = await getHistoricSpicedaddyStanding(season)

        const sortedStandings = [...historicSpicedaddies].sort((a, b) => b.points - a.points);
        const index = sortedStandings.findIndex(entry => entry.id === daddyIdToUse);

        const rank = index + 1
        seasonToRankMap.set(season, rank)

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
        losing_seasons: losing_seasons,
        alias: "",
        seasonToRankMap: seasonToRankMap,
        bio: ""
    }
}




export async function getHistoricSpicedaddyStanding(season: string): Promise<HistoricStanding[]> {

    console.log("Getting All Historic Spicedaddies")
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
    const historicSpicedaddyList: HistoricSpiceDaddy[] = [];
    
    for (const spicedaddyId of spiceDaddyIds) {
      const adjustedId = spicedaddyId === KACPER_ID ? KACPER_HISTORIC_ID : spicedaddyId;
      
      // Process one at a time with delay
      const data = await getHistoricSpicedaddy(adjustedId);
      historicSpicedaddyList.push(data);
      
      // Add delay (e.g., 500ms between requests)
      await new Promise(resolve => setTimeout(resolve, 50)); 
    }
    
    return historicSpicedaddyList;
  }
