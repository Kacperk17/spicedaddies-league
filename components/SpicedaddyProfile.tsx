'use client'

import { Flex, Paper } from "@mantine/core"
import classes from './SpicedaddyProfile.module.css'
import { Text } from "@mantine/core"
import { Group } from "@mantine/core"
import { HistoricSpiceDaddy, HistoricSpiceDaddyStats } from "@/utils/getHistoricSpicedaddies"
import { Image } from "@mantine/core"
import NextImage from "next/image"
import { KACPER_ID, ZIGGY_ID, SHANE_ID, DUG_ID, CATHAL_ID, JOSH_ID, AARON_ID } from "@/utils/getSpiceDaddies"
import kacperProfile from '../app/images/spicedaddy_profiles/kacper.jpg';
import aaronProfile from '../app/images/spicedaddy_profiles/aaron.png';
import cathalProfile from '../app/images/spicedaddy_profiles/cathal.jpg';
import dugProfile from '../app/images/spicedaddy_profiles/dug.jpg';
import joshProfile from '../app/images/spicedaddy_profiles/josh.jpg';
import shaneProfile from '../app/images/spicedaddy_profiles/shane.jpg';
import ziggyProfile from '../app/images/spicedaddy_profiles/ziggy.jpg';

interface ProfileProps {
    spicedaddy: HistoricSpiceDaddyStats,
}

export default function SpicedaddyProfile({
    spicedaddy,
}: ProfileProps) {

    const idToPhotoMap = new Map([
        [KACPER_ID, kacperProfile],
        [ZIGGY_ID, ziggyProfile],
        [SHANE_ID, shaneProfile],
        [DUG_ID, dugProfile],
        [CATHAL_ID, cathalProfile],
        [JOSH_ID, joshProfile],
        [AARON_ID, aaronProfile]
    ])

    return (
        <Paper
            className={classes.profile}
            w={200}
        >
            <Flex justify={'center'} >
                <Image
                    src={idToPhotoMap.get(spicedaddy.id)}
                    h={250}
                    w={'100%'}
                    fit="contain"
                    component={NextImage}
                    alt="spicedaddy_profile"
                />
            </Flex>
            <Flex justify={'center'} >
                <Text size='lg' fw={500}>{spicedaddy.name}</Text>
            </Flex>
            <Flex justify={'center'} >
                <Group>
                    <Text>Wins: {spicedaddy.wins}</Text>
                    <Text>Podium: {spicedaddy.top_three}</Text>
                </Group>
            </Flex>

        </Paper>
    )

}