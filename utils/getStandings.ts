import { getAllSpiceDaddies } from "./getSpiceDaddies";

export const SPICEDADDIES_LEAGUE_ID: number = 401377
export const SPICEDADDIES_LEAGUE_STANDINGS_URL: string = 'https://fantasy.premierleague.com/api/leagues-classic/' + SPICEDADDIES_LEAGUE_ID + '/standings'

export interface Standing {
    id: number;
    event_total: number;
    player_name: string;
    rank: number;
    total: number;
    entry_name: string;
    transfer_hits: number,
}


export async function getSpicedaddiesLeagueStanding(gw: number): Promise<Standing[]> {
    
    const players = await getAllSpiceDaddies(gw)

    const sortedPlayers = players.sort((a, b) => b.total_points - a.total_points);


    const standings: Standing[] = sortedPlayers.map((player, index) => ({
        id: player.id,
        event_total: player.current_gw_points,
        player_name: player.name,
        rank: index + 1, 
        total: player.total_points,
        entry_name: player.teamName,
        transfer_hits: player.transfer_hits
    }));

    

    return standings;
}
