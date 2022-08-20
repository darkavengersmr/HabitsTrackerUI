import { Container, Grid, GridItem, Text, useColorMode } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React from "react"
import catalog from "../store/catalog"
import AddHabit from "../components/add-habit"
import { ICatalog } from "../interfaces/interface"

function bgImage(category: string, theme: string): string {
    const color = theme === "dark" ? 0 : 255
    return `linear-gradient(rgba(${color}, ${color}, ${color}, 1), 
           rgba(2${color}, ${color}, ${color}, 0.4)), url('../../images/${category}.png')`
}

const catalogItem = (habit: ICatalog, colorMode: string): React.ReactNode => {
    return (
    <GridItem w='320px' 
              h='160px'
              borderWidth={2}                          
              key={habit.id} 
              borderRadius="16px"
              bgImage={bgImage(habit.category, colorMode)}
              _before={{                            
                opacity: 0.9
              }}
    >                    
        <Grid>
            <GridItem w='320px'
                      h='80px'
                      gridColumn="span 4"                                  
            >
                <Text fontSize={18} mt={4} ml={4} noOfLines={2}>
                    {habit.title} 
                </Text>
                <Text fontSize={14} mt={2} ml={4} mr={4} noOfLines={5}>
                    {habit.detail} 
                </Text>        
            </GridItem>
        </Grid>
                                    
    </GridItem>
)}

const HabitsCatalog: React.FC = observer(() => {
    
    const { colorMode } = useColorMode()        

    return (

        <Container mt={5} mb={8}
                   justifyContent="center" 
                   display="flex"                   
                   >            
        
            <Grid templateColumns={{ base: "repeat(1, 1fr)", 
                                     md: "repeat(2, 1fr)", 
                                     lg: "repeat(3, 1fr)",
                                     xl: "repeat(4, 1fr)"}}
                  gap={2}                                    
            >
                {catalog.data.map((habit) => <AddHabit key={habit.id} 
                                                       title={habit.title}
                                                       category={habit.category}
                                             >
                    {catalogItem(habit, colorMode)}
                </AddHabit>)}
                                                        
            </Grid>
        </Container>
    )
})

export default HabitsCatalog