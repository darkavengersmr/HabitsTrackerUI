import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

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
                    <Heading as='h4' size='md' onClick={() => navigate('/')}>Мои.Привычки</Heading>
                    <Flex justifyContent='center' alignItems='center'>
                        <>
                            {AppHeaderComponents.map((Component, key) => (<Component key={key} />))}
                            <HamburgerIcon w={8} h={8} ml={2} onClick={() => navigate('/catalog')} />
                            <SettingsIcon w={8} h={8} ml={2} onClick={() => navigate('/profile')} />
                        </> 
                    </Flex>                    
                </Flex>
            </Container>
        </Box>
        
        </>
    )
}

export default AppHeader