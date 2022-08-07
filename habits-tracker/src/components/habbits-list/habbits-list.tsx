import { Container, Grid, GridItem, Text, useColorMode } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import habbits from "../../store/habbits";
import HabbitsRating from "../habbit-rating";
import dateNow from "../../helpers/helpers";

function bgImage(category: string, theme: string): string {
    const color = theme === "dark" ? 0 : 255
    return `linear-gradient(rgba(${color}, ${color}, ${color}, 1), 
           rgba(2${color}, ${color}, ${color}, 0.4)), url('../../images/${category}.png')`
}

const HabbitsList: React.FC = observer(() => {

    const { colorMode } = useColorMode()
    const dateYYYYMMDD = dateNow(0)

    if (habbits.data.length === 0) {
        return (
            <Container mt={5} mb={8}>
                <Text fontSize={20} mt={16} >
                Мы привыкли считать, что залог успеха — самодисциплина и железная сила воли. 
                Но без них можно обойтись, если довести важные дела до автоматизма. 
                Иначе говоря, выработать правильные привычки. 
                Не самая простая задача, помочь в которой может трекер привычек. 
                </Text>
                <Text fontSize={24} mt={8}>
                Чтобы начать, добавьте первую привычку, нажав на +
                </Text>        
            </Container>
        )
    }


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
                {habbits.data.map((habbit) => {
                return (
                <GridItem w='320px' 
                          h='160px'
                          borderWidth={2}                          
                          key={habbit.id} 
                          borderRadius="16px"
                          bgImage={bgImage(habbit.category, colorMode)}
                          _before={{                            
                            opacity: 0.9
                          }}
                >
                    <Grid templateColumns="1fr 1fr 1fr 1fr" 
                          templateRows="1fr 1fr"                                                 
                    >
                        <GridItem w='320px'
                                  h='80px'
                                  gridColumn="span 4"
                        >
                            <Text fontSize={24} mt={4} ml={4} noOfLines={2}>
                                {habbit.title} 
                            </Text>        
                        </GridItem>
                        <GridItem w='80px'
                                  h='80px'
                                  display="flex"
                                  alignItems="end"
                        >
                            <Text fontSize={24} mb={3} ml={4} fontWeight="700"> 
                                {habbits.daysWithoutPass(habbit.id)}
                            </Text>
                        
                        </GridItem>
                        <GridItem w='240px'
                                  h='80px'                                  
                                  gridColumn="span 3"
                        >
                            <HabbitsRating rate={habbit.tracker[dateYYYYMMDD]} 
                                           onChangeRate={(rating) => {habbits.setRating(habbit.id, rating)}}/>        
                        </GridItem>
                    </Grid>
                    
                </GridItem>
                )})}
            </Grid>
        </Container>
    )
})

export default HabbitsList