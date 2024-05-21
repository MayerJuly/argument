import { action, makeObservable, observable } from 'mobx';

import { BaseStore } from '../baseClass';
import $api from '../../api/api';

export interface ServiceData {
  id: number;
  name: string;
  state: 'STOPPED' | 'STARTED';
  url: string;
  version: string;
  description: string;
}
export interface ServicesI {
  services: ServiceData[];
  parentId: number;
}

class ServiceStore extends BaseStore<ServicesI, ServiceData> {
  constructor() {
    super('/service');
    makeObservable(this, {
      data: observable,
      activeElement: observable,
      setData: action,
      setActive: action,
      start: action,
      stop: action,
      changeState: action,
    });
  }

  setData = async (response: ServiceData[], parentId?: number) => {
    if (parentId === undefined) {
      throw new Error('parentId is required for ServiceStore');
    }

    const existingIndex = this.data.findIndex(
      (elem) => elem.parentId === parentId
    );

    if (existingIndex > -1) {
      this.data[existingIndex].services = response;
    } else {
      this.data.push({ services: response, parentId });
    }
    this.data = [...this.data];
  };

  start = async (clusterId: number, nodeId: number, serviceId: number) => {
    try {
      await $api.get<ServiceData[]>(
        `/start/${clusterId}/${nodeId}/${serviceId}`
      );
      this.changeState('STARTED', serviceId, nodeId);
    } catch (error) {
      console.error('Service start failed:', error);
    }
  };

  getServices = (parentId: number) => {
    return this.data.find((elem) => elem.parentId === parentId);
  };
  stop = async (clusterId: number, nodeId: number, serviceId: number) => {
    try {
      await $api.get<ServiceData[]>(
        `/stop/${clusterId}/${nodeId}/${serviceId}`
      );
      this.changeState('STOPPED', serviceId, nodeId);
    } catch (error) {
      console.error('Service stop failed:', error);
    }
  };

  changeState = (
    state: 'STOPPED' | 'STARTED',
    serviceId: number,
    nodeId: number
  ) => {
    const currentNode = this.data.find((elem) => elem.parentId === nodeId);
    const currentService = currentNode?.services.find(
      (elem) => elem.id === serviceId
    );
    if (currentService) {
      currentService.state = state;
    }
  };
}

const serviceStore = new ServiceStore();

export default serviceStore;
