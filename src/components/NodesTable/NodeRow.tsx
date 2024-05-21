import { Button, Checkbox, Flex, Td, Tr } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import nodeStore, { NodeData } from '../../stores/Nodes';
import serviceStore, { ServiceData } from '../../stores/Services';
import { useEffect, useState } from 'react';
import clusterStore from '../../stores/Clusters';

interface NodeRowI {
  node: NodeData;
  selectedNodes: number[];
  handleNodeSelect: (nodeId: number) => void;
}

const NodeRow: React.FC<NodeRowI> = ({
  node,
  selectedNodes,
  handleNodeSelect,
}) => {
  const { activeElement: clusterId } = clusterStore;
  const { data } = serviceStore;
  const [services, setServices] = useState<ServiceData[]>([]);
  useEffect(() => {
    clusterId && serviceStore.getData(clusterId, node.Id);
  }, [clusterId, node.Id]);

  useEffect(() => {
    const data = serviceStore.getServices(node.Id);
    setServices(data ? data.services : []);
  }, [data, node.Id]);

  return (
    <Tr minH={'80px'}>
      <Td>
        <Checkbox
          isChecked={selectedNodes.includes(node.Id)}
          onChange={() => handleNodeSelect(node.Id)}
        />
      </Td>
      <Td
        cursor={'pointer'}
        _hover={{ bg: '#E0F9FE' }}
        onClick={() => {
          nodeStore.setActive(node.Id);
        }}
      >
        {node.hostname}
      </Td>
      <Td>{node.ip}</Td>
      <Td>
        <Flex gap={'9px'} w={'400px'} flexWrap={'wrap'}>
          {services.map((service) => (
            <Button
              key={service.id}
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
              {service.name}
            </Button>
          ))}
        </Flex>
      </Td>
    </Tr>
  );
};
export default observer(NodeRow);
