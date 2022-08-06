import { Avatar, Box, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import AddHabbit from "../add-habbit";

const AppHeader: React.FC = () => {    
    return (
        <>
        <Box as='header'>
            <Container maxW='100%' mt={4}>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Heading as='h4' size='md'>Мои.Привычки</Heading>
                    <Flex justifyContent='center' alignItems='center'> 
                        <AddHabbit/>                      
                        <Avatar ml={2}/>
                    </Flex>                    
                </Flex>
            </Container>
        </Box>
        
        </>
    )
}

export default AppHeader