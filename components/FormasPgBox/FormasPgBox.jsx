import { ListItem, UnorderedList } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { formasPgActions } from '../../store/actions';
import { isEmpty } from 'lodash';

function FormasPgBox({ data, subdomain, getAll, formasPg }) {
    const [isLoading, setIsLoading] = useState(false);
    const [formasPgData, setFormasPgData] = useState([]);

    useEffect(() => {
        if (isEmpty(formasPg)) {
            setFormasPgData([]);
            setIsLoading(false)
            getAll(subdomain);
        }
    }, []);

    useEffect(() => {
        if (formasPg.items) {
            setFormasPgData(formasPg.items);
            setIsLoading(false)
        } else {
            setFormasPgData([]);
        }

        if (formasPg.loading) {
            setIsLoading(formasPg.loading);
        }
    }, [formasPg]);

    if (isLoading) {
        return null;
    }

    return (
        <UnorderedList ml='45px' mt='10px'>
            {formasPgData.map((payment, key) => (
                <ListItem fontSize='14px' fontWeight={500} key={key}>{payment.descricao}</ListItem>
            ))}
        </UnorderedList>
    )
}

function mapState(state) {
    const { formasPg } = state;
    return { formasPg };
}

const actionCreators = {
    getAll: formasPgActions.getAll,
};

export default connect(mapState, actionCreators)(FormasPgBox);
