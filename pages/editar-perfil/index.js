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

const AccountSchema = Yup.object().shape({
    cep: Yup.string()
        .required('Campo de cep é obrigatório.'),
    numero: Yup.string()
        .required('Campo de número é obrigatório.'),
});

function EditarPerfil({ user, view, update }) {
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
            </Head>

            <Layout isOnlySubdomain>
                {({ subdomain, data }) => (
                    <>
                        <Head>
                            <link rel="shortcut icon" href={data?.logo_home} />
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

export default connect(mapState, actionCreators)(EditarPerfil);