import { Container, Table, TableContainer, Tbody, Td, Text,  Th, Thead, Tr } from "@chakra-ui/react"
import { IChartData, IHabit } from "../../interfaces/interface"
import { resultToPercentage } from "../../helpers/helpers"
import { observer } from "mobx-react-lite"
import HabitChart from "../chart"
import habits from "../../store/habits"

interface HabitDetailProps {
    habit: IHabit
    data: IChartData[]
}

const HabitDetail = observer(({habit, data}: HabitDetailProps ) => {
    
    return (
        <Container mt={5} mb={8}>            
            <Text fontSize={24} mt={8} align="center">
            {habit.title}            
            </Text>

            <TableContainer mt={4}>        
                    <Table variant='simple'>            
                        <Thead>
                        <Tr>
                            <Th>Показатель</Th>
                            <Th isNumeric>Дней</Th>                
                        </Tr>
                        </Thead>
                        <Tbody>                            
                            <Tr>
                                <Td>Без пропусков</Td>
                                <Td isNumeric>{habits.lastDaysWithoutPass(habit.id)} </Td>                
                            </Tr>
                            <Tr>
                                <Td>Всего без пропусков</Td>
                                <Td isNumeric>{habits.maxDaysWithoutPass(habit.id)} </Td>                
                            </Tr>                            
                        </Tbody>
                    </Table>
                </TableContainer>


        <HabitChart data={data} />

        {
            Object.keys(habit.tracker).length>0 ? (
                <TableContainer mt={4}>        
                    <Table variant='simple'>            
                        <Thead>
                        <Tr>
                            <Th>Дата</Th>
                            <Th isNumeric>Результат, %</Th>                
                        </Tr>
                        </Thead>
                        <Tbody>
                            {Object.keys(habit.tracker).reverse().map(date =>                     
                                <Tr key={date}>
                                    <Td>{date}</Td>
                                    <Td isNumeric>{resultToPercentage(habit.tracker[date])}</Td>                
                                </Tr>
                            )}            
                        </Tbody>
                    </Table>
                </TableContainer>
            ) : null
        }
            
        </Container>
    )
})


export default HabitDetail