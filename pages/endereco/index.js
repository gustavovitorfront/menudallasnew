import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { isLogged, userDataLogged } from '../../utils/auth';
import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { NavbarOrder } from '../../components/NavbarOrder';
import { Box, Button, Card, CardBody, Container, Flex, useToast } from '@chakra-ui/react';
import { FastField, Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField/FormField';
import * as Yup from 'yup';
import axios from 'axios';
import { connect } from 'react-redux';
import { userActions } from '../../store/actions';
import { isEmpty } from 'lodash';

const AddressSchema = Yup.object().shape({
    cep: Yup.string()
        .required('Campo de cep é obrigatório.'),
    numero: Yup.string()
        .required('Campo de número é obrigatório.'),
});

function Endereco({ user, view, update }) {
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        if (user?.loading == true) {
            setIsLoading(true);
        } else {
            setIsLoading(false)
        }

        if (user.item) {
            setInitialValues(user.item)
        }

        if (user?.saved && showMsg) {
            toast({
                title: 'Alerta',
                description: 'Dados atualizados com sucesso!',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'bottom-center'
            })

            setShowMsg(false)
        }
    }, [user]);
    
    useEffect(() => {
        if (!isLogged) {
            router.push('/perfil');
        } else {
            if (isEmpty(user?.item)) {
                view(userDataLogged?.id);
            }
        }
    }, [isLogged]);

    async function buscarCEP(cep, setFieldValue) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const dadosCEP = response.data;

            setFieldValue('endereco', dadosCEP.logradouro);
            setFieldValue('complemento', dadosCEP.complemento);
            setFieldValue('bairro', dadosCEP.bairro);
            setFieldValue('cidade', dadosCEP.localidade);
            setFieldValue('estado', dadosCEP.uf);

            return dadosCEP;
        } catch (error) {
            return error;
        }
    }

    const handleCEPChange = (event, setFieldValue) => {
        const cep = event.target.value;
        if (cep.length === 9) {
            buscarCEP(cep, setFieldValue);
        }
    };

    const handleSubmitSave = (values) => {
        update(values);
        setShowMsg(true)
    }

    return (
        <>
            <Head>
                <title>Endereço</title>
            </Head>

            <Layout isOnlySubdomain>
                {({ subdomain, data }) => (
                    <>
                        <Head>
                            <link rel="shortcut icon" href={data?.logo_home} />
                        </Head>

                        <NavbarOrder text='Endereço' data={data} linkBack='/perfil' />

                        <Container maxW='100%' centerContent mt={['105px', '100px']} mb='30px'>
                            <Card w='100%'>
                                <CardBody>
                                    <Formik
                                        enableReinitialize
                                        initialErrors={{}}
                                        initialValues={initialValues}
                                        onSubmit={(values) => handleSubmitSave(values)}
                                        validationSchema={AddressSchema}
                                    >
                                        {({ errors, setFieldValue }) => (
                                            <Form>
                                                <FastField
                                                    id='cep'
                                                    name='cep'
                                                    placeholder='CEP'
                                                    component={FormField.InputMask}
                                                    mask='99999-999'
                                                    onChange={(event) =>
                                                        handleCEPChange(event, setFieldValue)
                                                    }
                                                    required
                                                />

                                                <Field
                                                    id='endereco'
                                                    name='endereco'
                                                    placeholder='Endereço'
                                                    component={FormField}
                                                    required
                                                />

                                                <Flex gap={2} mt={2}>
                                                    <Box w='40%'>
                                                        <Field
                                                            id='numero'
                                                            name='numero'
                                                            type='number'
                                                            placeholder='Número'
                                                            component={FormField}
                                                            required
                                                        />
                                                    </Box>

                                                    <Field
                                                        id='complemento'
                                                        name='complemento'
                                                        placeholder='Complemento'
                                                        component={FormField}
                                                    />
                                                </Flex>

                                                <Field
                                                    id='bairro'
                                                    name='bairro'
                                                    placeholder='Bairro'
                                                    component={FormField}
                                                    required
                                                />

                                                <Flex gap={2} mt={2}>
                                                    <Field
                                                        id='cidade'
                                                        name='cidade'
                                                        placeholder='Cidade'
                                                        component={FormField}
                                                        required
                                                    />

                                                    <Box w='58%'>
                                                        <FastField
                                                            id='estado'
                                                            name='estado'
                                                            placeholder='Estado'
                                                            component={FormField.Select}
                                                            required
                                                        >
                                                            <option value='AC'>AC</option>
                                                            <option value='AL'>AL</option>
                                                            <option value='AM'>AM</option>
                                                            <option value='AP'>AP</option>
                                                            <option value='BA'>BA</option>
                                                            <option value='CE'>CE</option>
                                                            <option value='DF'>DF</option>
                                                            <option value='GO'>GO</option>
                                                            <option value='ES'>ES</option>
                                                            <option value='MA'>MA</option>
                                                            <option value='MG'>MG</option>
                                                            <option value='MS'>MS</option>
                                                            <option value='MT'>MT</option>
                                                            <option value='PA'>PA</option>
                                                            <option value='PB'>PB</option>
                                                            <option value='PE'>PE</option>
                                                            <option value='PI'>PI</option>
                                                            <option value='PR'>PR</option>
                                                            <option value='RJ'>RJ</option>
                                                            <option value='RN'>RN</option>
                                                            <option value='RO'>RO</option>
                                                            <option value='RR'>RR</option>
                                                            <option value='RS'>RS</option>
                                                            <option value='SC'>SC</option>
                                                            <option value='SE'>SE</option>
                                                            <option value='SP'>SP</option>
                                                            <option value='TO'>TO</option>
                                                        </FastField>
                                                    </Box>
                                                </Flex>

                                                <Button
                                                    w='100%'
                                                    color='white'
                                                    variant='btnDallas'
                                                    type='submit'
                                                    isDisabled={Object.keys(errors).length > 0}
                                                    isLoading={isLoading}
                                                >
                                                    Salvar
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </CardBody>
                            </Card>
                        </Container>
                    </>)}
            </Layout >
        </>
    )
}

function mapState(state) {
    const { user } = state;
    return { user };
}

const actionCreators = {
    view: userActions.view,
    update: userActions.update
};

export default connect(mapState, actionCreators)(Endereco);