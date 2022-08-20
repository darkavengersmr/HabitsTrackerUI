import { StarIcon } from "@chakra-ui/icons";
import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import React from "react";

interface habitsRatingProps {
    rate: number,
    onChangeRate: (rating: number) => void
}

const rateToStars = (rate: number): Boolean[] => {
    let habitstars: Boolean[] = []
    for (let i=0; i<5; i++) {
        if (i <= rate-1) {
            habitstars.push(true)
        } 
        else {
            habitstars.push(false)
        }
    }
    return habitstars
}

const HabitsRating: React.FC<habitsRatingProps> = ({ rate, onChangeRate }) => {

    const { colorMode } = useColorMode()
    const stars = rateToStars(rate)

    return (
        <Grid templateColumns="repeat(5, 40px)" 
              justifyContent="end" 
              alignItems="end" 
              height="80px" 
              width="240px"
              pb="15px"
              pr="8px"> 
                {stars.map((star, key) => {
                return (
                    <GridItem key={key}>                            
                        <StarIcon color={star ? "yellow" : colorMode === 'dark' ? "white" : "grey" }
                                w={8}
                                h={8}
                                onClick={() => onChangeRate(key+1)}                                                                                    
                        />
                    </GridItem>
                )})}
            
        </Grid>
    )
}

export default HabitsRating