import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { isLogged, userDataLogged } from '../../utils/auth';
import Head from 'next/head';
import { NavbarOrder } from '../../components/NavbarOrder';
import { Box, Button, Card, CardBody, Container, Flex, useToast } from '@chakra-ui/react';
import { FastField, Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField/FormField';
import * as Yup from 'yup';
import url from 'url';
import { connect } from 'react-redux';
import { userActions } from '../../store/actions';
import { isEmpty } from 'lodash';

const AccountSchema = Yup.object().shape({
    cep: Yup.string()
        .required('Campo de cep é obrigatório.'),
    numero: Yup.string()
        .required('Campo de número é obrigatório.'),
});

function EditarPerfil({ data, user, view, update }) {
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

    const handleSubmitSave = (values) => {
        update(values);
        setShowMsg(true)
    }

    return (
        <>
            <Head>
                <title>Editar perfil</title>
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

            <NavbarOrder text='Editar perfil' data={data} linkBack='/perfil' />

            <Container maxW='100%' centerContent mt={['105px', '100px']} mb='30px'>
                <Card w='100%'>
                    <CardBody>
                        <Formik
                            enableReinitialize
                            initialErrors={{}}
                            initialValues={initialValues}
                            onSubmit={(values) => handleSubmitSave(values)}
                            validationSchema={AccountSchema}
                        >
                            {({ errors, setFieldValue }) => (
                                <Form>
                                    <Field
                                        id='nome'
                                        name='nome'
                                        type='text'
                                        placeholder='Nome'
                                        component={FormField}
                                        error={errors.nome}
                                        required
                                    />

                                    <FastField
                                        id={'cpf'}
                                        name={'cpf'}
                                        placeholder={'CPF'}
                                        component={FormField.InputMask}
                                        mask={'999.999.999-99'}
                                    />

                                    <FastField
                                        id={'celular'}
                                        name={'celular'}
                                        placeholder={'Celular'}
                                        component={FormField.InputMask}
                                        mask={'(99) 99999-9999'}
                                        required
                                    />

                                    <Field
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='Email'
                                        component={FormField}
                                        error={errors.email}
                                        required
                                    />

                                    <Field
                                        id='password'
                                        name='password'
                                        type='password'
                                        placeholder='Senha'
                                        component={FormField}
                                        error={errors.email}
                                    />

                                    <Field
                                        id='password_confirmation'
                                        name='password_confirmation'
                                        type='password'
                                        placeholder='Confirmar Senha'
                                        component={FormField}
                                        error={errors.email}
                                    />

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
        </>
    )
}

export async function getServerSideProps(context) {
    const host = context.req.headers['x-forwarded-host'] || context.req.headers.host;
    const subdomain = url.parse(`https://${host}`).hostname.split('.')[0];

    if (subdomain != process.env.NEXT_PUBLIC_BASE_URL_DOMAIN) {
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
            redirect: {
                destination: process.env.NEXT_PUBLIC_BASE_URL,
                permanent: false,
            },
        };
    }
}

function mapState(state) {
    const { user } = state;
    return { user };
}

const actionCreators = {
    view: userActions.view,
    update: userActions.update
};

export default connect(mapState, actionCreators)(EditarPerfil);
