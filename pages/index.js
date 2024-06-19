import React, { useEffect, useState } from "react";
import { HomeStore } from "../components/HomeStore";
import { HomeEstablishments } from "../components/HomeEstablishments";
import { isEmpty } from "lodash";
import Head from "next/head";
import url from "url";

export default function Home({ data, subdomain }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [data, subdomain]);

  console.debug("data", data);

  return (
    <>
      {!isEmpty(data) && subdomain && (
        <Head>
          <title>{data?.nome}</title>
          <link rel="shortcut icon" href={data?.logo_home} />
          <meta property="og:title" content={data?.nome} />
          <meta
            property="og:description"
            content={data?.frase_home || data?.nome}
          />
          <meta property="og:image" content={data?.logo_home} />
          <meta name="description" content={data?.frase_home || data?.nome} />
          <meta name="twitter:title" content={data?.nome} />
          <meta
            name="twitter:description"
            content={data?.frase_home || data?.nome}
          />
          <meta name="twitter:image" content={data?.logo_home} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
      )}

      {!loading && (
        <>
          {subdomain && !isEmpty(data) ? (
            <HomeStore data={data} subdomain={subdomain} />
          ) : (
            <HomeEstablishments />
          )}
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;

  // Obtenha o protocolo, host e URL do cliente
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const originalUrl = req.url;

  // Monte a URL completa do cliente
  const fullUrl = `${protocol}://${host}${originalUrl}`;

  // Extraia o subdomínio da URL
  const parsedUrl = new URL(fullUrl);
  const hostname = parsedUrl.hostname;
  const subdomain = hostname.split(".")[0];

  console.debug("fullUrl", fullUrl);
  console.debug("parsedUrl.hostname", hostname);
  console.debug("subdomain", subdomain);

  if (subdomain != process.env.NEXT_PUBLIC_BASE_URL_NAME_BASE_DOMAIN) {
    try {
      const username = "testserver";
      const password = "testserver";

      const headers = new Headers({
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}home/${subdomain}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();

      return {
        props: {
          data: data[0],
          subdomain,
        },
      };
    } catch (error) {
      console.debug("error API Marcio", error);
      return {
        props: {
          data: {},
          subdomain: "",
        },
      };
    }
  } else {
    return {
      props: {
        data: {},
        subdomain: "",
      },
    };
  }
}
