import React from 'react'
import { Layout } from '../../components/Layout';
import { ProductContainer } from '../../components/ProductContainer';

function Produto() {
    return (
        <Layout isOnlySubdomain>
            {({ subdomain, data }) => (
                <ProductContainer data={data} subdomain={subdomain} />
            )}
        </Layout>
    )
}

export default Produto;