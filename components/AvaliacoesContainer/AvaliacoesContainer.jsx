import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Loading } from '../Loading';
import { avaliacoesActions } from '../../store/actions';
import { isEmpty } from 'lodash';
import { Box, Button, Card, CardBody, Flex, Icon, Text } from '@chakra-ui/react';
import { isLogged, userDataLogged } from '../../utils/auth';
import { FaRegStar, FaStar, FaStarHalf } from 'react-icons/fa';
import { FastField, Field, Form, Formik } from 'formik';
import FormField from '../FormField/FormField';

export const handleTotalStar = (avaliacoesData) => {
    if (!avaliacoesData || avaliacoesData.length === 0) {
        return 0; // Retorna 0 se não houver avaliações ou se o array estiver vazio
    }

    const totalEstrelas = avaliacoesData.reduce((total, avaliacao) => total + avaliacao.estrelas, 0);
    const mediaEstrelas = totalEstrelas / avaliacoesData.length;

    return mediaEstrelas;
}

function AvaliacoesContainer({ data, subdomain, avaliacoes, getAll, create }) {
    const [avaliacoesData, setAvaliacoesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setAvaliacoesData([]);
        setIsLoading(false)

        if (isEmpty(avaliacoes)) {
            getAll(subdomain);
        }
    }, []);

    useEffect(() => {
        if (avaliacoes.items) {
            setAvaliacoesData(avaliacoes.items);
            setIsLoading(false)
        } else {
            setAvaliacoesData([]);
        }

        if (avaliacoes.error == 'OK') {
            setAvaliacoesData([]);
            setIsLoading(false);
        }

        if (avaliacoes.loading) {
            setIsLoading(avaliacoes.loading);
            setAvaliacoesData([]);
        }
    }, [avaliacoes]);

    if (isLoading) {
        return (
            <Loading dtcolor={data?.primary_color} />
        )
    }

    const renderStars = (mediaEstrelas) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            const starValue = i - 0.5; // Valor da estrela considerando meias estrelas
            const isStarFull = starValue <= mediaEstrelas;
            const isHalfStar = starValue + 0.5 === mediaEstrelas;

            if (isStarFull) {
                stars.push(<Icon fontSize='20px' key={i} as={FaStar} color="yellow.500" />);
            } else if (isHalfStar) {
                stars.push(<Icon fontSize='20px' key={i} as={FaStarHalf} color="yellow.500" />);
            } else {
                stars.push(<Icon fontSize='20px' key={i} as={FaRegStar} color="yellow.500" />);
            }
        }

        return stars;
    };

    return (
        <Box w='100%'>

            <Flex justifyContent='center' alignItems='center'>
                <Text textAlign='center' fontSize='21px' mt='3px' mr='15px'>
                    {handleTotalStar(avaliacoesData)}
                </Text>

                {renderStars(handleTotalStar(avaliacoesData))}

                <Text textAlign='center' fontSize='12px' mt='3px' ml='15px'>
                    {avaliacoesData.length} {avaliacoesData.length <= 1 ? 'avaliação' : 'avaliações'}
                </Text>
            </Flex>

            {isLogged && isMounted && typeof window !== 'undefined' && (
                <Box w='100%'>
                    {avaliacoesData.filter((entry) => entry.id_user == userDataLogged?.id).length == 0 && (
                        <>
                            <Text fontSize='16px' fontWeight={600} mb='10px'>Fazer sua avaliação:</Text>

                            <Card>
                                <CardBody>
                                    <Formik
                                        enableReinitialize
                                        initialErrors={{}}
                                        initialValues={{}}
                                        onSubmit={(values) => {
                                            console.debug('values', {
                                                ...values,
                                                id_user: userDataLogged?.id,
                                                empresa: subdomain,
                                                nome: userDataLogged?.nome,
                                            })
                                            create({
                                                ...values,
                                                id_user: userDataLogged?.id,
                                                empresa: subdomain,
                                                nome: userDataLogged?.nome,
                                            })
                                        }}
                                    >
                                        {({ errors }) => (
                                            <Form>
                                                <Field
                                                    id='avaliacao'
                                                    name='avaliacao'
                                                    type='text'
                                                    placeholder='Avaliação'
                                                    component={FormField.Textarea}
                                                    error={errors.avaliacao}
                                                />
                                                <FastField
                                                    id='estrelas'
                                                    name='estrelas'
                                                    placeholder='Quantidade de estrelas'
                                                    component={FormField.Select}
                                                    error={errors.estrelas}
                                                    required
                                                >
                                                    <option value='0'>
                                                        0 estrelas
                                                    </option>
                                                    <option value='1'>
                                                        1 estrela
                                                    </option>
                                                    <option value='2'>
                                                        2 estrelas
                                                    </option>
                                                    <option value='3'>
                                                        3 estrelas
                                                    </option>
                                                    <option value='4'>
                                                        4 estrelas
                                                    </option>
                                                    <option value='5'>
                                                        5 estrelas
                                                    </option>
                                                </FastField>

                                                <Button
                                                    w='100%'
                                                    color='white'
                                                    variant='btnDallas'
                                                    type='submit'
                                                    disabled={Object.keys(errors).length > 0}
                                                    isLoading={isLoading}
                                                >
                                                    Cadastrar
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </CardBody>
                            </Card>
                        </>
                    )}
                </Box>
            )}

            {avaliacoesData.map((item, index) => (
                <Card key={index} mt={3}>
                    <CardBody>
                        <Flex justifyContent='space-between' alignItems='center' mb={item.avaliacao ? '10px' : ''}>
                            <Text fontSize='18px' fontWeight={600} mt='5px'>{item.nome}</Text>
                            <Flex alignItems='center'>
                                <Text fontSize='21px' mt='3px' mr='15px'>{item.estrelas}</Text>
                                {renderStars(item.estrelas)}
                            </Flex>
                        </Flex>

                        <Text fontSize='xs'>{item.avaliacao}</Text>
                    </CardBody>
                </Card>
            ))}
        </Box>
    )
}

function mapState(state) {
    const { avaliacoes } = state;
    return { avaliacoes };
}

const actionCreators = {
    getAll: avaliacoesActions.getAll,
    create: avaliacoesActions.create
};

export default connect(mapState, actionCreators)(AvaliacoesContainer);