import { Alert, AlertIcon, Box, Button, Container, Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, Icon, Input, InputGroup, InputLeftElement, InputRightElement, ListItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Radio, RadioGroup, Select, Stack, Text, Textarea, UnorderedList, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsCreditCard2Back, BsPlusLg } from 'react-icons/bs'
import { FaWalking } from 'react-icons/fa'
import { GrSubtract } from 'react-icons/gr'
import { MdOutlineAttachMoney, MdOutlineCardGiftcard } from 'react-icons/md'
import { NavbarOrder } from '../NavbarOrder'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import InputMask from 'react-input-mask';
import axios from 'axios'
import { isLogged, userDataLogged } from '../../utils/auth'
import { connect } from 'react-redux'
import { bairrosActions, pedidoActions, pedidoUserActions } from '../../store/actions'
import { isEmpty } from 'lodash'
import DrawerFormaPg from './DrawerFormaPg'
import { moneyFormat } from '../../utils/moneyFormat'
import { Loading } from '../Loading'
import { v4 } from "uuid";

function OrderContext({ data, subdomain, bairros, getAllBairros, createPedido, createPedidoUser }) {
    const [total, setTotal] = useState(0)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [note, setNote] = useState("")
    const [delivery, setDelivery] = useState('1')
    const [loadingOrder, setLoadingOrder] = useState(0)
    const [openTipoEntrega, setOpenTipoEntrega] = useState(false);
    const [bag, setBag] = useState([]);
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [bairrosArray, setBairrosArray] = useState([]);
    const [msgErrorEndereco, setMsgErrorEndereco] = useState('');
    const [openFormaPg, setOpenFormaPg] = useState(false);
    const [order, setOrder] = useState({});

    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        const b = localStorage.getItem("@menu-digital:" + subdomain + ":bag");

        if (b !== null) {
            setBag(JSON.parse(b))

            if (JSON.parse(b).length > 0) {
                let cont = 0
                JSON.parse(b).forEach(element => {
                    cont = cont + (element.valor_total * element.quantidade)
                });
                setTotal(cont)
            }
        } else {
            router.push('/lista');
        }

        getAllBairros(subdomain);
    }, [subdomain]);

    useEffect(() => {
        if (bairros?.items && bairros?.items.length > 0) {
            setBairrosArray(bairros?.items)
        }
    }, [bairros]);

    useEffect(() => {
        if (isLogged) {
            setCep(userDataLogged?.cep);
            setLogradouro(userDataLogged?.endereco);
            setNumero(userDataLogged?.numero);
            setComplemento(userDataLogged?.complemento);
            setBairro(userDataLogged?.bairro);
            setEstado(userDataLogged?.estado);
            setCidade(userDataLogged?.cidade);
            setName(userDataLogged?.nome)
            setPhone(userDataLogged?.celular)
        }
    }, [isLogged]);

    useEffect(() => {
        if (bairro == '') {
            return setMsgErrorEndereco('');
        }
        if (bairrosArray.filter((entry) => entry.bairro.toLowerCase() == bairro.toLowerCase()).length == 0) {
            return setMsgErrorEndereco('Não atendemos o bairro (' + bairro + ') digitado!');
        } else if (data?.cidade !== cidade) {
            return setMsgErrorEndereco('Não atendemos na cidade (' + cidade + ') digitada!');
        } else if (data?.estado !== estado) {
            return setMsgErrorEndereco('Não atendemos no estado (' + estado + ') digitado!');
        } else {
            let bairroSelected = bairrosArray.find((entry) => entry.bairro.toLowerCase() == bairro.toLowerCase());
            setOrder({
                ...order,
                valor_taxa: bairroSelected?.valor
            })

            setMsgErrorEndereco('');
        }
    }, [bairro, cidade, estado, bairrosArray]);

    const handleOrder = () => {
        if (bag.length === 0) {
            toast({
                title: 'Alerta',
                description: `Não é possível finalizar o pedido sem itens no carrinho`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-center'
            });
            return router.push('/lista');
        }

        if (
            bag.length > 0 &&
            delivery !== undefined &&
            (delivery == 1 ? msgErrorEndereco === '' : true) &&
            name.length > 0 &&
            phone.length > 0 &&
            order.id_forma !== undefined
        ) {
            var answer = window.confirm("Deseja finalizar o pedido?");
            if (answer) {
                handleOrderFinally()
            }
        } else {
            toast({
                title: 'Alerta',
                description: `Preencha todos os campos obrigatórios`,
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position: 'top-center'
            });
        }
    }

    const handleOrderFinally = async () => {
        setLoadingOrder(1);

        try {
            let dataOrder = {
                nome: name,
                celular: phone,
                observacao: note
            }

            if (delivery == 1) {
                dataOrder.operacao = "ENTREGA"
            }
            if (delivery == 2) {
                dataOrder.operacao = "RETIRAR"
            }

            var bagNew = bag;

            for (let i = 0; i < bagNew.length; i++) {
                const item = bag[i];

                if (item.tipo === 'P' || item.tipo == 'O') {
                    item.descricao = item.descricao.replaceAll(item.quantidade + '/' + item.sabores.length, '').trim();
                    item.descricao = (item.quantidade + '/' + item.sabores.length) + ' ' + item.descricao;
                    item.valor = data?.regra_valor_montagem == 'MEDIA' ? (item.total / item.sabores.length) : (Math.max.apply(Math, item.sabores?.map(function (o) { return o.valor; })))

                    for (let x = 0; x < item.sabores.length; x++) {
                        const sabor = item.sabores[x];

                        sabor.descricao = sabor.descricao.replaceAll(item.quantidade + '/' + item.sabores.length, '').trim();
                        sabor.descricao = (item.quantidade + '/' + item.sabores.length) + ' ' + sabor.descricao;
                    }
                }
            }

            let dt = {
                ...order,
                ...dataOrder,
                user_id: data.user_id,
                total_produtos: total,
                logradouro: logradouro,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                uf: estado,
                complemento: complemento,
                itens: bagNew,
                empresa: subdomain,
                id_user: userDataLogged?.id
            }

            delete dt.id

            dt.valor_total = total + parseFloat(dt.valor_taxa ? dt.valor_taxa : 0);

            var celularWhats = data.numero_whats.replaceAll(' ', '')
            celularWhats = celularWhats.replaceAll('(', '')
            celularWhats = celularWhats.replaceAll(')', '')
            celularWhats = celularWhats.replaceAll('-', '')

            var textoWhats = '🔔 *Novo pedido via https://' + subdomain + '.menudallas.com.br' + '*\n\n'

            textoWhats += '*Cliente:* ' + dt.nome.toUpperCase() + ' ' + dt.celular + '\n\n'

            var enderecoMsg = `${dt.logradouro}, ${dt.numero} - ${dt.bairro} ${dt.complemento != '' ? ' - Complemento: ' + dt.complemento : ''} - (${dt.cidade}/${dt.uf})`

            if (dt.operacao.toUpperCase() != 'RETIRAR') {
                textoWhats += '*Endereço:* ' + enderecoMsg + '\n\n'
            }

            textoWhats += '*Itens:*'

            var vlAdicionais = 0;
            var vlTotal = 0;

            for (let i = 0; i < dt.itens.length; i++) {
                const item = dt.itens[i];

                var descProduto = item.tipo == 'P' ? item.tag + ' - ' + item.tamanho.tag : item.descricao
                textoWhats += '\n' + item.quantidade + ' x ' + descProduto.toUpperCase() + '\n'

                if (item.tipo == 'P') {
                    vlTotal += (data?.regra_valor_montagem == 'MEDIA' ? (item.total / item.sabores.length) : (Math.max.apply(Math, item.sabores?.map(function (o) { return o.valor; })))) * item.quantidade
                } else {
                    vlTotal += (item.valor * item.quantidade);
                }

                if (item.sabores) {
                    for (let x = 0; x < item.sabores.length; x++) {
                        const element = item.sabores[x];

                        textoWhats += '  1/' + item.sabores.length + ' ' + (element.descricao.replaceAll(item.quantidade + '/' + item.sabores.length + ' ', '')) + '\n'
                    }
                }

                if (item.adicional) {
                    for (let x = 0; x < item.adicional.length; x++) {
                        const element = item.adicional[x];

                        if (item.adicional.length == (x + 1)) {
                            textoWhats += '  ADIC. ' + element.descricao + '\n'
                        } else {
                            textoWhats += '  ADIC. ' + element.descricao + '\n'
                        }

                        vlAdicionais += (element.valor * element.quantidade);
                        vlTotal += vlAdicionais
                    }
                }
            }

            textoWhats += '\n*Valor dos itens:* ' + moneyFormat.format(dt.total_produtos) + '\n'

            if (dt.operacao.toUpperCase() != 'RETIRAR') {
                textoWhats += '*Valor da entrega:* ' + moneyFormat.format(dt.valor_taxa) + '\n'
            }

            vlTotal = vlTotal + parseFloat(dt.valor_taxa);

            textoWhats += '*Valor dos adicionais:*  ' + moneyFormat.format(vlAdicionais) + '\n'
            textoWhats += '*Valor total:* ' + moneyFormat.format(vlTotal) + '\n\n'

            textoWhats += '*Tipo de pagamento:* ' + dt.operacao + '\n'
            textoWhats += '*Forma de Pagamento:* ' + dt.forma + '\n'
            textoWhats += '*Troco:* ' + moneyFormat.format(dt.valor_para_troco ? dt.valor_para_troco : 0) + '\n'

            createPedidoUser(dt);
            createPedido(dt, celularWhats, textoWhats);
            toast({
                title: 'Alerta',
                description: `Pedido realizado com sucesso`,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'bottom-center'
            });
            setLoadingOrder(0);
            localStorage.removeItem("@menu-digital:" + subdomain + ":bag")
            router.push('/lista')
        } catch (error) {
            toast({
                title: 'Alerta',
                description: `Ocorreu um erro interno`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-center'
            });
            setLoadingOrder(0);
            router.push('/lista')
        }
    }

    function updateToCard(key, qtd) {
        let newBag = [];
        if (qtd === 0) {
            if (window.confirm("Deseja remover item do pedido?")) {
                newBag = bag.filter((_, index) => index !== key);
            }else{
                return false;
            }
        } else {
            newBag = bag.map((entry, index) => {
                if (index == key) {
                    return { ...entry, quantidade: qtd };
                }
                return entry;
            });
        }

        setBag(newBag);
        if (isEmpty(newBag)) {
            localStorage.removeItem('@menu-digital:' + subdomain + ':bag');
            return router.push('/lista');
        }
        localStorage.setItem('@menu-digital:' + subdomain + ':bag', JSON.stringify(newBag));
    }

    async function buscarCEP(cep) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const dadosCEP = response.data;
            setLogradouro(dadosCEP.logradouro);
            setComplemento(dadosCEP.complemento);
            setBairro(dadosCEP.bairro);
            setCidade(dadosCEP.localidade);
            setEstado(dadosCEP.uf);

            return dadosCEP;
        } catch (error) {
            return error;
        }
    }

    if (loadingOrder) {
        return (
            <Loading dtcolor={data?.primary_color} />
        )
    }

    return (
        <>
            <NavbarOrder data={data} handleOrder={handleOrder} />
            <Container maxW='100%' centerContent mt={['105px', '100px']} mb='30px'>
                <Box w='100%'>
                    <Text color={data?.primary_color} fontSize='20px' fontWeight={600}>Carrinho</Text>

                    <Box mt='18px' border='1px solid #CECECE' borderRadius='20px' bg='white' p={['15px', '23px']} position='relative' pb={['45px', '30px']} mb={['60px', '40px']}>

                        {bag.map((item, key) => (
                            <Box key={key} w='100%'>
                                <Flex alignItems='center' justifyContent='space-between' position='relative' zIndex={4}>
                                    <Flex>
                                        <Image
                                            onClick={() => router.push(`/produto/${slugify(item.descricao, { lower: true })}?g=${item.id_grupo}&p=${item.id}`)}
                                            src={item.foto_destaque}
                                            width={60}
                                            height={60}
                                            style={{
                                                borderRadius: '100%',
                                                maxHeight: 60,
                                                cursor: 'pointer',
                                                objectFit: 'cover'
                                            }}
                                            objectFit='cover'
                                            objectPosition='center'
                                            alt={item?.descricao}
                                            loader={({ src }) => {
                                                return src;
                                            }}
                                        />

                                        <Box ml='20px'>
                                            <Text fontSize={['14px', '16px']} fontWeight={600} color='#000'>{item?.quantidade}x {item?.descricao}</Text>

                                            <Text className="column" fontSize={['12px', '14px']} fontWeight={600} color={data?.primary_color}>
                                                {item.tipo == 'P' || item.tipo == 'O' ? (
                                                    <strong>{data?.regra_valor_montagem == 'MEDIA' ? moneyFormat.format(item.total / item.sabores.length) : moneyFormat.format(Math.max.apply(Math, item.sabores?.map(function (o) { return o.valor; })))}</strong>
                                                ) : (
                                                    <strong>{moneyFormat.format(item.valor * item.quantidade)}</strong>
                                                )}
                                            </Text>

                                            <Popover placement='auto'>
                                                <PopoverTrigger>
                                                    <Button mt='7px' fontSize='10px' cursor='pointer' fontWeight={400} color={data?.primary_color} size='xs'>Ver detalhes</Button>
                                                </PopoverTrigger>
                                                <Portal>
                                                    <PopoverContent bg='white' ml={['20px', 'auto']}>
                                                        <PopoverArrow />
                                                        <PopoverCloseButton mt='5px' />
                                                        <PopoverHeader fontSize='16px' fontWeight={600}>Detalhes</PopoverHeader>
                                                        <PopoverBody>
                                                            <Flex justifyContent='space-between' p='0px 10px'>
                                                                <Text fontSize='14px' fontWeight={600}>Itens</Text>
                                                                <Text fontSize='14px' fontWeight={600}>Preço</Text>
                                                            </Flex>

                                                            <Box className="detail" w='100%' padding='10px' pt={0}>
                                                                <UnorderedList key={v4()} ml='16px'>
                                                                    {item.adicional && item.sabores && item.sabores.length > 0 &&
                                                                        <>
                                                                            {item.sabores.map((element, index) => (
                                                                                <ListItem color='rgb(137, 140, 146)' fontSize='xs' key={index}>
                                                                                    <Box className='item' display='flex' alignItems='center' justifyContent='space-between' style={{ paddingTop: 3 }}>
                                                                                        <Text key={index} >1/{item.sabores.length} {element.descricao}</Text>
                                                                                        <Box className='column'>
                                                                                            <strong>***</strong>
                                                                                        </Box>
                                                                                    </Box>
                                                                                </ListItem>
                                                                            ))}
                                                                        </>
                                                                    }
                                                                </UnorderedList>

                                                                <UnorderedList key={v4()} ml='16px'>
                                                                    {item.adicional && item.sabores && item.sabores.length > 0 &&
                                                                        <>
                                                                            {item.sabores.map((element, index) => (
                                                                                <ListItem color='rgb(137, 140, 146)' fontSize='xs' key={index}>
                                                                                    <Box className='item' display='flex' alignItems='center' justifyContent='space-between' style={{ paddingTop: 3 }}>
                                                                                        <Text key={index} >1/{item.sabores.length} {element.descricao}</Text>
                                                                                        <Box className='column'>
                                                                                            <strong>***</strong>
                                                                                        </Box>
                                                                                    </Box>
                                                                                </ListItem>
                                                                            ))}
                                                                        </>
                                                                    }
                                                                </UnorderedList>

                                                                <UnorderedList key={v4()} ml='16px'>
                                                                    {item.adicional &&
                                                                        item.adicional.map((element, index) => (
                                                                            <ListItem color='rgb(137, 140, 146)' fontSize='xs' key={index} style={element.id && !element.id_sabor ? {} : { display: 'none' }}>
                                                                                <Box className='item' display='flex' alignItems='center' justifyContent='space-between'>
                                                                                    {element.id && !element.id_sabor && <Text>{element.quantidade}<span className='x'>x</span> {element.descricao}</Text>}
                                                                                    {element.id && !element.id_sabor && <Box className='column'>
                                                                                        <strong>+ {moneyFormat.format(element.valor)}</strong>
                                                                                    </Box>}
                                                                                </Box>
                                                                            </ListItem>
                                                                        ))
                                                                    }
                                                                </UnorderedList>

                                                                {item.observacao_item && (
                                                                    <Text fontSize='xs' className='obsText' style={{
                                                                        marginTop: 5,
                                                                        fontStyle: 'italic',
                                                                        color: '#898c92'
                                                                    }}><b>Observações:</b> {item.observacao_item}</Text>
                                                                )}

                                                                <Flex mt='5px' className="detalhesRodape" w='100%' justifyContent='space-between' fontSize='sm' fontWeight={500}>
                                                                    <Text>{item.quantidade} X
                                                                        {item.tipo == 'P' || item.tipo == 'O' ? (
                                                                            <span> {data?.regra_valor_montagem == 'MEDIA' ? moneyFormat.format(item.total / item.sabores.length) : moneyFormat.format(Math.max.apply(Math, item.sabores?.map(function (o) { return o.valor; })))}</span>
                                                                        ) : (
                                                                            <span> {moneyFormat.format(item.valor)}</span>
                                                                        )}

                                                                    </Text>
                                                                    <Text>Adic. {item.total_adicional ? moneyFormat.format(item.total_adicional) : moneyFormat.format(0)}</Text>
                                                                    <Text>{moneyFormat.format((item.valor_total * item.quantidade))}</Text>
                                                                </Flex>

                                                            </Box>
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Portal>
                                            </Popover>
                                        </Box>
                                    </Flex>

                                    <Flex alignItems='center' w={['80px', '120px']} justifyContent='space-between' borderRadius='30.5px' border='1px solid #CECECE' p={['4px', '9px']}>
                                        <Button variant='transparent' w={['14px', '16px']} h={['13px', '15px']} p={['0px', '']} ml={['-5px', '']} onClick={() => updateToCard(key, item.quantidade - 1)}>
                                            <Icon as={GrSubtract} fontSize={['12px', '14px']} />
                                        </Button>

                                        <Text fontSize={['12px', '14px']} fontWeight={400} color='#000' ml={['-2px', '']}>{item.quantidade}</Text>

                                        <Button variant='transparent' w={['14px', '16px']} h={['13px', '15px']} p={['0px', '']} ml={['-2px', '']} onClick={() => updateToCard(key, item.quantidade + 1)}>
                                            <Icon as={BsPlusLg} />
                                        </Button>
                                    </Flex>
                                </Flex>

                                {bag.length > key + 1 ? (
                                    <Divider border='1px solid' borderColor='#CECECE' mt='16px' mb='16px' />
                                ) : null}
                            </Box>
                        ))}

                        <Button position='absolute' onClick={() => router.push(`/lista`)} zIndex={1} variant='transparent' fontWeight='600' transform='translate(-50%,-50%)' bg={data?.primary_color} color='white' fontSize='14px' p='19px 34px' left='50%' bottom={['-50px', '-40px']} transition='0.3s' _hover={{
                            opacity: 0.8
                        }}>Adicionar mais itens</Button>
                    </Box>

                    <Text color={data?.primary_color} fontSize='20px' fontWeight={600} mb='24px'>Tipo de entrega</Text>

                    <Flex mb='40px' alignItems='center' justifyContent='space-between' bg='#FFECD1' borderRadius='7px' cursor='pointer' h='60px' p='0px 14px' transition='0.3s' _hover={{
                        opacity: 0.8
                    }}
                        onClick={() => setOpenTipoEntrega(true)}
                    >
                        <Flex alignItems='center'>
                            {delivery == 1 ? (
                                <Image
                                    src="/img/motoIcon.png"
                                    width={17}
                                    height={12}
                                    objectFit='cover'
                                    alt="Menu Dallas Dinheiro"
                                    style={{
                                        minHeight: 12
                                    }}
                                />
                            ) : (
                                <Icon fontSize='21px' as={FaWalking} />
                            )}
                            {delivery == 1 ? (
                                <Text ml='15px' mt='2px' fontSize='16px' color='#4D4D4D' fontWeight={600}>Entrega</Text>
                            ) : (
                                <Text ml='15px' mt='2px' fontSize='16px' color='#4D4D4D' fontWeight={600}>Retirar do local</Text>
                            )}

                        </Flex>

                        <Text cursor='pointer' fontSize='16px' color={data?.primary_color} fontWeight={600}>
                            Alterar
                        </Text>
                    </Flex>

                    {delivery == 2 ? (
                        <>
                            <Text color={data?.primary_color} fontSize='20px' fontWeight={600} mb='24px'>
                                Retire seu pedido aqui
                            </Text>
                            <Box borderRadius='20px' bg='white' border='1px solid #CECECE' p='26px 24px' mb='40px'>
                                <Text color='#000' fontSize='16px' fontWeight={600}>{data?.endereco}, {data?.numero} - {data?.bairro}, {data?.cidade}/{data?.estado}</Text>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Text color={data?.primary_color} fontSize='20px' fontWeight={600} mb='24px'>
                                Endereço
                            </Text>

                            <FormControl mb='20px'>
                                <FormLabel>CEP <Text as='span' color='red'>*</Text></FormLabel>

                                <InputMask
                                    alwaysShowMask={false}
                                    mask='99999-999'
                                    dir='ltl'
                                    value={cep}
                                    onChange={(e) => {
                                        e.target.dir = 'ltr';

                                        setCep(e.target.value);

                                        if (e.target.value.length == 9) {
                                            buscarCEP(e.target.value)
                                        }
                                    }}
                                >
                                    {() => (
                                        <Input placeholder='Digite seu CEP'
                                            bg='white'
                                            color='#4D4D4D'
                                            fontSize='16px'
                                            fontWeight={600}
                                            _focusVisible={{
                                                borderColor: `${data?.primary_color} !important`,
                                                boxShadow: '0px'
                                            }} type='text' />
                                    )}
                                </InputMask>
                            </FormControl>

                            <Flex gap='20px'>
                                <FormControl mb='20px'>
                                    <FormLabel>Endereço <Text as='span' color='red'>*</Text></FormLabel>

                                    <Input placeholder='Digite seu endereço'
                                        bg='white'
                                        color='#4D4D4D'
                                        fontSize='16px'
                                        fontWeight={600}
                                        _focusVisible={{
                                            borderColor: `${data?.primary_color} !important`,
                                            boxShadow: '0px'
                                        }}
                                        type='text'
                                        value={logradouro}
                                        onChange={(e) => setLogradouro(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl w='40%' mb='20px'>
                                    <FormLabel>Número <Text as='span' color='red'>*</Text></FormLabel>

                                    <Input
                                        bg='white'
                                        color='#4D4D4D'
                                        fontSize='16px'
                                        fontWeight={600}
                                        _focusVisible={{
                                            borderColor: `${data?.primary_color} !important`,
                                            boxShadow: '0px'
                                        }}
                                        type='number'
                                        value={numero}
                                        onChange={(e) => setNumero(e.target.value)}
                                    />
                                </FormControl>
                            </Flex>

                            <FormControl mb='20px'>
                                <FormLabel>Complemento</FormLabel>

                                <Input placeholder='Digite seu complemnto'
                                    bg='white'
                                    color='#4D4D4D'
                                    fontSize='16px'
                                    fontWeight={600}
                                    _focusVisible={{
                                        borderColor: `${data?.primary_color} !important`,
                                        boxShadow: '0px'
                                    }}
                                    type='text'
                                    value={complemento}
                                    onChange={(e) => setComplemento(e.target.value)}
                                />
                            </FormControl>

                            <FormControl mb='20px'>
                                <FormLabel>Bairro <Text as='span' color='red'>*</Text></FormLabel>

                                <Input placeholder='Digite seu bairro'
                                    bg='white'
                                    color='#4D4D4D'
                                    fontSize='16px'
                                    fontWeight={600}
                                    _focusVisible={{
                                        borderColor: `${data?.primary_color} !important`,
                                        boxShadow: '0px'
                                    }}
                                    type='text'
                                    value={bairro}
                                    onChange={(e) => setBairro(e.target.value)}
                                />
                            </FormControl>

                            <Flex gap='20px'>
                                <FormControl mb='20px'>
                                    <FormLabel>Cidade <Text as='span' color='red'>*</Text></FormLabel>

                                    <Input placeholder='Digite sua cidade'
                                        bg='white'
                                        color='#4D4D4D'
                                        fontSize='16px'
                                        fontWeight={600}
                                        _focusVisible={{
                                            borderColor: `${data?.primary_color} !important`,
                                            boxShadow: '0px'
                                        }}
                                        type='text'
                                        value={cidade}
                                        onChange={(e) => setCidade(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl w='40%' mb='20px'>
                                    <FormLabel>Estado <Text as='span' color='red'>*</Text></FormLabel>

                                    <Select
                                        id='estado'
                                        name='estado'
                                        bg='white'
                                        color='#4D4D4D'
                                        fontSize='16px'
                                        fontWeight={600}
                                        _focusVisible={{
                                            borderColor: `${data?.primary_color} !important`,
                                            boxShadow: '0px'
                                        }}
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
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
                                    </Select>
                                </FormControl>
                            </Flex>

                            {msgErrorEndereco != '' && (
                                <Alert status='warning' mb='20px' mt='10px'>
                                    <AlertIcon />
                                    {msgErrorEndereco}
                                </Alert>
                            )}

                        </>
                    )}

                    <Text color={data?.primary_color} fontSize='20px' fontWeight={600} mb='24px'>Meus dados</Text>

                    <FormControl mb='30px'>
                        <FormLabel color='#000' fontSize='16px' fontWeight={600}>Qual o seu nome? <Text as='span' color='#FF0F0F'>*</Text></FormLabel>
                        <Input color='#000'
                            fontSize='14px'
                            fontWeight='normal' size='lg' borderColor='#E4E4E4' borderRadius='7px' bg='white' type='text' placeholder='Escreva o seu nome aqui...' _focusVisible={{
                                borderColor: `${data?.primary_color} !important`,
                                boxShadow: '0px'
                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mb='30px'>
                        <FormLabel color='#000' fontSize='16px' fontWeight={600}>Seu telefone <Text as='span' color='#FF0F0F'>*</Text></FormLabel>

                        <InputMask
                            alwaysShowMask={false}
                            mask='(99) 99999-9999'
                            dir='ltl'
                            value={phone}
                            onChange={(e) => {
                                e.target.dir = 'ltr';

                                setPhone(e.target.value);
                            }}
                        >
                            {() => (
                                <Input color='#000'
                                    fontSize='14px'
                                    fontWeight='normal' size='lg' borderColor='#E4E4E4' borderRadius='7px' bg='white' type='text' placeholder='Escreva o seu telefone aqui...' _focusVisible={{
                                        borderColor: `${data?.primary_color} !important`,
                                        boxShadow: '0px'
                                    }} />
                            )}
                        </InputMask>
                    </FormControl>

                    <Text mb='10px' color='#000' fontSize='16px' fontWeight={600}>Como você irá pagar? <Text as='span' color='#FF0F0F'>*</Text></Text>

                    <Flex mb='30px' alignItems='center' justifyContent='space-between' bg='#D7FFD1' borderRadius='7px' cursor='pointer' h='60px' p='0px 14px' transition='0.3s' _hover={{
                        opacity: 0.8
                    }}
                        onClick={() => setOpenFormaPg(true)}>
                        <Flex alignItems='center'>
                            {order?.forma == 'CARTÃO DE CREDITO' || order?.forma == 'CARTÃO DE DEBITO' || !order?.forma ? (
                                <Icon fontSize='21px' as={BsCreditCard2Back} />
                            ) : (
                                <Icon as={MdOutlineAttachMoney} fontSize='21px' />
                            )}

                            <Text ml='15px' mt='2px' fontSize='16px' color='#4D4D4D' fontWeight={600}>{!order?.forma ? 'Forma de pagamento' : order?.forma}</Text>
                        </Flex>

                        <Text cursor='pointer' fontSize='16px' color='#000' opacity='0.7' fontWeight={600}>
                            Alterar
                        </Text>
                    </Flex>

                    <FormControl mb='20px'>
                        <FormLabel color='#000' fontSize='16px' fontWeight={600}>Observações</FormLabel>
                        <Textarea color='#000' rows={4} fontSize='14px'
                            fontWeight='normal' size='lg' borderColor='#E4E4E4' borderRadius='7px' bg='white' type='text' _focusVisible={{
                                borderColor: `${data?.primary_color} !important`,
                                boxShadow: '0px'
                            }} onChange={(e) => setNote(e.target.value)} value={note} />
                    </FormControl>

                    <Text color={data?.primary_color} fontSize='20px' fontWeight={600} textAlign='center' mb='24px'>Totais</Text>
                    <Flex alignItems='center' justifyContent='space-between' mb='4px' borderBottom='1px solid rgb(232, 234, 237)' p='0.5rem'>
                        <Text fontSize='16px' color='#000'>Produtos</Text>
                        <Text fontSize='16px' color='#000'>{bag.length > 0 && moneyFormat.format(total)}</Text>
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between' mb='4px' borderBottom='1px solid rgb(232, 234, 237)' p='0.5rem'>
                        <Text fontSize='16px' color='#000'>Taxa de entrega</Text>
                        <Text fontSize='16px' color='#000'>{order.valor_taxa !== undefined ? moneyFormat.format(order.valor_taxa) : moneyFormat.format(0)}</Text>
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between' mb='4px' borderBottom='1px solid rgb(232, 234, 237)' p='0.5rem'>
                        <Text fontSize='16px' fontWeight='600' color='#000'>Valor Total</Text>
                        <Text fontSize='16px' fontWeight='600' color='#000'>{moneyFormat.format(total + (order.valor_taxa !== undefined && delivery === 1 ? order.valor_taxa : 0))}</Text>
                    </Flex>
                    {order.valor_para_troco !== undefined &&
                        <Flex alignItems='center' justifyContent='space-between' mb='4px' borderBottom='1px solid rgb(232, 234, 237)' p='0.5rem'>
                            <Text fontSize='16px' fontWeight='600' color='#000'>Troco para</Text>
                            <Text fontSize='16px' fontWeight='600' color='#000'>{moneyFormat.format(order.valor_para_troco)}</Text>
                        </Flex>
                    }

                    <InputGroup size='lg' mt='20px'>
                        <InputLeftElement>
                            <Icon as={MdOutlineCardGiftcard} />
                        </InputLeftElement>
                        <Input placeholder='Digite um cupom'
                            bg='white'
                            color='#4D4D4D'
                            fontSize='16px'
                            fontWeight={600}
                            _focusVisible={{
                                borderColor: `${data?.primary_color} !important`,
                                boxShadow: '0px'
                            }}
                        />
                        <InputRightElement pr='40px'>
                            <Text color={data?.primary_color} fontSize='16px' fontWeight={600} cursor='pointer'>Aplicar</Text>
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </Container>

            <DrawerFormaPg setOpenFormaPg={setOpenFormaPg} openFormaPg={openFormaPg} subdomain={subdomain} setOrder={setOrder} order={order} total={total} />

            <Drawer placement='bottom' onClose={() => setOpenTipoEntrega(false)} isOpen={openTipoEntrega}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader position='relative' borderBottomWidth='1px' textAlign='center' display='flex' alignItems='center' justifyContent='space-between'>
                        Escolha o tipo de entrega
                    </DrawerHeader>
                    <DrawerBody minH='100px' bg='rgb(243, 245, 247)'>
                        <RadioGroup mt='12px' defaultValue={delivery} onChange={(e) => {
                            setDelivery(e);
                            setOpenTipoEntrega(false);
                        }}>
                            <Stack>
                                <Radio size='md' name='delivery' value='1' defaultChecked colorScheme='blue'>
                                    Entrega
                                </Radio>
                                <Radio size='md' name='delivery' value='2' colorScheme='blue'>
                                    Retirar do local
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

function mapState(state) {
    const { bairros } = state;
    return { bairros };
}

const actionCreators = {
    getAllBairros: bairrosActions.getAll,
    createPedido: pedidoActions.create,
    createPedidoUser: pedidoUserActions.create
};

export default connect(mapState, actionCreators)(OrderContext);