import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

function MainBanners() {
    return (
        <Flex flexWrap='wrap' w='100%' justifyContent='center' alignItems='center' mb={['30px','60px']}>
            <Box borderRadius='8px' mb={['20px', '']} overflow='hidden' maxW={['100%','30%']} h={['140px','182px']} mr={['','5%']}>
                <Image
                    src="/img/bannerExample1.png"
                    width={366}
                    height={182}
                    style={{
                        height: '100%'
                    }}
                    objectFit='cover'
                    objectPosition='center'
                    alt="Menu Dallas Vetor"
                />
            </Box>
            <Box borderRadius='8px' mb={['20px', '']} overflow='hidden' maxW={['100%','30%']} h={['140px','182px']} mr={['','5%']}>
                <Image
                    src="/img/bannerExample1.png"
                    width={366}
                    height={182}
                    style={{
                        height: '100%'
                    }}
                    objectFit='cover'
                    objectPosition='center'
                    alt="Menu Dallas Vetor"
                />
            </Box>
            <Box borderRadius='8px' mb={['20px', '']} overflow='hidden' maxW={['100%','30%']} h={['140px','182px']}>
                <Image
                    src="/img/bannerExample1.png"
                    width={366}
                    height={182}
                    style={{
                        height: '100%'
                    }}
                    objectFit='cover'
                    objectPosition='center'
                    alt="Menu Dallas Vetor"
                />
            </Box>
        </Flex>
    )
}

export default MainBanners
