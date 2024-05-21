import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ServicesTable from '../ServicesTable/ServicesTable';
import NodesTable from '../NodesTable/NodesTable';

import { observer } from 'mobx-react-lite';
import clusterStore from '../../stores/Clusters';

import nodeStore from '../../stores/Nodes';
import { useEffect, useState } from 'react';

const HomeTable = () => {
  const { activeElement: clusterId } = clusterStore;
  const { activeElement: nodeId } = nodeStore;
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (nodeId) {
      setTabIndex(1);
    } else {
      setTabIndex(0);
    }
  }, [nodeId]);

  return (
    <>
      {clusterId && (
        <Tabs index={tabIndex} width={'100%'}>
          <TabList
            onClick={() => nodeStore.setActive(null)}
            width={'100%'}
            border={0}
          >
            <Tab isDisabled={!Boolean(clusterId)}>Ноды</Tab>
            {nodeId && <Tab>Сервисы</Tab>}
          </TabList>

          <TabPanels>
            <TabPanel>
              <NodesTable />
            </TabPanel>
            <TabPanel>
              <ServicesTable />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
};

export default observer(HomeTable);
