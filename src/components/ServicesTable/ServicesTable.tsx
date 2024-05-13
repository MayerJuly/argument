import React from 'react';
import {Button, Checkbox, Flex, Table, Tbody, Td, Th, Thead, Tr, useDisclosure} from "@chakra-ui/react";
import ServiceItemModal from "../ServiceItemModal/ServiceItemModal";

const ServicesTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Table variant="simple" size={'md'}>
                <Thead>
                    <Tr >
                        <Th>
                            <Checkbox
                                onChange={(e) => {

                                }}
                            />
                        </Th>
                        <Th>Название</Th>
                        <Th>Ссылка</Th>
                        <Th>Версия</Th>
                        <Th>Статус</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {/*{hosts.map((host, index) => (*/}
                    <React.Fragment >
                        <Tr>
                            <Td>
                                <Checkbox
                                />
                            </Td>
                            <Td onClick={onOpen}>hostname</Td>
                            <Td>hostIp</Td>
                            <Td>1.0.1</Td>

                            <Td>
                                <Flex gap={'9px'}>
                                    <Button border={'1px solid var(--chakra-colors-red-600)'} color={'var(--chakra-colors-red-500)'} bg={'#fff'} px={'8px'} py={'2px'} fontSize={'14px'} _hover={{bg:'#fff'}}>
                                        ETL
                                    </Button>
                                    <Button border={'1px solid var(--chakra-colors-green-500)'} color={'var(--chakra-colors-green-600)'} bg={'#fff'} px={'8px'} py={'2px'} fontSize={'14px'} _hover={{bg:'#fff'}}>
                                        DATABASE
                                    </Button>
                                </Flex>
                            </Td>
                        </Tr>

                    </React.Fragment>
                    {/*))}*/}
                </Tbody>
            </Table>

            <ServiceItemModal isOpen={isOpen} onClose={onClose}/>
        </>

    );
};

export default ServicesTable;