import { Button, useColorMode } from "@chakra-ui/react";
import { Box, Container, Flex, Text, Switch } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import user from "../../store/user";

function UserPrefs() {
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()
  const handleLogout = () => {
    user.logout()
    navigate('/login')
  }

  return (<>
    <Box>
        <Container maxW='600px' mt={12} textAlign="center">                
            <Flex justifyContent='space-between' alignItems='center'>
                <Text>
                    Темная тема
                </Text>
                <Switch onChange={toggleColorMode} isChecked={colorMode === 'dark' ? true : false}/>
            </Flex>
            <Button colorScheme='blue' my={8} onClick={handleLogout}>
                    Выйти из аккаунта
            </Button>
        </Container>
    </Box>
  </>    
  );
}

export default UserPrefs