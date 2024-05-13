import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import ServiceItemModal from '../ServiceItemModal/ServiceItemModal';
import serviceStore, { ServiceData } from '../../stores/Services';
import { observer } from 'mobx-react-lite';
import nodeStore from '../../stores/Nodes';

const ServicesTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { services, nodeId } = serviceStore;
  const { clusterId } = nodeStore;
  const [currentService, setCurrentService] = useState<ServiceData | null>(
    null
  );
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const handleOpenModal = (service: ServiceData) => {
    setCurrentService(service);
    onOpen();
  };

  useEffect(() => {
    setSelectedServices([]);
  }, [nodeId]);

  const handleSelectAll = () => {
    setSelectedServices(services.map((service) => service.id));
  };

  const handleStartSelected = async () => {
    for (const serviceId of selectedServices) {
      clusterId && (await serviceStore.start(clusterId, serviceId));
    }
  };

  const handleStopSelected = async () => {
    for (const serviceId of selectedServices) {
      clusterId && (await serviceStore.stop(clusterId, serviceId));
    }
  };
  const handleNodeSelect = (nodeId: number) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.includes(nodeId)) {
        return prevSelected.filter((id) => id !== nodeId);
      } else {
        return [...prevSelected, nodeId];
      }
    });
  };
  return (
    <>
      {services.length !== 0 && (
        <Table marginBottom={'20px'} variant="simple" size={'md'}>
          <Thead>
            <Tr>
              <Th>
                <Checkbox onChange={handleSelectAll} />
              </Th>
              <Th>Название</Th>
              <Th>Ссылка</Th>
              <Th>Версия</Th>
              <Th>Статус</Th>
            </Tr>
          </Thead>
          <Tbody>
            {services.map((service) => (
              <React.Fragment>
                <Tr>
                  <Td>
                    <Checkbox
                      isChecked={selectedServices.includes(service.id)}
                      onChange={() => handleNodeSelect(service.id)}
                    />
                  </Td>
                  <Td onClick={() => handleOpenModal(service)}>
                    {service.name}
                  </Td>
                  <Td>{service.url}</Td>
                  <Td>{service.version}</Td>

                  <Td>
                    <Flex gap={'9px'}>
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
                    </Flex>
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      )}

      <Button
        colorScheme="red"
        mr={3}
        onClick={handleStopSelected}
        disabled={selectedServices.length === 0}
      >
        STOP
      </Button>
      <Button
        colorScheme="green"
        onClick={handleStartSelected}
        disabled={selectedServices.length === 0}
      >
        START
      </Button>
      {currentService && (
        <ServiceItemModal
          isOpen={isOpen}
          onClose={onClose}
          service={currentService}
        />
      )}
    </>
  );
};

export default observer(ServicesTable);
