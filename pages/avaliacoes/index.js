import Head from "next/head";
import React, { useEffect, useState } from "react";
import { NavbarOrder } from "../../components/NavbarOrder";
import { Container } from "@chakra-ui/react";
import { AvaliacoesContainer } from "../../components/AvaliacoesContainer";
import url from "url";

function Avaliacoes({ data, subdomain }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [data, subdomain]);

  return (
    <>
      <Head>
        <title>Histórico de Avaliações</title>
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

      {!loading && (
        <>
          <NavbarOrder
            text="Histórico de Avaliações"
            data={data}
            linkBack="/lista"
          />

          <Container
            maxW="100%"
            centerContent
            mt={["105px", "100px"]}
            mb="30px"
          >
            <AvaliacoesContainer data={data} subdomain={subdomain} />
          </Container>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const host =
    context.req.headers["x-forwarded-host"] || context.req.headers.host;
  const subdomain = url.parse(`https://${host}`).hostname.split(".")[0];

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
      return {
        props: {
          data: {},
          subdomain: "",
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

export default Avaliacoes;
