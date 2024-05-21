import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import nodeStore, { NodeData } from '../../stores/Nodes';
import serviceStore from '../../stores/Services';
import { observer } from 'mobx-react-lite';
import clusterStore from '../../stores/Clusters';
import NodeRow from './NodeRow';

const NodesTable: React.FC = () => {
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);
  const { activeElement: clusterId } = clusterStore;
  const { data } = nodeStore;
  const [nodes, setNodes] = useState<NodeData[]>([]);

  useEffect(() => {
    setSelectedNodes([]);
    if (!clusterId) return;
    const data = nodeStore.getNodes(clusterId);

    setNodes(data ? data.nodes : []);
  }, [data, clusterId]);

  const handleSelectAll = () => {
    setSelectedNodes(nodes?.map((node) => node.Id));
  };

  const handleStartSelected = async () => {
    if (!clusterId) return;
    for (const nodeId of selectedNodes) {
      const data = await nodeStore.start(clusterId, nodeId);
      if (data) {
        serviceStore.setData(data, nodeId);
      }
    }
  };

  const handleStopSelected = async () => {
    if (!clusterId) return;
    for (const nodeId of selectedNodes) {
      const data = await nodeStore.stop(clusterId, nodeId);
      if (data) {
        serviceStore.setData(data, nodeId);
      }
    }
  };
  const handleNodeSelect = (nodeId: number) => {
    setSelectedNodes((prevSelected) => {
      if (prevSelected.includes(nodeId)) {
        return prevSelected.filter((id) => id !== nodeId);
      } else {
        return [...prevSelected, nodeId];
      }
    });
  };

  return (
    <>
      {nodes.length !== 0 && (
        <Table marginBottom={'20px'} variant="simple" size={'md'}>
          <Thead>
            <Tr>
              <Th>
                <Checkbox onChange={handleSelectAll} />
              </Th>
              <Th>Имя хоста</Th>
              <Th>IP адрес</Th>
              <Th>Сервисы</Th>
            </Tr>
          </Thead>
          <Tbody>
            {nodes.map((node) => (
              <NodeRow
                key={node.Id}
                node={node}
                selectedNodes={selectedNodes}
                handleNodeSelect={handleNodeSelect}
              />
            ))}
          </Tbody>
        </Table>
      )}
      <Button
        colorScheme="red"
        mr={3}
        onClick={handleStopSelected}
        disabled={selectedNodes.length === 0}
      >
        STOP
      </Button>
      <Button
        colorScheme="green"
        onClick={handleStartSelected}
        disabled={selectedNodes.length === 0}
      >
        START
      </Button>
    </>
  );
};

export default observer(NodesTable);
