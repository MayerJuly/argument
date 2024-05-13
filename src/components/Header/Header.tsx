import { Box, Container, Flex, Text } from '@chakra-ui/react';
import nodeStore from '../../stores/Nodes';
import { observer } from 'mobx-react-lite';
import serviceStore from '../../stores/Services';

const Header = () => {
  const { clusterId, nodes } = nodeStore;
  const { nodeId, isOpen } = serviceStore;
  const currentNode = nodes.find((elem) => elem.Id === nodeId);
  return (
    <Container maxW={'1470px'} mb={'100px'}>
      <Box w={'100%'}>
        <Flex alignItems={'center'} gap={'15px'}>
          <img src="/Logo.png" alt="logo" />
          <Text fontSize={32} fontWeight={200}>
            ARGUMENT console{' '}
            {currentNode && isOpen
              ? '-' + currentNode.hostname
              : clusterId && '- Nodes'}
          </Text>
        </Flex>
      </Box>
    </Container>
  );
};

export default observer(Header);
