import React from 'react';
import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import serviceStore, { ServiceData } from '../../stores/Services';
import nodeStore from '../../stores/Nodes';
import { observer } from 'mobx-react-lite';
import clusterStore from '../../stores/Clusters';

interface ServiceItemModalI {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceData;
}

const ServiceItemModal = ({ isOpen, onClose, service }: ServiceItemModalI) => {
  const { activeElement: nodeId } = nodeStore;
  const { activeElement: clusterId } = clusterStore;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>service:{service.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection={'column'} gap={'10px'}>
            <Button
              cursor={'default'}
              border={
                service.state === 'STOPPED'
                  ? '1px solid var(--chakra-colors-red-600)'
                  : '1px solid var(--chakra-colors-green-500)'
              }
              color={
                service.state === 'STOPPED'
                  ? 'var(--chakra-colors-red-500)'
                  : 'var(--chakra-colors-green-600)'
              }
              bg={'#fff'}
              px={'8px'}
              py={'2px'}
              fontSize={'14px'}
              _hover={{ bg: '#fff' }}
            >
              {service.state}
            </Button>

            <Text>{service.description}</Text>

            <Link isExternal _hover={{ bg: '#E0F9FE' }} href={service.url}>
              {service.url}
            </Link>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              if (clusterId && nodeId)
                serviceStore.stop(clusterId, nodeId, service.id);
            }}
          >
            STOP
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              if (clusterId && nodeId)
                serviceStore.start(clusterId, nodeId, service.id);
            }}
          >
            START
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default observer(ServiceItemModal);
