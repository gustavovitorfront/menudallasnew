import { Alert, AlertIcon, Box, Button, Card, CardBody, CardHeader, Divider, Stack, StackDivider, Text, useToast } from '@chakra-ui/react'
import { FastField, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import FormField from '../FormField/FormField';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { loginActions, registerActions } from '../../store/actions';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('Digite um email válido')
        .required('Campo de e-mail é obrigatório.'),
    nome: Yup.string().required('Campo nome é obrigatório.'),
    password: Yup.string()
        .required('Campo de senha é obrigatório.')
        .min(8, 'A senha deve conter pelo menos 8 caracteres.'),
    password_confirmation: Yup.string()
        .required('Campo de confirmação de senha é obrigatório.')
        .min(8, 'A confirmação de senha deve conter pelo menos 8 caracteres.')
        .test('passwords-match', 'As senhas não coincidem.', function (value) {
            return this.parent.password === value;
        })
});

function RegisterForm({ data, createLogin, createRegister, register, login, setIsLoggedState }) {
    const [viewPage, setViewPage] = useState('login');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const router = useRouter();

    const onSubmitLogin = (values) => {
        createLogin(values);
    }

    const onSubmitRegister = (values) => {
        createRegister(values);
    }

    useEffect(() => {
        if (login.error) {
            setErrorMsg(login.error);
        }

        if (login.loading) {
            setIsLoading(login.loading)
        } else {
            setIsLoading(false);
        }

        if (!isEmpty(login.items)) {
            setErrorMsg('');
            toast({
                title: 'Acesso realizado com sucesso!',
                description: `Seja bem vindo(a) ${login.items.nome}.`,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'bottom-center'
            });
            localStorage.setItem('@menu-digital:profile', JSON.stringify(login.items))
            router.reload();
        }
    }, [login]);

    useEffect(() => {
        if (register.error) {
            setErrorMsg(register.error);
        }

        if (register.loading) {
            setIsLoading(register.loading)
        } else {
            setIsLoading(false);
        }

        if (!isEmpty(register.items)) {
            setErrorMsg('');
            toast({
                title: 'Acesso realizado com sucesso!',
                description: `Seja bem vindo(a) ${register.items.nome}.`,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'bottom-center'
            });
            localStorage.setItem('@menu-digital:profile', JSON.stringify(register.items))
            router.reload();
        }
    }, [register]);

    return (
        <Box w='100%'>
            <Card mb='20px'>
                <CardHeader>
                    {viewPage == 'login' ? <Text textAlign='center' color={data?.primary_color} fontSize='20px' fontWeight={600}>Acessar sua conta</Text> : <Text textAlign='center' color={data?.primary_color} fontSize='20px' fontWeight={600}>Cadastrar-se</Text>}
                </CardHeader>
                <Divider borderColor='#ccc' />
                <CardBody>
                    {errorMsg &&
                        <Alert status='error' mb='20px'>
                            <AlertIcon />
                            {errorMsg}
                        </Alert>
                    }

                    {viewPage == 'login' ? (
                        <Formik
                            enableReinitialize
                            initialErrors={{}}
                            initialValues={{}}
                            onSubmit={(values) => {
                                onSubmitLogin(values);
                            }}
                        >
                            {({ errors }) => (
                                <Form>
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
                                        required
                                    />

                                    <Button
                                        w='100%'
                                        color='white'
                                        variant='btnDallas'
                                        type='submit'
                                        disabled={Object.keys(errors).length > 0}
                                        isLoading={isLoading}
                                    >
                                        Acessar
                                    </Button>

                                    <Button
                                        mt='10px'
                                        w='100%'
                                        colorScheme='green'
                                        onClick={() => setViewPage('register')}
                                    >
                                        Ou cadastre-se agora mesmo
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <Formik
                            enableReinitialize
                            initialErrors={{}}
                            initialValues={{}}
                            onSubmit={(values) => {
                                onSubmitRegister(values);
                            }}
                            validationSchema={RegisterSchema}
                        >
                            {({ errors }) => (
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
                                        required
                                    />

                                    <Field
                                        id='password_confirmation'
                                        name='password_confirmation'
                                        type='password'
                                        placeholder='Confirmar Senha'
                                        component={FormField}
                                        error={errors.email}
                                        required
                                    />

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

                                    <Button
                                        mt='10px'
                                        w='100%'
                                        colorScheme='green'
                                        onClick={() => setViewPage('login')}
                                    >
                                        Ou acessar sua conta agora mesmo
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    )}

                </CardBody>
            </Card>
        </Box>
    )
}

function mapState(state) {
    const { login, register } = state;
    return { login, register };
}

const actionCreators = {
    createLogin: loginActions.create,
    createRegister: registerActions.create,
};

export default connect(mapState, actionCreators)(RegisterForm);