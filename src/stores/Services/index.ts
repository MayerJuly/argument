import { makeAutoObservable } from 'mobx';

import $api from '../../api/api';

export interface ServiceData {
  id: number;
  name: string;
  state: 'STOPPED' | 'STARTED';
  url: string;
  version: string;
  description: string;
}

class ServiceStore {
  services: ServiceData[] = [];
  nodeId: number | null = null;
  isOpen = false;
  constructor() {
    makeAutoObservable(this);
  }

  getData = async (nodeId: number, clusterId: number) => {
    try {
      const response = await $api.get<ServiceData[]>(
        `/service/${clusterId}/${nodeId}`
      );
      this.nodeId = nodeId;
      this.services = response.data;
    } catch (error) {
      console.error('Service fetch failed:', error);
    }
  };

  start = async (clusterId: number, serviceId: number) => {
    try {
      await $api.get<ServiceData[]>(
        `/start/${clusterId}/${this.nodeId}/${serviceId}`
      );
      this.changeState(serviceId, 'STARTED');
    } catch (error) {
      console.error('Service start failed:', error);
    }
  };

  stop = async (clusterId: number, serviceId: number) => {
    try {
      await $api.get<ServiceData[]>(
        `/stop/${clusterId}/${this.nodeId}/${serviceId}`
      );
      this.changeState(serviceId, 'STOPPED');
    } catch (error) {
      console.error('Service stop failed:', error);
    }
  };
  private changeState = (serviceId: number, state: 'STOPPED' | 'STARTED') => {
    const currentService = this.services.find((elem) => elem.id === serviceId);
    if (currentService) {
      currentService.state = state;
    }
  };
}

const serviceStore = new ServiceStore();

export default serviceStore;
