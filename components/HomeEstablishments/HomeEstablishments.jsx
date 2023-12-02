import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import HeaderHome from '../HeaderHome/HeaderHome'
import MainBanners from '../MainBanners/MainBanners'
import MainCategories from '../MainCategories/MainCategories'
import EstablishmentsList from '../EstablishmentsList/EstablishmentsList'
import InfosFooter from '../InfosFooter/InfosFooter'
import FooterHome from '../FooterHome/FooterHome'

function HomeEstablishments() {
    return (
        <Box pt='88px'>
            <Navbar />
            <HeaderHome />

            <Container maxW='100%' pl={['30px', '50px']} pr={['30px', '50px']} mt={['30px', '40px']}>
                <MainBanners />
                <MainCategories />
                <EstablishmentsList />
            </Container>

            <InfosFooter />
            <FooterHome />
        </Box>
    )
}

export default HomeEstablishments
