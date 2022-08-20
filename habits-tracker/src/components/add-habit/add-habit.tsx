import React from "react";
import { PlusSquareIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";

import habits from "../../store/habits";
import categories from "../../store/categories";
import { useInput } from "../../hooks";
import { useNavigate } from "react-router-dom";

const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

type Props = {
    children?: React.ReactNode | React.ReactNode[] | JSX.Element
    title?: string
    category?: string
};

const addIconChild = <PlusSquareIcon w={8} 
                                     h={8}
                                     ml={2}                                                 
                     />

const AddHabit: React.FC<Props> = ({children, title="", category=""}) => {   
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ overlay ] = React.useState(<OverlayOne />)
    const habitTitle = useInput(title, "notNullText")
    const categoryTitle = useInput(category, "notNullText")

    const navigate = useNavigate()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    

    const handleAddHabit: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (!habitTitle.isInvalid && categoryTitle.value ) {
            habits.addHabit({id: habits.data.length, 
                title: habitTitle.value, 
                category: categoryTitle.value, 
                tracker: {}})
            onClose()
            habitTitle.clearValue()
            categoryTitle.clearValue()            
        } 
        if (!categoryTitle.value) {
            categoryTitle.onBlur()
        } 
        if (children) navigate("/")
    }

    return (
            <>
            {   children ? (
                <div onClick={onOpen}>
                    {children}
                </div>
                ) : (
                    <div onClick={onOpen}>
                    {addIconChild}
                </div>                    
                )
            }
            

            <Modal
                size='xs'
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}                
            >
                {overlay}
                <ModalContent mt="10%">
                <ModalHeader>Добавить привычку</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>Привычка</FormLabel>
                    <Input ref={initialRef} 
                           placeholder='Введите название'
                           value={habitTitle.value}
                           onChange={(e) => habitTitle.onChange(e)}
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
                    <Button colorScheme='blue' mr={3} onClick={handleAddHabit}>
                    Добавить
                    </Button>
                    <Button onClick={onClose}>Отмена</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

            </> 

    )
}

export default AddHabit