import { Button, Container, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../hooks";
import user from "../../store/user";

type LoginRegisterFormProps = {
    register: boolean
}

const LoginRegisterForm = observer(({register}: LoginRegisterFormProps) => {

    const username = useInput("", "notNullText")
    const email = useInput("", "notNullText")
    const password = useInput("", "notNullText")

    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleLogin = async () => {
        if (await user.login(email.value, password.value)) {
            navigate('/')
        } else {            
            setError("Некорректный e-mail или пароль")
        }
    }
        
    const handleRegister = () => {}

    return (
        <>    
        <Container my={32} textAlign="center">
            { register &&
            <FormControl my={4}>
            <FormLabel>Ваше имя</FormLabel>
            <Input  placeholder='Ваше имя'
                    value={username.value}
                    onChange={(e) => username.onChange(e)}
                    isInvalid={username.isInvalid}
                    errorBorderColor={username.errorBorderColor}
                    onBlur={username.onBlur}
            />
            </FormControl>
            }
            <FormControl my={4}>
            <FormLabel>Email</FormLabel>
            <Input  placeholder='Введите email'
                    value={email.value}
                    onChange={(e) => email.onChange(e)}
                    isInvalid={email.isInvalid}
                    errorBorderColor={email.errorBorderColor}
                    onBlur={email.onBlur}
            />
            </FormControl>

            <FormControl my={4}>
            <FormLabel>Пароль</FormLabel>
            <Input  placeholder='Введите пароль'
                    value={password.value}
                    onChange={(e) => password.onChange(e)}
                    isInvalid={password.isInvalid}
                    errorBorderColor={password.errorBorderColor}
                    onBlur={password.onBlur}
                    type="password"
            />
            </FormControl>
            
            {!register && <Button colorScheme='blue' my={4} onClick={handleLogin}>
                    Войти
            </Button>}

            {register && <Button colorScheme='green' my={4} onClick={handleRegister}>
                    Зарегистрироваться
            </Button>}

            {!register && <Button colorScheme='green' m={4} onClick={() => navigate('/register')}>
                    Зарегистрироваться
            </Button>}

            {register && <Button colorScheme='blue' m={4} onClick={() => navigate('/login')}>
                    Есть учетная запись
            </Button>}

            <Heading as='h6' size='sm' color="red">
                     {error}
            </Heading>

        </Container>
        </>    
    )
})
  
export default LoginRegisterForm