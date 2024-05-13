import React from 'react';
import {Container} from "@chakra-ui/react";
import Layout from "../Layout/Layout";
import HomeContent from "../HomeContent/HomeContent";

const HomePage = () => {
    return (
       <Layout>
           <HomeContent/>
       </Layout>
    );
};

export default HomePage;