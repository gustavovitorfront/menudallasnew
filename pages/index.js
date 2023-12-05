import React, { useEffect, useState } from 'react';
import { HomeStore } from '../components/HomeStore';
import { HomeEstablishments } from '../components/HomeEstablishments';
import { isEmpty } from 'lodash';
import Head from 'next/head';
import url from 'url';

export default function Home({ data, subdomain }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [data, subdomain]);

  return (
    <>
      {!loading && (
        <>
          {!isEmpty(data) && subdomain && (
            <Head>
              <title>{data?.nome}</title>
              <link rel="shortcut icon" href={data?.logo_home} />
              <meta property="og:title" content={data?.nome} />
              <meta property="og:description" content={data?.frase_home || data?.nome} />
              <meta property="og:image" content={data?.logo_home} />
              <meta name="description" content={data?.frase_home || data?.nome} />
              <meta name="twitter:title" content={data?.nome} />
              <meta name="twitter:description" content={data?.frase_home || data?.nome} />
              <meta name="twitter:image" content={data?.logo_home} />
              <meta name="twitter:card" content="summary_large_image" />
            </Head>
          )}

          {subdomain && !isEmpty(data) ? (
            <HomeStore data={data} subdomain={subdomain} />
          ) : (
            <HomeEstablishments />
          )
          }
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const host = context.req.headers['x-forwarded-host'] || context.req.headers.host;
  const subdomain = url.parse(`https://${host}`).hostname.split('.')[0];

  if (subdomain != process.env.NEXT_PUBLIC_BASE_URL_NAME_BASE_DOMAIN) {
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
      props: {
        data: {},
        subdomain: ''
      },
    };
  }
}