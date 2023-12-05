import { Box, Button, Checkbox, Container, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormHelperText, FormLabel, Icon, Input, Radio, Switch, Tag, Text, Textarea, useToast } from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { getOpened } from '../../utils/getOpened'
import { moneyFormat } from '../../utils/moneyFormat'
import { connect } from 'react-redux'
import { saboresActions } from '../../store/actions'
import { Loading } from '../Loading'
import { FiCheck, FiSearch } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { FooterProduct } from '../FooterProduct'
import { addCart } from '../../utils/addCart'
import { useRouter } from 'next/router'

function InfoProduct({ subdomain, data, productData, sabores, getAll }) {
    const toast = useToast();
    const [dt, setData] = useState({})
    const [productDetail, setProductDetail] = useState([])
    const [total, setTotal] = useState(0)
    const [totalUnity, setTotalUnity] = useState(0)
    const [count, setCount] = useState(1)
    const [disable, setDisable] = useState(true)
    const [opened, setOpened] = useState(false)
    const [length, setLength] = useState(undefined)
    const [lengthObject, setLengthObject] = useState({})
    const [flavors, setFlavors] = useState([])
    const [flavorsFilters, setFlavorsFilters] = useState([])
    const [flavorsSelected, setFlavorsSelected] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [gpAdicionais, setGpAdicionais] = useState([])
    const [gpTamanhos, setGpTamanhos] = useState([])
    const [observacaoItem, setObservacaoItem] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [searchFlavors, setSearchFlavors] = useState(false)
    const [searchTermFlavor, setSearchTermFlavor] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!isEmpty(productData)) {
            var dtFinal = [];

            setOpened(getOpened(data))
            setData(productData[0])

            for (let i = 0; i < productData.length; i++) {
                var itensDetalhe = productData[i];

                for (let x = 0; x < itensDetalhe[Object.keys(itensDetalhe)[0]].length; x++) {
                    var linha = itensDetalhe[Object.keys(itensDetalhe)[0]][x];

                    linha.selected_index = [];
                }

                dtFinal.push(itensDetalhe);
            }

            var gpArrayAdicionais = dtFinal.filter((entry) => {
                return entry.grupo_adicional
            });

            if (gpArrayAdicionais.length > 0) {
                setGpAdicionais(gpArrayAdicionais[0].grupo_adicional)
            }

            // if (dtFinal.length > 0) {
            //   setGpAdicionais(dtFinal)
            // }

            var gpArrayTamanhos = dtFinal.filter((entry) => {
                return entry.tamanhos
            });

            if (gpArrayTamanhos.length > 0) {
                setGpTamanhos(gpArrayTamanhos[0].tamanhos)
            }

            dtFinal = dtFinal.filter((entry) => entry.grupo_adicional || entry.tamanhos)
            setProductDetail(dtFinal);
            window.scrollTo(0, 0);
        }
    }, [productData]);

    const getTotal = useCallback(() => {
        let v = dt.em_promocao == true ? (dt.valor_promocao !== undefined ? dt.valor_promocao : 0) : (dt.valor !== undefined ? dt.valor : 0)
        let storage = data

        if (storage.regra_valor_montagem && storage.regra_valor_montagem === "MAIOR") {
            if (gpTamanhos !== undefined) {
                if (lengthObject.valor > v) {
                    v = lengthObject.valor
                }

                if (flavorsSelected.length > 0) {

                    if (flavorsSelected)

                        flavorsSelected.forEach((element) => {
                            if (element.valor > v) {
                                v = element.valor
                            }
                        })
                }
            }
        }

        if (storage.regra_valor_montagem && storage.regra_valor_montagem === "MEDIA") {
            if (gpTamanhos !== undefined) {

                let sum = lengthObject.valor

                if (flavorsSelected.length > 0) {
                    flavorsSelected.forEach((element) => {
                        sum = sum + element.valor
                    })
                }

                v = v + (sum / (flavorsSelected.length + 1))
            }
        }

        if (productDetail.length > 0) {
            productDetail.forEach((element) => {
                var elementTwo = element[Object.keys(element)[0]];

                elementTwo.forEach((item) => {
                    item.selected_index.forEach((row) => {
                        v = v + row.valor
                    })
                });
            })
        }
        setTotalUnity(v)
        setTotal(v * count)
    }, [productDetail, count, lengthObject, flavorsSelected])

    const handleLength = async (tam) => {
        setIsLoading(true);
        getAll(subdomain, tam, dt.id_grupo);
    }

    const getDisable = useCallback(() => {
        let cont = 0
        if (productDetail.length > 0) {

            if (gpAdicionais.length > 0) {
                gpAdicionais.forEach((element) => {
                    if (element.selected_index.length < element.Qtd_obg) {
                        cont = cont + 1
                    }
                })
            }
        }

        if (cont === 0) {
            if (gpTamanhos.length > 0 && length === undefined) {
                setDisable(true)
            } else {
                setDisable(false)
            }
        } else {
            setDisable(true)
        }
    }, [productDetail, dt, length])

    useEffect(() => {
        getTotal()
        getDisable()
    }, [getTotal, productDetail, getDisable]);

    useEffect(() => {
        if (sabores.items) {
            let find = sabores.items.filter((filter) => dt.descricao && dt.descricao.includes(filter.descricao))

            if (find.length > 0) {
                let flavs = find
                setFlavorsSelected(flavs)
            }

            setFlavors(sabores.items)
            setFlavorsFilters(sabores.items)

            setIsLoading(false)
        } else {
            setFlavors([]);
            setFlavorsFilters([]);
        }

        if (sabores.loading) {
            setIsLoading(sabores.loading);
        }
    }, [sabores]);

    const handleItemOrder = () => {
        if (window.confirm("Deseja realmente adicionar no carrinho?")) {

            let product = {
                id: dt.id_produto,
                descricao: dt.descricao,
                unidade: dt.unidade,
                tipo: dt.tipo,
                editado: dt.custom,
                quantidade: count,
                tag: dt.tag ? dt.tag : dt.tag,
                valor: dt.em_promocao == false || dt.em_promocao == undefined ? (dt.valor !== undefined ? dt.valor : 0) : (dt.valor_promocao !== undefined ? dt.valor_promocao : 0),
                valor_total: totalUnity,
                observacao_item: observacaoItem,
                foto_destaque: dt.foto_destaque,
                id_grupo: dt.id_grupo
            }


            if (gpAdicionais.length > 0) {
                let adc = []

                var tAdicional = 0;

                gpAdicionais.forEach((element) => {
                    element.selected_index.forEach((item) => {
                        tAdicional = (item.valor * count) + tAdicional;

                        adc.push({
                            ...item,
                            quantidade: count
                        })
                    })
                });

                product.total_adicional = tAdicional
                product.adicional = adc
            }

            if (flavorsSelected.length > 0) {
                product.sabores = flavorsSelected
            }

            if (lengthObject != undefined) {
                product.tamanho = lengthObject;
            }

            addCart(product, subdomain)
            router.push('/lista');
        }
    }

    const filterPromotionTamanhoArrayMenor = (tamanho) => {
        let arrayValores = [];

        if (tamanho.valor_g_promocao != undefined) {
            arrayValores.push(tamanho.valor_g_promocao);
        } else {
            if (tamanho.valor_g != undefined) {
                arrayValores.push(tamanho.valor_g);
            }
        }

        if (tamanho.valor_m_promocao != undefined) {
            arrayValores.push(tamanho.valor_m_promocao);
        } else {
            if (tamanho.valor_m != undefined) {
                arrayValores.push(tamanho.valor_m);
            }
        }

        if (tamanho.valor_p_promocao != undefined) {
            arrayValores.push(tamanho.valor_p_promocao);
        } else {
            if (tamanho.valor_p != undefined) {
                arrayValores.push(tamanho.valor_p);
            }
        }

        return Math.min(...arrayValores)
    }

    const filterPromotionTamanhoArrayMaior = (tamanho) => {
        let arrayValores = [];

        if (tamanho.valor_g_promocao != undefined) {
            arrayValores.push(tamanho.valor_g_promocao);
        } else {
            if (tamanho.valor_g != undefined) {
                arrayValores.push(tamanho.valor_g);
            }
        }

        if (tamanho.valor_m_promocao != undefined) {
            arrayValores.push(tamanho.valor_m_promocao);
        } else {
            if (tamanho.valor_m != undefined) {
                arrayValores.push(tamanho.valor_m);
            }
        }

        if (tamanho.valor_p_promocao != undefined) {
            arrayValores.push(tamanho.valor_p_promocao);
        } else {
            if (tamanho.valor_p != undefined) {
                arrayValores.push(tamanho.valor_p);
            }
        }

        return Math.max(...arrayValores)
    }

    const handleFilterProducts = (e) => {
        const searchString = e.target.value.toLowerCase();
        setSearchTermFlavor(e.target.value)

        const filteredFlavors = flavors.filter((flavor) => {
            const flavorDescricao = flavor.descricao.toLowerCase();
            return flavorDescricao.includes(searchString);
        });

        setFlavorsFilters(filteredFlavors);
    }

    return (
        <>
            <Container maxW='4xl' centerContent mt='100px' mb={['130px', '121px']}>
                <Box w='100%' mt='19px' border='1px solid #CECECE' bg='white' borderRadius='20px' padding={['30px 20px', '50px 63px']}>
                    <Flex alignItems='center' flexWrap={['wrap', 'initial']} justifyContent='left' mb={['20px', '50px']}>
                        <Image
                            className='imgViewProduct'
                            src={dt?.foto_destaque}
                            width={365}
                            height={374}
                            style={{
                                borderRadius: '20px',
                                display: 'block',
                                border: '1px solid #D4D4D4',
                                boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
                                objectFit: 'cover',
                                height: 374,
                                minWidth: 365
                            }}
                            objectFit='cover'
                            objectPosition='center'
                            alt={dt?.descricao}
                            loader={({ src }) => {
                                return src;
                            }}
                        />

                        <Box ml={['0px', '47px']} mt={['20px', '0px']} textAlign={['center', 'initial']} w={['100%', '']}>
                            <Text fontSize={['18px', '24px']} fontWeight={600} color='#000' letterSpacing='0.5px'>
                                {dt?.descricao}
                            </Text>
                            {dt.tag && <Tag mt={1} bg={data?.primary_color} color='white'>{dt.tag}</Tag>}


                            <Text mt='10px' fontSize={['14px', '16px']} color='#313131' fontWeight={400} letterSpacing='0.5px'>
                                {dt?.detalhe}
                            </Text>

                            <Text mt='12px' fontSize={['18px', '24px']} color='#000' fontWeight={400} display='flex' alignItems='center' gap='8px' justifyContent={['center', 'normal']}>
                                {dt.tamanhos && <Text as='span'>De: </Text>}

                                {["P", "O"].indexOf(dt.tipo) > -1 &&
                                    <Text as='span' color='rgb(80, 167, 115)' display='flex' alignItems='center' gap='4px'>
                                        {moneyFormat.format(filterPromotionTamanhoArrayMenor(dt))} <Text color='rgb(113, 113, 113)'>até: </Text>
                                        {moneyFormat.format(filterPromotionTamanhoArrayMaior(dt))}
                                    </Text>}
                                <Text as='span' color='rgb(80, 167, 115)'>{["P", "O"].indexOf(dt.tipo) === -1 && (dt?.em_promocao == false || !dt?.em_promocao ? moneyFormat.format(dt?.valor || 0) : moneyFormat.format(dt?.valor_promocao || 0))}</Text>
                                {["P", "O"].indexOf(dt.tipo) === -1 && dt?.em_promocao == true ? (<Text textDecoration='line-through' color='rgb(113, 113, 113)'>{dt?.em_promocao == true && moneyFormat.format(dt?.valor)}</Text>) : ''}
                            </Text>

                        </Box>
                    </Flex>

                    {gpTamanhos.length > 0 &&
                        <Box borderRadius='22px' overflow='hidden' w='100%' mb={['30px', '50px']}>
                            <Flex bg='#DDD' flexWrap={['wrap', 'initial']} w='100%' p='25px' alignItems='center' justifyContent='space-between'>
                                <Box textAlign={['center', 'initial']} w={['100%', '60%']}>
                                    <Text fontSize='16px' fontWeight={600} textTransform='uppercase'>Escolha o tamanho:</Text>
                                    <Text fontSize='14px' fontWeight={400}>Escolha no mínimo 1 opção</Text>
                                </Box>

                                <Flex w={['40%', '40%']} justifyContent={['center', 'initial']} w={['100%', 'initial']} mt={['15px', '']}>
                                    <Box bg={data?.primary_color} borderRadius='5px' padding='10px 18px' fontSize={['14px', '16px']} fontWeight={600} color='#fff'>
                                        {!isEmpty(lengthObject) ? 1 : 0} / 1
                                    </Box>

                                    <Box ml='16px' bg='#FFE8E8' borderRadius='5px' padding='12px 20px' fontSize={['12px', '14px']} fontWeight={600} color='#FF1D1D'>
                                        Obrigatório
                                    </Box>
                                </Flex>
                            </Flex>

                            {gpTamanhos.map((tam, index) => (
                                <Flex key={index} w='100%' border='1px solid #CECECE' padding='16px 25px' alignItems='center' justifyContent='space-between' borderRadius={index + 1 == gpTamanhos.length && '0px 0px 22px 22px'}>
                                    <Box>
                                        <Text fontSize='16px' fontWeight={600}>{tam?.tamanho}</Text>
                                        <Text fontSize='14px' fontWeight={400} fontStyle='italic'>Até {tam?.qtd_sabor} sabores</Text>
                                    </Box>

                                    <Box>
                                        <Switch isChecked={length == index} onChange={() => {
                                            if (tam.tag !== lengthObject.tag) {
                                                setFlavorsSelected([])
                                                handleLength(tam?.tag)
                                            }
                                            setLength(index)
                                            setLengthObject(tam)
                                            setOpenModal(true)
                                        }} size={['md', 'lg']} css={{
                                            '.chakra-switch__track[data-checked]': {
                                                '--switch-bg': data?.primary_color
                                            }
                                        }} />
                                    </Box>
                                </Flex>
                            ))}

                            <Drawer placement='bottom' onClose={() => setOpenModal(false)} isOpen={openModal}>
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerHeader position='relative' borderBottomWidth='1px' textAlign='center' display='flex' alignItems='center' justifyContent='space-between'>
                                        <Box display={searchFlavors ? 'block' : 'none'} w='80%'>
                                            <Input
                                                name="name"
                                                type="search"
                                                value={searchTermFlavor}
                                                float='left'
                                                fontSize='sm'
                                                onChange={(e) => handleFilterProducts(e)}
                                                onKeyPress={(e) => handleFilterProducts(e)}
                                                placeholder='Digite para filtrar por um sabor'
                                            />
                                        </Box>

                                        {!searchFlavors && (
                                            <Text color={data?.primary_color}>Sabores</Text>
                                        )}

                                        <Button onClick={() => {
                                            setFlavorsFilters(flavors);
                                            setSearchTermFlavor('');
                                            setSearchFlavors(!searchFlavors);
                                        }} size='sm' variant='transparent' bg={data?.primary_color}>
                                            {!searchFlavors ? <Icon as={FiSearch} color='white' fontSize='18px' /> : <Icon as={MdClose} color='white' fontSize='18px' />}
                                        </Button>

                                    </DrawerHeader>
                                    <DrawerBody bg='rgb(243, 245, 247)'>
                                        {isLoading ? <Loading fullpage={false} maxHeight='250px' /> : (
                                            <>
                                                {length !== undefined &&
                                                    <Box className="saboresBox" pt='20px'>
                                                        <Box>
                                                            <Box mb='10px'>
                                                                <Box style={{ width: '100%' }}>
                                                                    <Text fontWeight={600} fontSize='14px'>Escolha até {lengthObject.qtd_sabor} opç{lengthObject.qtd_sabor > 1 ? "ões" : "ão"}</Text>
                                                                </Box>
                                                            </Box>

                                                            <Box className="saboresList">
                                                                {flavorsFilters.map((sab, index) => (
                                                                    <Box borderBottom={flavorsFilters.length === index + 1 ? '' : '1px solid #CECECE'}>
                                                                        <Flex justifyContent='space-between' alignItems='center' key={index} p='10px' pl={0} pr={0}>
                                                                            <Text fontSize='13px' fontWeight={600}>{sab?.descricao}</Text>
                                                                            <Flex alignItems='center' gap='20px'>
                                                                                <Text as='strong' fontSize='14px'>{moneyFormat.format(sab?.valor)}</Text>
                                                                                <Checkbox
                                                                                    size='lg'
                                                                                    color={data.primary_color != undefined ? data.primary_color : '#1e90ff'}
                                                                                    isChecked={flavorsSelected.filter((filter) => filter.id_sabor == sab.id_sabor).length > 0 ? true : false}
                                                                                    onChange={(e) => {
                                                                                        let dt = flavorsSelected
                                                                                        if (lengthObject.qtd_sabor === 0) {
                                                                                            if (flavorsSelected.find((filter) => filter === sab) !== undefined) {
                                                                                                if (sab.descricao !== dt.descricao) {
                                                                                                    let ind = dt.indexOf(sab)
                                                                                                    dt.splice(ind, 1)
                                                                                                }
                                                                                            } else {
                                                                                                dt.push(sab)
                                                                                            }
                                                                                        } else {
                                                                                            if (dt.length < lengthObject.qtd_sabor) {
                                                                                                if (flavorsSelected.find((filter) => filter === sab) !== undefined) {
                                                                                                    if (sab.descricao !== dt.descricao) {
                                                                                                        let ind = dt.indexOf(sab)
                                                                                                        dt.splice(ind, 1)
                                                                                                    }
                                                                                                } else {
                                                                                                    dt.push(sab)
                                                                                                }
                                                                                            } else {
                                                                                                if (e.target.checked != undefined)
                                                                                                    toast({
                                                                                                        title: 'Alerta',
                                                                                                        description: `Selecione até ${lengthObject.qtd_sabor} opç${lengthObject.qtd_sabor > 1 ? "ões" : "ão"}`,
                                                                                                        status: 'warning',
                                                                                                        duration: 2000,
                                                                                                        isClosable: true,
                                                                                                        position: 'top-center'
                                                                                                    });
                                                                                                if (flavorsSelected.find((filter) => filter === sab) !== undefined) {
                                                                                                    if (sab.descricao !== dt.descricao) {
                                                                                                        let ind = dt.indexOf(sab)
                                                                                                        dt.splice(ind, 1)
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }

                                                                                        setFlavorsSelected([...dt])
                                                                                    }}
                                                                                >
                                                                                </Checkbox>
                                                                            </Flex>

                                                                        </Flex>

                                                                        {flavorsSelected.filter((filter) => filter.id_sabor == sab.id_sabor).length > 0 && (
                                                                            <Textarea
                                                                                mb={5}
                                                                                placeholder='Escreva a observação aqui...'
                                                                                size={['xs', 'xs']}
                                                                                border='1px solid #E0E0E0'
                                                                                borderRadius='36.5px'
                                                                                padding='11px 25px'
                                                                                onChange={(e) => {
                                                                                    setFlavorsSelected((prevFlavors) => {
                                                                                        return prevFlavors.map((flavor) => {
                                                                                            if (flavor.id_sabor === sab.id_sabor) {
                                                                                                return {
                                                                                                    ...flavor,
                                                                                                    observacao: e.target.value,
                                                                                                };
                                                                                            }
                                                                                            return flavor;
                                                                                        });
                                                                                    });
                                                                                }}
                                                                                resize='none'
                                                                                _focusVisible={{
                                                                                    borderColor: data?.primary_color,
                                                                                    boxShadow: `0 0 0 1px ${data?.primary_color}`
                                                                                }}
                                                                                rows='1'
                                                                                maxLength={140}
                                                                                overflow='hidden'
                                                                            />
                                                                        )}

                                                                    </Box>
                                                                ))}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                }
                                            </>
                                        )}
                                    </DrawerBody>
                                    <DrawerFooter>
                                        <Button
                                            variant='transparent'
                                            color='white'
                                            bg={data?.primary_color}
                                            transition='0.3s'
                                            _hover={{
                                                opacity: 0.8
                                            }}
                                            w='100%'
                                            onClick={() => {
                                                setOpenModal(false);
                                                window.scrollTo(0, 0);
                                            }}
                                        >
                                            Salvar
                                        </Button>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        </Box>
                    }

                    {flavorsSelected && flavorsSelected.length ? (
                        <Box borderRadius='22px' overflow='hidden' w='100%' mb={['30px', '50px']}>
                            <Flex bg='#DDD' flexWrap={['wrap', 'initial']} w='100%' p='25px' alignItems='center' justifyContent='space-between'>
                                <Box textAlign={['center', 'initial']} w={['100%', '60%']}>
                                    <Text fontSize='16px' fontWeight={600} textTransform='uppercase'>Sabores escolhidos</Text>
                                </Box>

                                <Flex w={['40%', '40%']} justifyContent={['center', 'initial']} w={['100%', 'initial']} mt={['15px', '']}>
                                    <Box bg={data?.primary_color} borderRadius='5px' padding='10px 18px' fontSize={['14px', '16px']} fontWeight={600} color='#fff'>
                                        {flavorsSelected.length} / {lengthObject.qtd_sabor}
                                    </Box>
                                </Flex>
                            </Flex>

                            {flavorsSelected?.map((sab, index) => (
                                <Flex key={index} w='100%' border='1px solid #CECECE' padding='16px 25px' alignItems='center' justifyContent='space-between' borderRadius={index + 1 == flavorsSelected.length && '0px 0px 22px 22px'}>
                                    <Box>
                                        <Text fontSize='16px' fontWeight={600}>1/{flavorsSelected.length} {sab?.descricao}</Text>
                                    </Box>

                                    <Box>
                                        <Switch isChecked onChange={() => {
                                            if (dt.descricao && !dt.descricao.includes(sab.descricao)) {
                                                const newFlavorsSelected = flavorsSelected.filter((entry) => entry.id_sabor != sab.id_sabor);
                                                setFlavorsSelected(newFlavorsSelected)
                                            }
                                        }} size={['md', 'lg']} css={{
                                            '.chakra-switch__track[data-checked]': {
                                                '--switch-bg': data?.primary_color
                                            }
                                        }} />
                                    </Box>
                                </Flex>
                            ))}
                        </Box>
                    ) : ""}

                    {gpAdicionais !== undefined &&
                        gpAdicionais.map((item, index) => (
                            <Box key={item.id} borderRadius='22px' overflow='hidden' w='100%' mb={['30px', '50px']}>
                                <Flex bg='#DDD' flexWrap={['wrap', 'initial']} w='100%' p='25px' alignItems='center' justifyContent='space-between'>
                                    <Box textAlign={['center', 'initial']} w={['100%', '60%']}>
                                        <Text fontSize='16px' fontWeight={600}>{item.descricao}</Text>
                                        {item.Qtd_obg >= 1 &&
                                            <Text fontSize='14px' fontWeight={400}>Escolha no mínimo 1 opção</Text>
                                        }
                                    </Box>

                                    <Flex w={['40%', '40%']} justifyContent={['center', 'initial']} w={['100%', 'initial']} mt={['15px', '']}>
                                        <Box bg={data?.primary_color} borderRadius='5px' padding='10px 18px' fontSize={['14px', '16px']} fontWeight={600} color='#fff'>
                                            {gpAdicionais.filter((entry) => entry.id == item.id)[0]?.selected_index.length} / {item.Qtd_maximo ? item.Qtd_maximo : item.adicionais.length}
                                        </Box>

                                        {item.Qtd_obg >= 1 &&
                                            <Box ml='16px' bg='#FFE8E8' borderRadius='5px' padding='12px 20px' fontSize={['12px', '14px']} fontWeight={600} color='#FF1D1D'>
                                                Obrigatório
                                            </Box>
                                        }
                                    </Flex>
                                </Flex>

                                {item.adicionais !== undefined && item.adicionais.map((add, index) => (
                                    item.Qtd_maximo === 1 ?
                                        <Flex key={index} w='100%' border='1px solid #CECECE' padding='16px 25px' alignItems='center' justifyContent='space-between' borderRadius={index + 1 == item.adicionais.length && '0px 0px 22px 22px'}>
                                            <Box>
                                                <Text fontSize='16px' fontWeight={600}>{add?.descricao}</Text>
                                                <Text fontSize='14px' fontWeight={400} fontStyle='italic'>{moneyFormat.format(add?.valor)}</Text>
                                            </Box>

                                            <Box>
                                                <Switch onChange={() => {
                                                    let dt = productDetail
                                                    var gp = dt.filter((entry) => {
                                                        return entry.grupo_adicional ? true : false;
                                                    });

                                                    gp[0].grupo_adicional[index].selected_index = [add]
                                                    setProductDetail([...dt])
                                                }} size={['md', 'lg']} css={{
                                                    '.chakra-switch__track[data-checked]': {
                                                        '--switch-bg': data?.primary_color
                                                    }
                                                }} />
                                            </Box>
                                        </Flex>
                                        : null
                                ))}

                                {item.adicionais !== undefined && item.adicionais.map((add, index) => (
                                    item.Qtd_maximo > 1 ?
                                        <Flex key={index} w='100%' border='1px solid #CECECE' padding='16px 25px' alignItems='center' justifyContent='space-between' borderRadius={index + 1 == item.adicionais.length && '0px 0px 22px 22px'}>
                                            <Box>
                                                <Text fontSize='16px' fontWeight={600}>{add?.descricao}</Text>
                                                <Text fontSize='14px' fontWeight={400} fontStyle='italic'>{moneyFormat.format(add?.valor)}</Text>
                                            </Box>

                                            <Box>
                                                <Switch onChange={() => {
                                                    let dt = productDetail
                                                    if (item.Qtd_maximo === 0) {
                                                        if (item.selected_index.find((filter) => filter === add) !== undefined) {
                                                            let ind = dt[index].selected_index.indexOf(add)
                                                            dt[index].selected_index.splice(ind, 1)
                                                        } else {
                                                            dt[index].selected_index.push(add)
                                                        }
                                                    } else {

                                                        if (item.selected_index.length < item.Qtd_maximo) {
                                                            if (item.selected_index.find((filter) => filter === add) !== undefined) {
                                                                let ind = item.selected_index.indexOf(add)
                                                                item.selected_index.splice(ind, 1)
                                                            } else {
                                                                item.selected_index.push(add)
                                                            }
                                                        } else {
                                                            toast({
                                                                title: 'Aviso',
                                                                description: `Selecione até ${item.Qtd_maximo} opções`,
                                                                status: 'warning',
                                                                duration: 2000,
                                                                isClosable: true,
                                                                position: 'bottom-center'
                                                            });
                                                            if (item.selected_index.find((filter) => filter === add) !== undefined) {
                                                                let ind = item.selected_index.indexOf(add)
                                                                item.selected_index.splice(ind, 1)
                                                            }
                                                        }
                                                    }

                                                    setProductDetail([...dt])
                                                }} size={['md', 'lg']} css={{
                                                    '.chakra-switch__track[data-checked]': {
                                                        '--switch-bg': data?.primary_color
                                                    }
                                                }} />
                                            </Box>
                                        </Flex>
                                        : null
                                ))}

                                {item.adicionais !== undefined && item.adicionais.map((add, index) => (
                                    item.Qtd_obg === 0 && item.Qtd_maximo === 0 ?
                                        <Flex key={index} w='100%' border='1px solid #CECECE' padding='16px 25px' alignItems='center' justifyContent='space-between' borderRadius={index + 1 == item.adicionais.length && '0px 0px 22px 22px'}>
                                            <Box>
                                                <Text fontSize='16px' fontWeight={600}>{add?.descricao}</Text>
                                                <Text fontSize='14px' fontWeight={400} fontStyle='italic'>{moneyFormat.format(add?.valor)}</Text>
                                            </Box>

                                            <Box>
                                                <Switch onChange={() => {
                                                    let dt = productDetail
                                                    if (item.Qtd_maximo === 0) {
                                                        if (item.selected_index.find((filter) => filter === add) !== undefined) {
                                                            let ind = item.selected_index.indexOf(add)
                                                            item.selected_index.splice(ind, 1)
                                                        } else {
                                                            item.selected_index.push(add)
                                                        }
                                                    } else {
                                                        if (dt[index].selected_index.length < item.Qtd_maximo) {
                                                            if (item.selected_index.find((filter) => filter === add) !== undefined) {
                                                                let ind = dt[index].selected_index.indexOf(add)
                                                                dt[index].selected_index.splice(ind, 1)
                                                            } else {
                                                                dt[index].selected_index.push(add)
                                                            }
                                                        } else {
                                                            if (item.selected_index.find((filter) => filter === add) !== undefined) {
                                                                let ind = dt[index].selected_index.indexOf(add)
                                                                dt[index].selected_index.splice(ind, 1)
                                                            }
                                                        }
                                                    }

                                                    setProductDetail([...dt])
                                                }} size={['md', 'lg']} css={{
                                                    '.chakra-switch__track[data-checked]': {
                                                        '--switch-bg': data?.primary_color
                                                    }
                                                }} />
                                            </Box>
                                        </Flex> : null
                                ))}

                                {item.adicionais !== undefined && item.adicionais.map((add, index) => (
                                    item.Qtd_obg >= 2 &&
                                    <Flex key={index} w='100%' border='1px solid #CECECE' padding='16px 25px' alignItems='center' justifyContent='space-between' borderRadius={index + 1 == item.adicionais.length && '0px 0px 22px 22px'}>
                                        <Box>
                                            <Text fontSize='16px' fontWeight={600}>{add?.descricao}</Text>
                                            <Text fontSize='14px' fontWeight={400} fontStyle='italic'>{moneyFormat.format(add?.valor)}</Text>
                                        </Box>

                                        <Box>
                                            <Switch onChange={() => {
                                                let dt = productDetail
                                                if (item.Qtd_maximo === 0) {
                                                    if (item.selected_index.find((filter) => filter === add) !== undefined) {
                                                        let ind = dt[index].selected_index.indexOf(add)
                                                        dt[index].selected_index.splice(ind, 1)
                                                    } else {
                                                        dt[index].selected_index.push(add)
                                                    }
                                                } else {
                                                    if (dt[index].selected_index.length < item.Qtd_maximo) {
                                                        if (item.selected_index.find((filter) => filter === add) !== undefined) {
                                                            let ind = dt[index].selected_index.indexOf(add)
                                                            dt[index].selected_index.splice(ind, 1)
                                                        } else {
                                                            dt[index].selected_index.push(add)
                                                        }
                                                    } else {
                                                        toast({
                                                            title: 'Aviso',
                                                            description: `Selecione até ${item.Qtd_maximo} opções`,
                                                            status: 'warning',
                                                            duration: 2000,
                                                            isClosable: true,
                                                            position: 'bottom-center'
                                                        });
                                                        if (item.selected_index.find((filter) => filter === add) !== undefined) {
                                                            let ind = dt[index].selected_index.indexOf(add)
                                                            dt[index].selected_index.splice(ind, 1)
                                                        }
                                                    }
                                                }

                                                setProductDetail([...dt])
                                            }} size={['md', 'lg']} css={{
                                                '.chakra-switch__track[data-checked]': {
                                                    '--switch-bg': data?.primary_color
                                                }
                                            }} />
                                        </Box>
                                    </Flex>
                                ))}
                            </Box>
                        ))}

                    <Box>
                        <FormControl mb={5}>
                            <FormLabel color='#000' fontSize={['14px', '16px']} fontWeight={600}>Adicionar algum detalhe?</FormLabel>
                            <Text mb='14px' fontSize='xs' color='#313131'>Converse diretamente com o estabelecimento caso queira modificar algum item. Neste campo não são aceitas modificações que podem gerar cobrança adicional.</Text>

                            <Textarea
                                onChange={(e) => setObservacaoItem(e.target.value)}
                                value={observacaoItem}
                                placeholder='Escreva o detalhe aqui...'
                                size={['xs', 'sm']}
                                border='1px solid #E0E0E0'
                                borderRadius='36.5px'
                                padding='28px 25px'
                                resize='vertical'
                                _focusVisible={{
                                    borderColor: data?.primary_color,
                                    boxShadow: `0 0 0 1px ${data?.primary_color}`
                                }}
                                maxLength={140}
                                overflow='hidden'
                            />
                            <FormHelperText fontSize='sm' color='#313131' textAlign='right'>{observacaoItem.length}/140</FormHelperText>
                        </FormControl>

                    </Box>
                </Box>
            </Container>

            <FooterProduct productData={productData} data={data} disable={disable} handleItemOrder={handleItemOrder} opened={opened} total={total} setTotal={setTotal} setCount={setCount} count={count} totalUnity={totalUnity} />
        </>
    )
}

function mapState(state) {
    const { sabores } = state;
    return { sabores };
}

const actionCreators = {
    getAll: saboresActions.getAll,
};

export default connect(mapState, actionCreators)(InfoProduct);
