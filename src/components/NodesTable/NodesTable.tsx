import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import nodeStore from '../../stores/Nodes';
import serviceStore from '../../stores/Services';
import { observer } from 'mobx-react-lite';

interface NodesTableProps {
  setDisabled: (arg: boolean) => void;
  setTabIndex: (arg: number) => void;
}

const NodesTable: React.FC<NodesTableProps> = ({
  setDisabled,
  setTabIndex: setIndex,
}) => {
  const { nodes, clusterId } = nodeStore;
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);

  useEffect(() => {
    setSelectedNodes([]);
  }, [clusterId]);

  const handleSelectAll = () => {
    setSelectedNodes(nodes.map((node) => node.Id));
  };

  const handleStartSelected = async () => {
    for (const nodeId of selectedNodes) {
      clusterId && (await nodeStore.start(clusterId, nodeId));
    }
  };

  const handleStopSelected = async () => {
    for (const nodeId of selectedNodes) {
      clusterId && (await nodeStore.stop(clusterId, nodeId));
    }
  };
  const handleNodeSelect = (nodeId: number) => {
    // Выбрать или отменить выбор узла
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
        <Table variant="simple" size={'md'}>
          <Thead>
            <Tr>
              <Th>
                <Checkbox onChange={handleSelectAll} />
              </Th>
              <Th>Имя хоста</Th>
              <Th>IP адрес</Th>
            </Tr>
          </Thead>
          <Tbody>
            {nodes.map((node) => (
              <React.Fragment key={node.Id}>
                <Tr>
                  <Td>
                    <Checkbox
                      isChecked={selectedNodes.includes(node.Id)}
                      onChange={() => handleNodeSelect(node.Id)}
                    />
                  </Td>
                  <Td
                    onClick={() => {
                      console.log(node.Id);

                      clusterId && serviceStore.getData(node.Id, clusterId);
                      setDisabled(false);
                      setIndex(1);
                    }}
                  >
                    {node.hostname}
                  </Td>
                  <Td>{node.ip}</Td>
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
