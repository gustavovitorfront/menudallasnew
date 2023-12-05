import React from 'react';
import { HomeStore } from '../components/HomeStore';
import { HomeEstablishments } from '../components/HomeEstablishments';
import { isEmpty } from 'lodash';
import Head from 'next/head';

export default function Home({ data, subdomain }) {
  return (
    <>
      {!isEmpty(data) && subdomain && (
        <Head>
          <title>{data?.nome}</title>
          <link rel="shortcut icon" href={data?.logo_home} />
        </Head>
      )}

      {subdomain && !isEmpty(data) ? (
        <HomeStore data={data} subdomain={subdomain} />
      ) : (
        <HomeEstablishments />
      )
      }
    </>
  )
}

export async function getServerSideProps(context) {
  const subdomain = context.req.headers.host.split('.')[0];

  if (subdomain) {
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
  }
}