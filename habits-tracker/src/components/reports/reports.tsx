import { Container, Table, TableContainer, Tbody, Td, Text,  Th, Thead, Tr } from "@chakra-ui/react"
import habits from "../../store/habits"
import { observer } from "mobx-react-lite"
import HabitChart from "../chart"

const Reports = observer(() => {
    
    return (
        <Container mt={5} mb={8}>            
            <Text fontSize={24} mt={8} align="center">
                Мои привычки
            </Text>            
        <HabitChart data={habits.chartAllData()} />

        {
            habits.data.length>0 ? (
                <>
                    <Text fontSize={18} mt={8} align="center">
                    В последние дни
                    </Text>
                    <TableContainer mt={4}>        
                        <Table variant='simple'>            
                            <Thead>
                            <Tr>
                                <Th>Привычка</Th>
                                <Th isNumeric>Дни</Th>                
                            </Tr>
                            </Thead>
                            <Tbody>
                                {habits.data.map(habit =>                     
                                    <Tr key={habit.id}>
                                        <Td>{habit.title}</Td>
                                        <Td isNumeric>{habits.lastDaysWithoutPass(habit.id)}</Td>                
                                    </Tr>
                                )}            
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            ) : null
        }

{
            habits.data.length>0 ? (
                <>
                    <Text fontSize={18} mt={8} align="center">
                    За все время
                    </Text>
                    <TableContainer mt={4}>        
                        <Table variant='simple'>            
                            <Thead>
                            <Tr>
                                <Th>Привычка</Th>
                                <Th isNumeric>Дни</Th>                
                            </Tr>
                            </Thead>
                            <Tbody>
                                {habits.data.map(habit =>                     
                                    <Tr key={habit.id}>
                                        <Td>{habit.title}</Td>
                                        <Td isNumeric>{habits.maxDaysWithoutPass(habit.id)}</Td>                
                                    </Tr>
                                )}            
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            ) : null
        }

        </Container>
    )
})


export default Reports