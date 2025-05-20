
import { Paper, Flex, Title, SimpleGrid, Box, Stack, Text, Space } from "@mantine/core"

import { HistoricSpiceDaddyStats } from "@/utils/getHistoricSpicedaddies";

type ProfielStatisticsProps = {
    spicedaddy: HistoricSpiceDaddyStats
}

function getAverageRank(spicedaddy: HistoricSpiceDaddyStats): string {
    const ranks = Object.values(spicedaddy.seasonToRankMap);

    if (ranks.length === 0) return "0";

    const averageRank = ranks.reduce((sum, rank) => sum + rank, 0) / ranks.length

    return averageRank.toFixed(2);
}

export default function ProfielStatistics({ spicedaddy }: ProfielStatisticsProps) {

    const rankToDisplayMap = new Map([
        [1, '1st 🏆'],
        [2, '2nd 🥈'],
        [3, '3rd 🥉'],
        [4, '4th'],
        [5, '5th'],
        [6, '6th'],
        [7, '7th 💩']
    ])

    return (
        <Paper>
            <Space h={'sm'}/>
            <Flex justify={'center'}>
                <Title>Statistics</Title>
            </Flex>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <Box>
                    <Flex justify={'center'}>
                        <Title order={4}>Past Performance</Title>
                    </Flex>
                    <Flex justify={'center'}>
                        <Text>
                            {Object.entries(spicedaddy.seasonToRankMap).map(([season, rank]) => (
                                <span key={season} style={{ display: 'block' }}>
                                    {season.slice(-5)}: {rankToDisplayMap.get(rank)}
                                </span>
                            ))}
                        </Text>
                    </Flex>
                </Box>

                <Box>
                    <Flex justify={'center'}>
                        <Title order={4}>Other</Title>
                    </Flex>
                    <Flex justify={'center'}>
                        <Stack>
                            <Text>
                                Average Rank: {getAverageRank(spicedaddy)}
                            </Text>
                            <Text>Wins: {spicedaddy.wins}</Text>
                            <Text>Podium finishes: {spicedaddy.top_three}</Text>
                            <Text>Last finishes: {spicedaddy.last_place}</Text>
                        </Stack>
                    </Flex>
                </Box>

            </SimpleGrid>
            <Space h={'sm'}/>
        </Paper>)
}