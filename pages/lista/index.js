import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Navbar from '../../components/Navbar/Navbar'
import HeaderHomeStore from '../../components/HeaderHomeStore/HeaderHomeStore'
import InfoStoreHome from '../../components/InfoStoreHome/InfoStoreHome'
import Head from 'next/head'
import { MenuOptionsStore } from '../../components/MenuOptionsStore'
import { MainProducts } from '../../components/MainProducts'
import { ProductsList } from '../../components/ProductsList'
import { FooterStore } from '../../components/FooterStore'
import { Box } from '@chakra-ui/react'

function lista() {
    const [refreshSearch, setRefreshSearch] = useState(true);

    return (
        <>
            <Head>
                <title>MenuDallas</title>
            </Head>

            <Layout isOnlySubdomain>
                {({ data, subdomain }) => (
                    <>
                        <Head>
                            <title>{data?.nome}</title>
                            <link rel="shortcut icon" href={data?.logo_home} />
                        </Head>

                        <Navbar isHome={false} hasSearch={true} setRefreshSearch={setRefreshSearch} />

                        <Box id='header'>
                            <HeaderHomeStore data={data} />
                            <InfoStoreHome type={2} data={data} subdomain={subdomain} />
                            <MenuOptionsStore data={data} subdomain={subdomain} />
                        </Box>
                        <MainProducts data={data} subdomain={subdomain} refreshSearch={refreshSearch} setRefreshSearch={setRefreshSearch} />
                        <ProductsList data={data} />
                        <FooterStore data={data} subdomain={subdomain} />
                    </>
                )}
            </Layout>
        </>
    )
}

export default lista
