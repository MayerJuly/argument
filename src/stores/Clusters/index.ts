import { makeAutoObservable } from 'mobx';

import $api from '../../api/api';
import { ServiceData } from '../Services';

export interface ClusterData {
  id: number;
  name: string;
}

class ClusterStore {
  clusters: ClusterData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getData = async () => {
    try {
      const response = await $api.get<ClusterData[]>('/cluster/');

      this.clusters = response.data;
    } catch (error) {
      console.error('Cluster fetch failed:', error);
    }
  };
  start = async (clusterId: number) => {
    try {
      await $api.get<ServiceData[]>(`/cluster/start/${clusterId}/`);
    } catch (error) {
      console.error('Cluster start failed:', error);
    }
  };
  stop = async (clusterId: number) => {
    try {
      await $api.get<ServiceData[]>(`/cluster/stop/${clusterId}/`);
    } catch (error) {
      console.error('Cluster stop failed:', error);
    }
  };
}

const clusterStore = new ClusterStore();

export default clusterStore;
