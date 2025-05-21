import { HistoricSpiceDaddyStats } from "@/utils/getHistoricSpicedaddies"
import { Paper, Flex, Title, Text, Container, Space } from "@mantine/core"


type ProfileBioProps = {
    spicedaddy: HistoricSpiceDaddyStats
}

export default function ProfileBio({ spicedaddy }: ProfileBioProps) {

    return (
        <Paper>
            <Space h={'sm'}/>
            <Flex justify={'center'}>
                <Title>Bio</Title>
            </Flex>
            <Container>
                <Text>{spicedaddy.bio}</Text>
            </Container>
            <Space h={'sm'}/>
        </Paper>
    )
}