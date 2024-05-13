import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ServicesTable from '../ServicesTable/ServicesTable';
import NodesTable from '../NodesTable/NodesTable';
import nodeStore from '../../stores/Nodes';
import { observer } from 'mobx-react-lite';
import serviceStore from '../../stores/Services';

const HomeTable = () => {
  const [isServiceDisabled, setIsServiceDisabled] = useState<boolean>(true);
  const { clusterId } = nodeStore;

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  useEffect(() => {
    setTabIndex(0);
  }, [clusterId]);
  useEffect(() => {
    serviceStore.isOpen = Boolean(tabIndex);
  }, [tabIndex]);

  return (
    <>
      {clusterId && (
        <Tabs index={tabIndex} onChange={handleTabsChange} width={'100%'}>
          <TabList width={'100%'} border={0}>
            <Tab isDisabled={!Boolean(clusterId)}>Ноды</Tab>

            <Tab isDisabled={isServiceDisabled} ml={'auto'}>
              Сервисы
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <NodesTable
                setDisabled={setIsServiceDisabled}
                setTabIndex={setTabIndex}
              />
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
