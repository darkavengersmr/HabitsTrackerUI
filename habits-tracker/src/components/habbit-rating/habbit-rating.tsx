import { StarIcon } from "@chakra-ui/icons";
import { Container, useColorMode } from "@chakra-ui/react";
import React from "react";

interface HabbitsRatingProps {
    rate: number
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

const HabbitsRating: React.FC<HabbitsRatingProps> = ({ rate }) => {

    const { colorMode } = useColorMode()
    const stars = rateToStars(rate)

    return (
        <Container justifyContent="end" display="flex"> 
                {stars.map((star, key) => {
                return (
                
                <StarIcon color={star ? "yellow" : colorMode === 'dark' ? "white" : "black" }
                          w={8}
                          h={8}                          
                          key={key}                          
                />
                )})}
            
        </Container>
    )
}

export default HabbitsRating