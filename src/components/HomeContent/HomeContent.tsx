import React, { useEffect } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import CustomMenu from '../CustomMenu/CustomMenu';
import HomeTable from '../HomeTable/HomeTable';
import clusterStore from '../../stores/Clusters';
import { observer } from 'mobx-react-lite';

const HomeContent = () => {
  useEffect(() => {
    clusterStore.getData();
  }, []);

  return (
    <Container maxW={'1470px'}>
      <Flex justifyContent={'space-between'} gap={'40px'}>
        <CustomMenu />
        <HomeTable />
      </Flex>
    </Container>
  );
};

export default observer(HomeContent);
