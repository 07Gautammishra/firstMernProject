import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product'

const ProductCard = ({ product }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")
    const toast = useToast()
    const { deleteProduct, updateProductDetail } = useProductStore()
    const [update, setUpdate]= useState(product)

    const handleDelete = async (id) => {
        const { success, message } = await deleteProduct(id)
        if (!success) {
            toast({
                title: "Error",
                status: "error",
                description: message,
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Delete",
                status: "success",
                description: message,
                duration: 3000,
                isClosable: true,
            })
        }
    }
    const handleUpdate= async(updateItem,id)=>{
        console.log(id);
        const { success, message } =  await updateProductDetail(updateItem,id)
        if (!success) {
            toast({
                title: "Error",
                status: "error",
                description: message,
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                status: "success",
                description: message,
                duration: 3000,
                isClosable: true,
            })
        }
        onClose()
    }
    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit={"cover"} />
            <Box p={4}>
                <Heading as={'h3'} size={"md"} mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                    ₹{product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(product._id)} colorScheme='red' />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={update.name}
                                onChange={(e)=>setUpdate({...update, name:  e.target.value})}
                                />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={update.price}
                                onChange={(e)=>setUpdate({...update, price:  e.target.value})}
                                />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={update.image}
                                onChange={(e)=>setUpdate({...update, image: e.target.value})}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={()=>handleUpdate(update, product._id)}>
                            Update
                        </Button>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard
