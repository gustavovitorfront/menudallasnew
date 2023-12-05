import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import { NavbarOrder } from '../../components/NavbarOrder'
import { isLogged, userDataLogged } from '../../utils/auth'
import { RegisterForm } from '../../components/RegisterForm'
import { Container } from '@chakra-ui/react'
import { ProfileContent } from '../../components/ProfileContent'

function Perfil({ data, subdomain }) {
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
                <link rel="shortcut icon" href={data?.logo_home} />
            </Head>

            <NavbarOrder text='Perfil' data={data} />

            <Container maxW='100%' centerContent mt={['105px', '100px']} mb='30px'>
                {!isLoggedState ? <RegisterForm data={data} setIsLoggedState={setIsLoggedState} /> : <ProfileContent data={data} user={user} setIsLoggedState={setIsLoggedState} />}
            </Container>
        </>
    )
}

export async function getServerSideProps(context) {
    const subdomain = context.req.headers.host.split('.')[0];

    if (subdomain != process.env.NEXT_PUBLIC_BASE_URL_DOMAIN) {
        try {
            const response = await fetch(`https://api.edenerp.com.br:8081/home?empresa=${subdomain}`);
            const data = await response.json();

            return {
                props: {
                    data: data[0],
                    subdomain
                },
            };
        } catch (error) {
            return {
                props: {
                    data: {},
                    subdomain: ''
                },
            };
        }
    } else {
        return {
            redirect: {
                destination: process.env.NEXT_PUBLIC_BASE_URL,
                permanent: false,
            },
        };
    }
}

export default Perfil
