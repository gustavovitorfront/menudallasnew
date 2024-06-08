import { Box, Container } from '@chakra-ui/react'
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import HeaderHome from '../HeaderHome/HeaderHome'
import MainBanners from '../MainBanners/MainBanners'
import MainCategories from '../MainCategories/MainCategories'
import EstablishmentsList from '../EstablishmentsList/EstablishmentsList'
import InfosFooter from '../InfosFooter/InfosFooter'
import FooterHome from '../FooterHome/FooterHome'
import Head from 'next/head'

function HomeEstablishments() {
    const [segmentoActive, setSegmentoActive] = useState('');
    const [locActive, setLocActive] = useState({});

    return (
        <Box pt='88px'>
            <Head>
                <title>MenuDallas</title>
                <link rel="shortcut icon" href='img/logo192.png' />
                <style>
                    {`
                        body {
                            background: white !important;
                        }
                    `}
                </style>
            </Head>

            <Navbar />
            <HeaderHome setLocActive={setLocActive} />

            <Container maxW='100%' pl={['30px', '50px']} pr={['30px', '50px']} mt={['30px', '40px']}>
                <MainBanners />
                <MainCategories setSegmentoActive={setSegmentoActive} />
                <EstablishmentsList segmentoActive={segmentoActive} locActive={locActive} setSegmentoActive={setSegmentoActive} />
            </Container>

            <InfosFooter />
            <FooterHome />
        </Box>
    )
}

export default HomeEstablishments
