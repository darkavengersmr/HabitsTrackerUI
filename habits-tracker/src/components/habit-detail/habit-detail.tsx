import { Container, Table, TableContainer, Tbody, Td, Text,  Th, Thead, Tr } from "@chakra-ui/react"
import { IHabit } from "../../interfaces/interface"
import { resultToPercentage } from "../../helpers/helpers"
import { observer } from "mobx-react-lite"
import habits from "../../store/habits";

interface HabitDetailProps {
    habit: IHabit
}

const HabitDetail = observer(({habit}: HabitDetailProps ) => {
    
    return (
        <Container mt={5} mb={8}>            
            <Text fontSize={24} mt={8} align="center">
            {habit.title}            
            </Text>

            <Text fontSize={16} mt={2} align="center">
            дней без перерыва: {habits.daysWithoutPass(habit.id)}            
            </Text>

        {
            Object.keys(habit.tracker).length>0 ? (
                <TableContainer mt={12}>        
                    <Table variant='simple'>            
                        <Thead>
                        <Tr>
                            <Th>Дата</Th>
                            <Th isNumeric>Результат</Th>                
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