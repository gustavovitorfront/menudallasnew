import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Text,
  createIcon,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { CardEstablishment } from "../CardEstablishment";
import { connect } from "react-redux";
import { lojasActions } from "../../store/actions";
import { isEmpty } from "lodash";

const filterIcon = createIcon({
  displayName: "filterIcon",
  viewBox: "0 0 25 25",
  path: (
    <>
      <path
        opacity="0.4"
        d="M10.5543 16.5573H3.84457C2.99537 16.5573 2.30603 17.2342 2.30603 18.0682C2.30603 18.9011 2.99537 19.5792 3.84457 19.5792H10.5543C11.4035 19.5792 12.0928 18.9011 12.0928 18.0682C12.0928 17.2342 11.4035 16.5573 10.5543 16.5573Z"
        fill="#1577BE"
      />
      <path
        opacity="0.4"
        d="M22.7142 6.78621C22.7142 5.95335 22.0249 5.27637 21.1768 5.27637H14.4671C13.6179 5.27637 12.9286 5.95335 12.9286 6.78621C12.9286 7.62018 13.6179 8.29716 14.4671 8.29716H21.1768C22.0249 8.29716 22.7142 7.62018 22.7142 6.78621Z"
        fill="#1577BE"
      />
      <path
        d="M9.32413 6.78622C9.32413 8.69022 7.75385 10.2335 5.81508 10.2335C3.87745 10.2335 2.30603 8.69022 2.30603 6.78622C2.30603 4.88333 3.87745 3.34009 5.81508 3.34009C7.75385 3.34009 9.32413 4.88333 9.32413 6.78622Z"
        fill="#1577BE"
      />
      <path
        d="M22.7141 18.0273C22.7141 19.9302 21.1439 21.4735 19.2051 21.4735C17.2675 21.4735 15.696 19.9302 15.696 18.0273C15.696 16.1233 17.2675 14.5801 19.2051 14.5801C21.1439 14.5801 22.7141 16.1233 22.7141 18.0273Z"
        fill="#1577BE"
      />
    </>
  ),
});

function EstablishmentsList({
  lojas,
  getAllLojas,
  segmentoActive,
  locActive,
  setSegmentoActive,
  segmentos,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [lojasData, setLojasData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [nome, setNome] = useState("");
  const [typeFilter, setTypeFilter] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    getAllLojas({
      nome: nome,
      segmento: segmentoActive,
      status: statusFilter,
      ...locActive,
    });
  }, [locActive, nome, segmentoActive, statusFilter]);

  useEffect(() => {
    if (lojas.items) {
      setLojasData(lojas.items);
      setIsLoading(false);
    } else {
      setLojasData([]);
    }

    if (lojas.loading) {
      setIsLoading(lojas.loading);
    }
  }, [lojas]);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  return (
    <Box mt="55px">
      <Text
        as="h2"
        mb="30px"
        fontSize="28px"
        color="#313131"
        fontWeight={600}
        letterSpacing="0.5px"
      >
        Estabelecimentos
      </Text>

      <Flex alignItems="stretch" mb="50px">
        <InputGroup
          bg="#fff"
          border="1px solid #999"
          borderRadius="22px"
          maxW="251px"
        >
          <InputLeftElement pointerEvents="none" ml="5px" mt="4px">
            <Icon as={FiSearch} color="primary" fontSize="24px" />
          </InputLeftElement>
          <Input
            type="search"
            color="#999"
            placeholder="Nome da loja"
            h="48px"
            borderRadius="22px"
            pl="45px"
            onChange={(e) => setNome(e.target.value)}
            fontSize="xs"
            pt="1px"
            outline={0}
            boxShadow="none !important"
            border="none !important"
          />
        </InputGroup>

        <Popover>
          <PopoverTrigger>
            <Button
              variant="transparent"
              h="51px"
              borderRadius="12px"
              ml="20px"
              bg="#e5f0fb"
              fontSize="sm"
              display="flex"
              alignItems="center"
              _hover={{
                transition: "0.3s",
                opacity: 0.8,
              }}
            >
              <Icon as={filterIcon} mr={["5px", "14px"]} fontSize="18px" />
              <Text mt={1}>Filtros</Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent w="400px">
            <PopoverArrow />
            <PopoverBody>
              <Flex>
                <Select
                  fontSize="xs"
                  mr={2}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  defaultValue={typeFilter}
                >
                  <option value="1">Segmento</option>
                  <option value="2">Situação</option>
                </Select>

                {typeFilter == 1 && (
                  <Select
                    fontSize="xs"
                    onChange={(e) => setSegmentoActive(e.target.value)}
                  >
                    <option value="" selected>
                      Todas
                    </option>

                    {!isEmpty(segmentos?.items) &&
                      segmentos?.items.map((item, key) => (
                        <option value={item.nome} key={key}>
                          {item.nome}
                        </option>
                      ))}
                  </Select>
                )}

                {typeFilter == 2 && (
                  <Select
                    fontSize="xs"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="" selected>
                      Todos
                    </option>
                    <option value="aberto" selected>
                      Aberto
                    </option>
                    <option value="fechado" selected>
                      Fechado
                    </option>
                  </Select>
                )}
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <Flex columns={["1", "2", "4"]} flexWrap="wrap" mb="15px">
        {!isLoading &&
          lojasData
            .slice(0, visibleItems)
            .map((item, key) => <CardEstablishment key={key} item={item} />)}
      </Flex>

      <Center>
        <Button
          onClick={handleLoadMore}
          variant="btnDallas"
          borderRadius="15px"
          color="#fff"
          h="57px"
          minW="175px"
          fontWeight={600}
          _hover={{
            transition: "0.3s",
            opacity: 0.9,
          }}
        >
          Ver mais
        </Button>
      </Center>
    </Box>
  );
}

function mapState(state) {
  const { lojas, segmentos } = state;
  return { lojas, segmentos };
}

const actionCreators = {
  getAllLojas: lojasActions.getAll,
};

export default connect(mapState, actionCreators)(EstablishmentsList);
