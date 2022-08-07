import React from "react";
import { AddIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";

import habbits from "../../store/habbits";
import categories from "../../store/categories";
import { useInput } from "../../hooks";

const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

const AddHabbit: React.FC = () => {   
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay] = React.useState(<OverlayOne />)
    const habbitTitle = useInput("", "notNullText")
    const categoryTitle = useInput("", "notNullText")

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleAddHabbit: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (!habbitTitle.isInvalid && categoryTitle.value ) {
            habbits.addHabbit({id: habbits.data.length, 
                title: habbitTitle.value, 
                category: categoryTitle.value, 
                tracker: {}})
            onClose()
            habbitTitle.clearValue()
            categoryTitle.clearValue()            
        } 
        if (!categoryTitle.value) {
            categoryTitle.onBlur()
        }        
    }

    return (
            <>
            <AddIcon w={8} 
                     h={8}
                     mr={2}                     
                     onClick={onOpen}
            />

            <Modal
                size='xs'
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                {overlay}
                <ModalContent>
                <ModalHeader>Добавить привычку</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>Привычка</FormLabel>
                    <Input ref={initialRef} 
                           placeholder='Введите название'
                           value={habbitTitle.value}
                           onChange={(e) => habbitTitle.onChange(e)}
                           isInvalid={habbitTitle.isInvalid}
                           errorBorderColor={habbitTitle.errorBorderColor}
                           onBlur={habbitTitle.onBlur}
                    />
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Категория</FormLabel>
                    
                    <Select placeholder='Выберите категорию'
                            value={categoryTitle.value}                            
                            isInvalid={categoryTitle.isInvalid}
                            errorBorderColor={categoryTitle.errorBorderColor}                            
                            onBlur={categoryTitle.onBlur}
                            onChange={(e) => categoryTitle.onChange(e)}
                    >
                        {categories.data.map((category) => {
                            return <option key={category.id} 
                                           value={category.file}
                                    >
                                        {category.title}
                                    </option>
                        })

                        }
                    </Select>

                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleAddHabbit}>
                    Добавить
                    </Button>
                    <Button onClick={onClose}>Отмена</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

            </> 

    )
}

export default AddHabbit