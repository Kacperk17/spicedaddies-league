
'use client'
import { Table, Text } from "@mantine/core"
import { HistoricStanding } from "@/utils/getHistoricSpicedaddies"
import styles from './HistoricLeagueStandings.module.css'
import { useRouter } from "next/navigation"
import { KACPER_HISTORIC_ID, KACPER_ID } from "@/utils/getSpiceDaddies"
import { rankToDisplayMap } from "../profile/ProfileStatistics"


interface HistoricStandingProps {
    standings: HistoricStanding[]
}

export default function HistoricStandings({ standings }: HistoricStandingProps) {
    const sortedStandings = [...standings].sort((a, b) => b.points - a.points);
    const router = useRouter()

    const rows = sortedStandings.map((standing, index) => (
        <Table.Tr key={standing.id}>
            <Table.Td>
                <Text>{rankToDisplayMap.get(index + 1)}</Text>
            </Table.Td>
            <Table.Td>
                <Text fw={700}
                    onClick={() => router.push(`/spicedaddy-info?spicedaddyId=${standing.id === KACPER_HISTORIC_ID ? KACPER_ID : standing.id}`)}
                    style={{ cursor: 'pointer' }}
                >{standing.spiceDaddyName}</Text>
            </Table.Td>
            <Table.Td>
                <Text>{standing.points}</Text>
            </Table.Td>
            <Table.Td className={styles.hideOnMobile}>
                <Text>{standing.globalRank}</Text>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>#</Table.Th>
                    <Table.Th>SpiceDaddy</Table.Th>
                    <Table.Th>Points</Table.Th>
                    <Table.Th className={styles.hideOnMobile}>Overall Rank</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}
