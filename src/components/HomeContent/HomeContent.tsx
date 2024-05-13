import React from 'react';
import {Container, Flex} from "@chakra-ui/react";
import CustomMenu from "../CustomMenu/CustomMenu";
import HomeTable from "../HomeTable/HomeTable";



const HomeContent = () => {
    return (
        <Container maxW={'1470px'}>
           <Flex justifyContent={'space-between'} gap={'40px'}>
               <CustomMenu/>
               <HomeTable/>

           </Flex>

            
        </Container>
    );
};

export default HomeContent;