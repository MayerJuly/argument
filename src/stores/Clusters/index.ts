import { action, makeObservable, observable } from 'mobx';

import $api from '../../api/api';
import { ServiceData } from '../Services';
import { BaseStore } from '../baseClass';

export interface ClusterData {
  id: number;
  name: string;
}

class ClusterStore extends BaseStore<ClusterData, ClusterData> {
  constructor() {
    super('/cluster');
    makeObservable(this, {
      data: observable,
      activeElement: observable,
      setData: action,
      setActive: action,
      start: action,
      stop: action,
    });
  }

  setData = async (response: ClusterData[]) => {
    this.data = response;
  };

  start = async (clusterId: number) => {
    try {
      const response = await $api.get<ServiceData[]>(
        `/cluster/start/${clusterId}/`
      );
      return response.data;
    } catch (error) {
      console.error('Cluster start failed:', error);
    }
  };
  stop = async (clusterId: number) => {
    try {
      const response = await $api.get<ServiceData[]>(
        `/cluster/stop/${clusterId}/`
      );
      return response.data;
    } catch (error) {
      console.error('Cluster stop failed:', error);
    }
  };
}

const clusterStore = new ClusterStore();

export default clusterStore;
