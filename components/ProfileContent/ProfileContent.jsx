import { Box, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { FaHistory, FaMapMarkerAlt } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { MdCheckCircle, MdSettings } from 'react-icons/md'
import { handleLogout } from '../../utils/auth'
import Link from 'next/link'

function ProfileContent({ data, setIsLoggedState }) {
    return (
        <Box w='100%'>
            <List>
                <Link href='/pedidos'>
                    <ListItem display='flex' gap='5px' alignItems='center' p='15px' cursor='pointer' transition='.25s ease-in-out' fontSize='16px' color='#313131' _hover={{
                        svg: {
                            fill: data?.primary_color
                        }
                    }}>
                        <ListIcon fontSize='18px' as={FaHistory} />
                        <Text pt='2px'>
                            Pedidos
                        </Text>
                    </ListItem>
                </Link>
                <Link href='/endereco'>
                    <ListItem borderTop='0.5px solid #d6d6d6' display='flex' gap='5px' alignItems='center' p='15px' cursor='pointer' transition='.25s ease-in-out' fontSize='16px' color='#313131' _hover={{
                        svg: {
                            fill: data?.primary_color
                        }
                    }}>
                        <ListIcon as={FaMapMarkerAlt} fontSize='18px' />
                        <Text pt='2px'>
                            Endereço
                        </Text>
                    </ListItem>
                </Link>
                <Link href='/editar-perfil'>
                    <ListItem borderTop='0.5px solid #d6d6d6' display='flex' gap='5px' alignItems='center' p='15px' cursor='pointer' transition='.25s ease-in-out' fontSize='16px' color='#313131' _hover={{
                        svg: {
                            fill: data?.primary_color
                        }
                    }}>
                        <ListIcon as={MdSettings} fontSize='18px' />
                        <Text pt='2px'>
                            Editar perfil
                        </Text>
                    </ListItem>
                </Link>
                <ListItem onClick={() => {
                    handleLogout();
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                    return 1;
                }} borderTop='0.5px solid #d6d6d6' display='flex' gap='5px' alignItems='center' p='15px' cursor='pointer' transition='.25s ease-in-out' fontSize='16px' color='#313131' _hover={{
                    svg: {
                        color: data?.primary_color
                    }
                }}>
                    <ListIcon as={FiLogOut} fontSize='18px' />
                    <Text pt='2px'>
                        Sair
                    </Text>
                </ListItem>
            </List>
        </Box>
    )
}

export default ProfileContent
