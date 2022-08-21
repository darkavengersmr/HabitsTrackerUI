import React from "react";
import { EditIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import habits from "../../store/habits";
import categories from "../../store/categories";
import { useInput } from "../../hooks";
import { useParams } from "react-router-dom";

const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

const EditHabit: React.FC = () => {   
    
    const { id = "-1" } = useParams()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay] = React.useState(<OverlayOne />)
    const habitTitle = useInput(habits.habitById(parseInt(id)).title, "notNullText")
    const categoryTitle = useInput(habits.habitById(parseInt(id)).category, "notNullText")

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const editTitle = () => {
        if (!habitTitle.isInvalid) {
            habits.editHabit(parseInt(id), {title: habitTitle.value, category: categoryTitle.value})
            onClose()                      
        }
    }

    const handleEditHabit: React.MouseEventHandler<HTMLButtonElement> = () => {
        editTitle()
    }

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") editTitle()
    }

    return (
            <>
            <EditIcon w={6} 
                      h={6}
                      ml={2}                     
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
                <ModalContent mt="10%">
                <ModalHeader>Изменить привычку</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>Привычка</FormLabel>
                    <Input ref={initialRef} 
                           placeholder='Введите название'
                           value={habitTitle.value}
                           onChange={(e) => habitTitle.onChange(e)}
                           onKeyPress={onEnter}
                           isInvalid={habitTitle.isInvalid}
                           errorBorderColor={habitTitle.errorBorderColor}
                           onBlur={habitTitle.onBlur}
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
                    <Button colorScheme='blue' mr={3} onClick={handleEditHabit}>
                    Сохранить
                    </Button>
                    <Button onClick={onClose}>Отмена</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

            </> 

    )
}

export default EditHabit