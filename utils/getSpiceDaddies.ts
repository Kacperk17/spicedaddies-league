export const CURRENT_GW = 35
const SPICEDADDY_INFO_URL = 'https://fantasy.premierleague.com/api/entry/'
const FPL_FIXTURE_URL = 'https://fantasy.premierleague.com/api/fixtures/'
const BOOTSTRAP_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/'
const SPICEDADDY_HISTORIC_INFO = 'https://fantasy.premierleague.com/api/entry/979206/history/'


export const KACPER_ID = 810494
export const KACPER_HISTORIC_ID = 11479878
const ZIGGY_ID = 979206
const JOSH_ID = 7585390
const AARON_ID = 1673693
const SHANE_ID = 2058723
const DUG_ID = 18550
const CATHAL_ID = 342589

export const spiceDaddyIds = [KACPER_ID, ZIGGY_ID, JOSH_ID, AARON_ID, SHANE_ID, DUG_ID, CATHAL_ID]

function liveInfoUrl(spiceDaddyId: number, gw: number): string {
    return 'https://fantasy.premierleague.com/api/entry/' + spiceDaddyId + '/event/' + gw + '/picks/'
}

function liveGwInfoUrl(gw: number): string {
    return 'https://fantasy.premierleague.com/api/event/' + gw + '/live/'
}

function spiceDaddyInfoUrl(spiceDaddyId: number) {
    return 'https://fantasy.premierleague.com/api/entry/' + spiceDaddyId
}


interface SpiceDaddy {
    id: number,
    name: string,
    teamName: string,
    total_points: number,
    current_gw_points: number,
    transfer_hits: number
}

interface BonusPoint {
    player_id: number,
    bonus_points: number
}

interface Fixture {
    id: number,
    gameweek: number,
    bonus_awarded: BonusPoint[]
}

interface Player {
    id: number,
    name: string,
}

export async function getAllSpiceDaddies(gw: number): Promise<SpiceDaddy[]> {

    const spiceDaddyList: Promise<SpiceDaddy>[] = []

    spiceDaddyIds.forEach((spiceDaddyId) => {

        const spiceDaddy = getSpiceDaddy(spiceDaddyId, gw)
        spiceDaddyList.push(spiceDaddy)
    })


    return await Promise.all(spiceDaddyList)

}

export async function getIdToSpicedaddyNameMap() {
    const responses = await Promise.all(
        spiceDaddyIds.map(id => fetch(spiceDaddyInfoUrl(id)))
    )

    const jsonData = await Promise.all(
        responses.map(response => response.json())
    )

    const idToSpicedaddyNameMap = new Map<number, string>()

    jsonData.forEach((daddy) => {
        idToSpicedaddyNameMap.set(daddy.id, daddy.player_first_name + ' ' + daddy.player_last_name)
    })

    idToSpicedaddyNameMap.set(KACPER_HISTORIC_ID, "Kacper Kutkiewicz")

    return idToSpicedaddyNameMap
}

async function getPlayerMap(): Promise<any> {

    const bootstrap = await fetch(BOOTSTRAP_URL)
    const dataBootstrap = await bootstrap.json()

    const idToPlayerMap = new Map()
    const elements = dataBootstrap.elements

    elements.forEach((element: { id: number; web_name: string }) => {
        idToPlayerMap.set(element.id, element.web_name)
    })

    return idToPlayerMap


}

export async function getSpiceDaddy(spiceDaddyId: number, gw: number): Promise<SpiceDaddy> {

    const responseGwInfo = await fetch(liveInfoUrl(spiceDaddyId, gw))
    const dataGwInfo = await responseGwInfo.json()

    const responseSpiceDaddyInfo = await fetch(SPICEDADDY_INFO_URL + spiceDaddyId)
    const dataSpiceDaddyInfo = await responseSpiceDaddyInfo.json()

    const responsePreviousGwInfo = await fetch(liveInfoUrl(spiceDaddyId, gw - 1))
    const dataPreviousGwInfo = await responsePreviousGwInfo.json()

    const previousGwPoints = dataPreviousGwInfo.entry_history?.total_points || 0
    const transferHits = dataGwInfo.entry_history.event_transfers_cost

    const livePointsMap = await getLivePointsMap(gw)
    const idToPlayerMap = await getPlayerMap()


    const fixtures = await getCurrentGwFixtures()



    let pointSum = 0

    dataGwInfo.picks.forEach((player: any) => {
        let bonus: number = 0

        const livePoints: number = livePointsMap.get(player.element)?.points || 0
        const actualPoints: number = livePoints * player.multiplier

        pointSum += actualPoints
    })



    return {
        id: spiceDaddyId,
        name: dataSpiceDaddyInfo.player_first_name + " " + dataSpiceDaddyInfo.player_last_name,
        teamName: dataSpiceDaddyInfo.name,
        total_points: (previousGwPoints + pointSum) - transferHits,
        current_gw_points: pointSum,
        transfer_hits: transferHits
    }

}

async function getLivePointsMap(gw: number) {
    const responseLiveGW = await fetch(liveGwInfoUrl(gw))
    const dataLiveGW = await responseLiveGW.json()

    const livePointsMap = new Map<number, { points: number, bonusAwarded: boolean }>()

    dataLiveGW.elements.forEach((player: any) => {
        livePointsMap.set(player.id, { points: player.stats.total_points, bonusAwarded: player.stats.bonus !== 0 });
    })


    return livePointsMap
}

async function getCurrentGwFixtures(): Promise<Fixture[]> {
    const responseFixtures = await fetch(FPL_FIXTURE_URL)
    const dataFixtures = await responseFixtures.json()

    const filteredFixtures: Fixture[] = dataFixtures.filter((fixture: any) => fixture.event === CURRENT_GW).map((fixture: any) => {

        const fixtureBonus = fixture.stats.find((stat: any) => stat.identifier === "bonus")

        const bonus_awarded: BonusPoint[] = [];

        if (fixtureBonus) {
            const homeBonuses = fixtureBonus.h.map((entry: any) => ({
                player_id: entry.element,
                bonus_points: entry.value,
            }));

            const awayBonuses = fixtureBonus.a.map((entry: any) => ({
                player_id: entry.element,
                bonus_points: entry.value,
            }));

            bonus_awarded.push(...homeBonuses, ...awayBonuses);
        }

        return {
            id: fixture.id,
            gameweek: fixture.event,
            bonus_awarded: bonus_awarded,
        }

    })

    return filteredFixtures
}
