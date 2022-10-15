import React from "react";
import { DeleteIcon } from '@chakra-ui/icons'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, 
         ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import habits from "../../store/habits";

const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

const RemoveHabit: React.FC = () => {   
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay] = React.useState(<OverlayOne />)
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const { id = "-1"} = useParams()
    const navigate = useNavigate()

    const handleRemoveHabit: React.MouseEventHandler<HTMLButtonElement> = async () => {
        if (id) await habits.removeHabit(id)
        onClose()
        navigate('/')
    }

    return (
            <>
            <DeleteIcon w={6} 
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
                <ModalHeader>Удалить привычку</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text>
                        Вы действительно хотите удалить привычку "{habits.habitById(id).title}" и все данные по ее отслеживанию?
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleRemoveHabit}>
                    Удалить
                    </Button>
                    <Button onClick={onClose}>Отмена</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

            </> 

    )
}

export default RemoveHabit