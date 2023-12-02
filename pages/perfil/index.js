import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { NavbarOrder } from '../../components/NavbarOrder'
import { isLogged, userDataLogged } from '../../utils/auth'
import { RegisterForm } from '../../components/RegisterForm'
import { Container } from '@chakra-ui/react'
import { ProfileContent } from '../../components/ProfileContent'

function Perfil() {
    const [isLoggedState, setIsLoggedState] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setIsLoggedState(isLogged)
    }, [isLogged]);

    useEffect(() => {
        if (isLogged) {
            setUser(userDataLogged)
        }
    }, [isLogged, userDataLogged]);

    return (
        <>
            <Head>
                <title>Perfil</title>
            </Head>

            <Layout isOnlySubdomain>
                {({ subdomain, data }) => (
                    <>
                        <Head>
                            <link rel="shortcut icon" href={data?.logo_home} />
                        </Head>

                        <NavbarOrder text='Perfil' data={data} />

                        <Container maxW='100%' centerContent mt={['105px', '100px']} mb='30px'>
                            {!isLoggedState ? <RegisterForm data={data} setIsLoggedState={setIsLoggedState} /> : <ProfileContent data={data} user={user} setIsLoggedState={setIsLoggedState} />}
                        </Container>
                    </>)}
            </Layout>
        </>
    )
}

export default Perfil
