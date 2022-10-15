import { Container, FormControl, Select, Table, TableContainer, Tbody, Td, Text,  Th, Thead, Tr } from "@chakra-ui/react"
import habits from "../../store/habits"
import { observer } from "mobx-react-lite"
import HabitChart from "../chart"
import { useState } from "react"

const Reports = observer(() => {
    
    const [habitChartTitle, setHabitChartTitle] = useState("0")

    return (
        <Container mt={5} mb={8}>            
            <FormControl mt={4}>
                                     
                    <Select 
                            value={habitChartTitle}                                                        
                            onChange={(e) => setHabitChartTitle(e.target.value)}
                    >
                        {habits.data.map((habit) => {
                            return <option key={habit._id} 
                                           value={habit._id}
                                    >
                                        {habit.title}
                                    </option>
                        })

                        }
                    </Select>

                    </FormControl>            
        <HabitChart data={habits.chartData(habitChartTitle)} />

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
                                    <Tr key={habit._id}>
                                        <Td>{habit.title}</Td>
                                        <Td isNumeric>{habits.lastDaysWithoutPass(habit._id)}</Td>                
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
                                    <Tr key={habit._id}>
                                        <Td>{habit.title}</Td>
                                        <Td isNumeric>{habits.maxDaysWithoutPass(habit._id)}</Td>                
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