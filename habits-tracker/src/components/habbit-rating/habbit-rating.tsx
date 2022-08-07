import { StarIcon } from "@chakra-ui/icons";
import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import React from "react";

interface HabbitsRatingProps {
    rate: number,
    onChangeRate: (rating: number) => void
}

const rateToStars = (rate: number): Boolean[] => {
    let habbitStars: Boolean[] = []
    for (let i=0; i<5; i++) {
        if (i <= rate-1) {
            habbitStars.push(true)
        } 
        else {
            habbitStars.push(false)
        }
    }
    return habbitStars
}

const HabbitsRating: React.FC<HabbitsRatingProps> = ({ rate, onChangeRate }) => {

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

export default HabbitsRating