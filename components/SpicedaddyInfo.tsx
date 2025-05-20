'use client'

import { HistoricSpiceDaddyStats } from "@/utils/getHistoricSpicedaddies";
import { Group, Paper, Space } from "@mantine/core";
import { Flex } from "@mantine/core";
import { idToPhotoMap } from "./SpicedaddyProfile";
import { Stack } from "@mantine/core";
import { Text } from "@mantine/core";
import { Box } from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { Grid } from "@mantine/core";
import { Title } from "@mantine/core";
import ProfielStatistics from "./ProfileStatistics";
import ProfileBio from "./ProfileBio";

type SpicedaddyInfoProps = {
    spicedaddy: HistoricSpiceDaddyStats
}

export default function SpicedaddyInfo({ spicedaddy }: SpicedaddyInfoProps) {


    return (
        <Box style={{ paddingLeft: 50, paddingRight: 50 }}>
            <Grid>
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        w="100%" 
                        h="100%" 
                    >
                        <Avatar
                            src={idToPhotoMap.get(spicedaddy.id)?.src}
                            size={200}
                        />
                        <Space h={'md'}/>
                        <Paper w="100%" maw={200}>
                            <Box p={6} ta="center"> 
                                <Text fw={700}>{spicedaddy.name}</Text>
                                <Text>{spicedaddy.alias}</Text>
                            </Box>
                        </Paper>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 9 }}>
                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                        <ProfileBio 
                            spicedaddy={spicedaddy}
                        />
                        <ProfielStatistics 
                            spicedaddy={spicedaddy}
                        />
                        <Paper>hi</Paper>
                        <Paper>hi</Paper>
                    </SimpleGrid>
                </Grid.Col>
            </Grid >
        </Box >
    )
}