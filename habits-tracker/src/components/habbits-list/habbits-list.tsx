import { Container, Grid, GridItem, Text, useColorMode } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import habbits from "../../store/habbits";
import HabbitsRating from "../habbit-rating";

function dateNow(): string {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 
const HabbitsList: React.FC = observer(() => {

    const { colorMode } = useColorMode()
    const dateYYYYMMDD = dateNow()

    return (
        <Container mt={8} justifyContent="center" display="flex"> 
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
                          background={colorMode === 'dark' ? "blue.900" : "blue.50"}
                          key={habbit.id}>
                    <Grid templateColumns={"repeat(1,1fr)"}>
                        <GridItem w='320px'
                                  h='80px'
                        >
                            <Text fontSize={24} mt={4} ml={4}>
                                {habbit.title} 
                            </Text>        
                        </GridItem>
                        <GridItem w='320px'
                                  h='80px'                                  
                        >
                            <HabbitsRating rate={habbit.tracker[dateYYYYMMDD]}/>        
                        </GridItem>
                    </Grid>
                    
                </GridItem>
                )})}
            </Grid>
        </Container>
    )
})

export default HabbitsList