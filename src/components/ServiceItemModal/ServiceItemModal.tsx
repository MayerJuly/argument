import React from 'react';
import {
  Button,
  Flex,
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

interface ServiceItemModalI {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceData;
}

const ServiceItemModal = ({ isOpen, onClose, service }: ServiceItemModalI) => {
  const { clusterId } = nodeStore;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>service:{service.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection={'column'} gap={'10px'}>
            <Button
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

            <div>{service.url}</div>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              clusterId && serviceStore.stop(clusterId, service.id);
            }}
          >
            STOP
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              clusterId && serviceStore.start(clusterId, service.id);
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
