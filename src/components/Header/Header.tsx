import { Box, Container, Flex, Text } from '@chakra-ui/react';
import nodeStore from '../../stores/Nodes';
import { observer } from 'mobx-react-lite';
import clusterStore from '../../stores/Clusters';

const Header = () => {
  const { activeElement: nodeId } = nodeStore;
  const { activeElement: clusterId } = clusterStore;

  return (
    <Container maxW={'1470px'} mb={'100px'}>
      <Box w={'100%'}>
        <Flex alignItems={'center'} gap={'15px'}>
          <img src="/Logo.png" alt="logo" />
          <Text fontSize={32} fontWeight={200}>
            ARGUMENT console{' '}
            {nodeId && clusterId
              ? '-' + nodeStore.getNode(clusterId, nodeId)?.hostname
              : clusterId
              ? '- Nodes'
              : ''}
          </Text>
        </Flex>
      </Box>
    </Container>
  );
};

export default observer(Header);
