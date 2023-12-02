import { Box, Stack, Card, CardBody, Badge, Text, Alert, AlertIcon, UnorderedList, ListItem, Flex, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { pedidoUserActions } from '../../store/actions';
import { Loading } from '../Loading';
import { moneyFormat } from "../../utils/moneyFormat";
import { dateFormatter } from "../../utils/dateFormatter";
import { isEmpty } from "lodash";
import { v4 } from "uuid";

function PedidoContext({ data, subdomain, getAll, pedidoUser }) {
    const [pedidosData, setPedidosData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPedidosData([]);
        setIsLoading(false)

        if (isEmpty(pedidoUser)) {
            getAll(subdomain);
        }
    }, []);

    useEffect(() => {
        if (pedidoUser.items) {
            setPedidosData(pedidoUser.items);
            setIsLoading(false)
        } else {
            setPedidosData([]);
        }

        if(pedidoUser.error == 'OK'){
            setPedidosData([]);
            setIsLoading(false);
        }

        if (pedidoUser.loading) {
            setIsLoading(pedidoUser.loading);
        }
    }, [pedidoUser]);

    if (isLoading) {
        return (
            <Loading dtcolor={data?.primary_color} />
        )
    }

    return (
        <Box w="100%">
            {pedidosData.length > 0 ? (
                <Stack w="100%" spacing={3}>
                    {pedidosData.map((item, index) => {
                        const itensPedido = JSON.parse(item.itens);

                        return (
                            <Card key={index} w="100%">
                                <CardBody>
                                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                                        Pedido #{item.id}
                                    </Text>
                                    <Stack spacing={2}>
                                        {itensPedido.map((produto, idx) => (
                                            <Box key={idx}>
                                                <Text fontSize='16px' fontWeight={500}>{produto.descricao} - Quantidade: {produto.quantidade}</Text>
                                                <Divider mt='10px' mb='10px' borderColor='rgb(232, 234, 237)' />

                                                <Box className="detail" w='100%' padding='10px' pt={0}>
                                                    <Flex justifyContent='space-between'>
                                                        <Text fontSize='14px' fontWeight={600}>Itens</Text>
                                                        <Text fontSize='14px' fontWeight={600}>Preço</Text>
                                                    </Flex>

                                                    <UnorderedList key={index} ml='16px'>
                                                        {produto.adicional && produto.sabores && produto.sabores.length > 0 &&
                                                            <>
                                                                {produto.sabores.map((element, index) => (
                                                                    <ListItem color='rgb(137, 140, 146)' fontSize='xs' key={index}>
                                                                        <Box className='item' display='flex' alignItems='center' justifyContent='space-between' style={{ paddingTop: 3 }}>
                                                                            <Text key={index} >1/{produto.sabores.length} {element.descricao}</Text>
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
                                                        {produto.adicional && produto.sabores && produto.sabores.length > 0 &&
                                                            <>
                                                                {produto.sabores.map((element, index) => (
                                                                    <ListItem color='rgb(137, 140, 146)' fontSize='xs' key={index}>
                                                                        <Box className='item' display='flex' alignItems='center' justifyContent='space-between' style={{ paddingTop: 3 }}>
                                                                            <Text key={index} >1/{produto.sabores.length} {element.descricao}</Text>
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
                                                        {produto.adicional &&
                                                            produto.adicional.map((element, index) => (
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

                                                    {produto.observacao_item && (
                                                        <Text fontSize='xs' className='obsText' style={{
                                                            marginTop: 5,
                                                            fontStyle: 'italic',
                                                            color: '#898c92'
                                                        }}><b>Observações:</b> {produto.observacao_item}</Text>
                                                    )}

                                                    <Flex mt='5px' className="detalhesRodape" w='100%' justifyContent='space-between' fontSize='sm' fontWeight={500}>
                                                        <Text>{produto.quantidade} X
                                                            {produto.tipo == 'P' || produto.tipo == 'O' ? (
                                                                <span> {data?.regra_valor_montagem == 'MEDIA' ? moneyFormat.format(produto.total / produto.sabores.length) : moneyFormat.format(Math.max.apply(Math, produto.sabores?.map(function (o) { return o.valor; })))}</span>
                                                            ) : (
                                                                <span> {moneyFormat.format(produto.valor)}</span>
                                                            )}

                                                        </Text>
                                                        <Text>Adic. {produto.total_adicional ? moneyFormat.format(produto.total_adicional) : moneyFormat.format(0)}</Text>
                                                        <Text>{moneyFormat.format((produto.valor_total * produto.quantidade))}</Text>
                                                    </Flex>

                                                </Box>
                                            </Box>
                                        ))}
                                    </Stack>

                                    <Divider mt='10px' mb='10px' borderColor='rgb(232, 234, 237)' />

                                    <Badge colorScheme="green" mt={3}>
                                        Total: {moneyFormat.format(item.valor_total)}
                                    </Badge>
                                    <Badge ml={2} colorScheme="blue" mt={3}>
                                        Data do pedido: {dateFormatter(item.data_pedido)}
                                    </Badge>
                                </CardBody>
                            </Card>
                        );
                    })}
                </Stack>
            ) : (
                <Alert status="info">
                    <AlertIcon />
                    Nenhum pedido foi feito até agora.
                </Alert>
            )}
        </Box>
    )
}

function mapState(state) {
    const { pedidoUser } = state;
    return { pedidoUser };
}

const actionCreators = {
    getAll: pedidoUserActions.getAll,
};

export default connect(mapState, actionCreators)(PedidoContext);