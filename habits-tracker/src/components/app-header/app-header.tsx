import { CalendarIcon, HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import user from '../../store/user';

interface IAppHeaderComponents {
    AppHeaderComponents: React.FC[]    
}

const AppHeader = ({AppHeaderComponents}: IAppHeaderComponents) => {   
    const navigate = useNavigate()
    
    return (
        <>
        <Box as='header'>
            <Container maxW='100%' mt={6}>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Heading as='h5' 
                             size='sm'
                             _hover={{cursor: "pointer"}}                             
                             onClick={() => navigate('/')}>
                                Лучшая версия себя
                    </Heading>
                    <Flex justifyContent='center' alignItems='center'>
                        <>
                            {user.data.isLogIn && AppHeaderComponents.map((Component, key) => (<Component key={key} />))}
                            {user.data.isLogIn && <CalendarIcon w={6} h={6} ml={2} _hover={{cursor: "pointer"}} onClick={() => navigate('/reports')} />}
                            {user.data.isLogIn && <HamburgerIcon w={6} h={6} ml={2} _hover={{cursor: "pointer"}} onClick={() => navigate('/catalog')} />}
                            <SettingsIcon w={6} h={6} ml={2} _hover={{cursor: "pointer"}} onClick={() => navigate('/profile')} />
                        </> 
                    </Flex>                    
                </Flex>
            </Container>
        </Box>
        
        </>
    )
}

export default AppHeader