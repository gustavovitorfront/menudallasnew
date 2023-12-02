import Head from 'next/head'
import React from 'react'
import { Layout } from '../../components/Layout'
import { NavbarOrder } from '../../components/NavbarOrder'
import { Container } from '@chakra-ui/react'
import { AvaliacoesContainer } from '../../components/AvaliacoesContainer'

function Avaliacoes() {
  return (
    <>
      <Head>
        <title>Histórico de Avaliações</title>
      </Head>

      <Layout isOnlySubdomain>
        {({ subdomain, data }) => (
          <>
            <Head>
              <link rel="shortcut icon" href={data?.logo_home} />
            </Head>

            <NavbarOrder text='Histórico de Avaliações' data={data} linkBack='/lista' />

            <Container maxW='100%' centerContent mt={['105px', '100px']} mb='30px'>
                <AvaliacoesContainer data={data} subdomain={subdomain} />
            </Container>
          </>)}
      </Layout >
    </>
  )
}

export default Avaliacoes
