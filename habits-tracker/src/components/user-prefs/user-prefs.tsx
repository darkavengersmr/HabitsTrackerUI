import { useColorMode } from "@chakra-ui/react";
import { Box, Container, Flex, Text, Switch } from "@chakra-ui/react";

function UserPrefs() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (<>
    <Box>
        <Container maxW='600px' mt={12}>                
            <Flex justifyContent='space-between' alignItems='center'>
                <Text>
                    Темная тема
                </Text>
                <Switch onChange={toggleColorMode} isChecked={colorMode === 'dark' ? true : false}/>
            </Flex>                
        </Container>
    </Box>
  </>    
  );
}

export default UserPrefs