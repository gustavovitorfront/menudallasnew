import { Box, Button, Flex, Icon, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import InputMask from "react-input-mask";

function HeaderHome() {
  const [cep, setCep] = useState('');

  const handleUseLocation = () => {
    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB4IRy_Tcv1loZ1Ci1RrmJoe2gsJ8LeI6U`);
            const data = await response.json();

            if (data) {
              var cep = data.results[0].address_components.filter(function (entry) {
                return entry.types[0] == "postal_code";
              })

              if (cep.length > 0) {
                setCep(cep[0].long_name);
              }
            }
          } catch (error) {
            console.error("Error fetching location data:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    }
  }

  return (
    <Box bgImage='url("/img/header.png")' width='100%' minH={['fit-content', '370px']} padding={['30px 30px', '40px 40px']} backgroundSize={['cover', '']}>
      <Flex flexWrap='wrap' alignItems='center' w='100%' justifyContent='space-between'>
        <Box m={['0px auto', '']}>
          <Image
            src="/img/vector2.png"
            width={267}
            height={222}
            objectFit='contain'
            alt="Menu Dallas Vetor"
          />
        </Box>

        <Box m={['0px auto', '']} mt={['25px', '']} ml={['', '40px']} mr={['', '40px']}>
          <Text as='h1' fontSize={['28px', '32px']} lineHeight={['34px', '']} fontWeight={600} color='#313131' textAlign='center' letterSpacing='0.5px'>
            Seu cardápio online na palma da mão
          </Text>

          <Text textAlign='center' fontSize='sm' color='#313131' letterSpacing='0.5px' mt='10px'>Procure restaurantes próximos à você</Text>

          <InputGroup bg='#fff' boxShadow='12px 26px 51px 0px rgba(90, 108, 234, 0.07)' borderRadius='22px' mt='30px' mb='25px'>
            <InputLeftElement pointerEvents='none' ml={['8px', '15px']} mt='10px'>
              <Icon as={FiSearch} color='black' fontSize='24px' />
            </InputLeftElement>

            <InputMask
              mask="99999-999"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              maskChar=''
            >
              {() => (
                <Input
                  type="search"
                  fontSize={["xs", ""]}
                  placeholder="Buscar por CEP"
                  h="60px"
                  borderRadius="22px"
                  pl={["50px", "60px"]}
                  pt="5px"
                  pr={["15px", "40px"]}
                  outline="0"
                  boxShadow="none !important"
                  border="none !important"
                />
              )}
            </InputMask>
            <Button
              variant='btnDallas'
              h='60px'
              borderRadius='0px 22px 22px 0px'
              minW='108px'
              position='relative'
              left={['0', '-20px']}
              color='#fff'
              fontSize='14px'
              textTransform='capitalize'
              fontWeight={600}
              textAlign='center'
              zIndex={1}
            >
              Buscar
            </Button>
          </InputGroup>

          <Text textAlign='center' color='primary' fontSize='sm' fontWeight={600} letterSpacing='0.5px' cursor='pointer' onClick={handleUseLocation}>Ou usar minha localização</Text>

        </Box>

        <Box m={['0px auto', '']}>
          <Image
            src="/img/vector1.png"
            width={267}
            height={268}
            objectFit='contain'
            alt="Menu Dallas Vetor"
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default HeaderHome
