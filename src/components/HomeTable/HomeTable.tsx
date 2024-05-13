import React from 'react';
import {
    Button,
    Checkbox,
    Flex, Tab,
    Table, TableCaption, TabList, TabPanel, TabPanels, Tabs,
    Tbody,
    Td, Tfoot,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import ServicesTable from "../ServicesTable/ServicesTable";
import NodesTable from "../NodesTable/NodesTable";

const HomeTable = () => {
    return (
        <>
                <Tabs width={'100%'}>
                    <TabList width={'100%'} border={0}>
                        <Tab>Ноды</Tab>

                        <Tab ml={'auto'} >Сервисы</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <NodesTable/>
                        </TabPanel>
                        <TabPanel>
                            <ServicesTable/>
                        </TabPanel>

                    </TabPanels>
                </Tabs>


        </>
    );
};

export default HomeTable;