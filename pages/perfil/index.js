import Head from "next/head";
import React, { useEffect, useState } from "react";

import { NavbarOrder } from "../../components/NavbarOrder";
import { isLogged, userDataLogged } from "../../utils/auth";
import { RegisterForm } from "../../components/RegisterForm";
import { Container } from "@chakra-ui/react";
import { ProfileContent } from "../../components/ProfileContent";
import url from "url";

function Perfil({ data, subdomain }) {
  const [isLoggedState, setIsLoggedState] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [data, subdomain]);

  useEffect(() => {
    setIsLoggedState(isLogged);
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      setUser(userDataLogged);
    }
  }, [isLogged, userDataLogged]);

  return (
    <>
      <Head>
        <title>Perfil</title>
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
          <NavbarOrder text="Perfil" data={data} />

          <Container
            maxW="100%"
            centerContent
            mt={["105px", "100px"]}
            mb="30px"
          >
            {!isLoggedState ? (
              <RegisterForm data={data} setIsLoggedState={setIsLoggedState} />
            ) : (
              <ProfileContent
                data={data}
                user={user}
                setIsLoggedState={setIsLoggedState}
              />
            )}
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

export default Perfil;
