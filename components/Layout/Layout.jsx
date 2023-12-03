import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading } from '../Loading';
import { useRouter } from 'next/navigation'
import { connect } from 'react-redux';
import { homeActions } from '../../store/actions/home.actions';
import { isEmpty } from 'lodash';

function getSubdomain() {
    const host = window.location.host;
    const parts = host.split('.');

    if (parts.length > 1) {
        return parts[0];
    }

    return null;
}

function Layout({ children, isOnlySubdomain = false, getAll, home }) {
    const [subdomain, setSubdomain] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [homeData, setHomeData] = useState([]);

    const router = useRouter();

    useEffect(() => {
        setSubdomain(getSubdomain());
        setIsLoaded(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (subdomain && isEmpty(home)) {
            setHomeData([]);
            setIsLoading(true)
            getAll(subdomain);
        }
    }, [subdomain]);

    useEffect(() => {
        if (home.items) {
            setHomeData(home.items);
            setIsLoading(false)
        } else {
            setHomeData([]);
        }

        console.log('home', home)

        if (home.error) {
            window.location.href = 'https://menudallas.com.br'
        }

        if (home.loading) {
            setIsLoading(home.loading);
        }
    }, [home]);

    if (isLoading) {
        return <Loading />;
    }

    if (!isLoading && isLoaded && isOnlySubdomain && !subdomain) {
        if (typeof window === "undefined") return null;
        router.push('/')
    }

    if (!isLoaded) return null;

    return children({ subdomain, isLoading, isLoaded, data: homeData.length > 0 ? homeData[0] : {} })
}

function mapState(state) {
    const { home } = state;
    return { home };
}

const actionCreators = {
    getAll: homeActions.getAll,
};

export default connect(mapState, actionCreators)(Layout);