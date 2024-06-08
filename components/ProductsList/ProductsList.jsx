import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { filterGpProduct, filterPromotionTamanhoArrayMaior, filterPromotionTamanhoArrayMenor } from '../../utils/filtersPromotion';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import { moneyFormat } from '../../utils/moneyFormat';

function ProductsList({ data, products, categories }) {
    const [categoriesData, setCategoriesData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (categories.items) {
            setCategoriesData(categories.items);
        } else {
            setCategoriesData([]);
        }
    }, [categories]);

    useEffect(() => {
        if (products.items) {
            setProductsData(products.items);
        } else {
            setProductsData([]);
        }
    }, [products]);

    return (
        <Box padding={['12px 30px', '12px 50px']} pt='0' mb={['100px', '120px']}>
            {categoriesData.map((cat, keyCat) => productsData?.filter((entry) => filterGpProduct(entry, cat)).length > 0 && (
                <Box mt={['30px', '58px']} key={keyCat} id={slugify(cat.descricao, { lower: true })}>
                    <Text fontSize='20px' fontWeight={600} color={data?.primary_color} mb={['20px', '27px']}>
                        {cat.descricao}
                    </Text>

                    <Flex flexWrap='wrap' gap='20px' justifyContent='space-between'>

                        {productsData?.filter((entry) => filterGpProduct(entry, cat))?.map((product, index) => (
                            <Flex key={index} cursor='pointer' transition='0.3s' _hover={{
                                opacity: 0.8
                            }} w={['100%', '48.7%']} mb={['20px', '0px']} borderRadius='9px' border='1px solid #ECECEC' bg='#fff' overflow='hidden'
                                onClick={() => router.push(`/produto/${slugify(product.descricao, { lower: true })}?g=${product.id_grupo}&p=${product.id_produto}`)}>
                                <Box display='flex' alignItems='stretch' borderRight={`2px solid ${data?.primary_color}`} >
                                    <Image
                                        className='imgProdList'
                                        src={product.foto_destaque}
                                        width={150}
                                        height={144}
                                        objectFit='cover'
                                        objectPosition='center'
                                        style={{
                                            minWidth: 150,
                                            maxWidth: 150,
                                            maxHeight: 144,
                                            objectFit: 'cover'
                                        }}
                                        alt={product.descricao}
                                        loader={({ src }) => {
                                            return src;
                                        }}
                                    />
                                </Box>

                                <Box pt='17px' pb={['17px', '0']} pl='24px' pr='24px'>
                                    <Box>
                                        <Text fontSize='14px' fontWeight={600} color='#000'>{product.descricao}</Text>
                                        <Text fontSize='12px' fontWeight={400} mb='2px' color='#979797'>{product.detalhe}</Text>
                                        {product?.serve_qtd_pessoas ? (
                                            <Text fontSize='xs' fontWeight={800} color='#000'>Serve {product?.serve_qtd_pessoas} pessoa{product?.serve_qtd_pessoas > 1 ? 's' : ''}</Text>
                                        ) : ""}
                                    </Box>

                                    <Box mt='auto'>
                                        <Text mt='12px' fontSize='14px' color='#000' fontWeight={400} display='flex' alignItems='center' gap='8px'>
                                            {product.tamanhos && <Text as='span'>De: </Text>}

                                            {["P", "O"].indexOf(product.tipo) > -1 &&
                                                <Text as='span' color='rgb(80, 167, 115)' display='flex' alignItems='center' gap='4px'>
                                                    {moneyFormat.format(product.valor_de || 0)} <Text color='rgb(113, 113, 113)'>até: </Text>
                                                    {moneyFormat.format(product.valor_ate || 0)}
                                                </Text>}
                                            <Text as='span' color='rgb(80, 167, 115)'>{["P", "O"].indexOf(product.tipo) === -1 && (product?.em_promocao == false ? moneyFormat.format(product?.valor || 0) : moneyFormat.format(product?.valor_Promocao || 0))}</Text>
                                            {["P", "O"].indexOf(product.tipo) === -1 && product?.em_promocao == true ? (<Text textDecoration='line-through' color='rgb(113, 113, 113)'>{product?.em_promocao == true && moneyFormat.format(product?.valor || 0)}</Text>) : ''}
                                        </Text>
                                    </Box>
                                </Box>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            ))}

        </Box>
    )
}

function mapState(state) {
    const { categories, products } = state;
    return { categories, products };
}

const actionCreators = {};

export default connect(mapState, actionCreators)(ProductsList);