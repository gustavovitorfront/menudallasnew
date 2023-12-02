import React from 'react';
import Layout from '../components/Layout/Layout';
import { HomeStore } from '../components/HomeStore';
import { HomeEstablishments } from '../components/HomeEstablishments';
import { isEmpty } from 'lodash';

export default function Home() {

  return (
    <>
      <Layout>
        {({ subdomain, data }) => {
          return subdomain && !isEmpty(data) ? (
            <HomeStore data={data} subdomain={subdomain} />
          ) : (
            <HomeEstablishments />
          )
        }}
      </Layout>
    </>
  )
}