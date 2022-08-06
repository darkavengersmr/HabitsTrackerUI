import React from "react";
import { AddIcon } from '@chakra-ui/icons'

import habbits from "../../store/habbits";

const AddHabbit: React.FC = () => {   
    
    const handleAddHabbit: React.MouseEventHandler<SVGAElement> = () => {
        habbits.addHabbit({id: 3, title: "Еще привычка", category: "Здоровье", tracker: { "2022-08-05": 3, "2022-08-06": 2} })
    }
    
    return (
   
            <AddIcon w={8} 
                     h={8}
                     mr={2}                     
                     onClick={handleAddHabbit}
            /> 

    )
}

export default AddHabbit