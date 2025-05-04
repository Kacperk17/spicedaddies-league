'use client'
import { Table } from "@mantine/core";
import { Text } from "@mantine/core";
import { Standing } from "@/utils/getStandings";

type LeagueStandingProps = {
    standings: Standing[],
    gw: number
  };

export default function LeagueStandings({ standings, gw }: LeagueStandingProps ) {

    

    const rows = standings.map((standing) => (
        <Table.Tr key={standing.rank}>
            <Table.Td>
                <Text>{standing.rank}</Text>
            </Table.Td>
            <Table.Td>
                <Text fw={700}>{standing.entry_name}</Text>
                <Text size="sm">{standing.player_name}</Text>
            </Table.Td>
            <Table.Td>
                <Text>{standing.event_total}</Text>
                {standing.transfer_hits > 0 && <Text size="sm">(-{standing.transfer_hits})</Text>}
            </Table.Td>
            <Table.Td>
                <Text>{standing.total}</Text>
            </Table.Td>
        </Table.Tr>
    ));



    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>#</Table.Th>
                    <Table.Th>Team</Table.Th>
                    <Table.Th>GW {gw}</Table.Th>
                    <Table.Th>Points</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}


