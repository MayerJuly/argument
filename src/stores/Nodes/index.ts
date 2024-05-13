import { makeAutoObservable } from 'mobx';

import $api from '../../api/api';
import { ServiceData } from '../Services';

export interface NodeData {
  Id: number;
  hostname: string;

  ip: string;
}

class NodeStore {
  nodes: NodeData[] = [];
  clusterId: null | number = null;
  constructor() {
    makeAutoObservable(this);
  }

  getData = async (clusterId: number) => {
    try {
      const response = await $api.get<NodeData[]>(`/node/${clusterId}/`);
      this.clusterId = clusterId;
      this.nodes = response.data;
    } catch (error) {
      console.error('Node fetch failed:', error);
    }
  };

  start = async (clusterId: number, nodeId: number) => {
    try {
      await $api.get<ServiceData[]>(`/start/${clusterId}/${nodeId}`);
    } catch (error) {
      console.error('Node start failed:', error);
    }
  };
  stop = async (clusterId: number, nodeId: number) => {
    try {
      await $api.get<ServiceData[]>(`/stop/${clusterId}/${nodeId}`);
    } catch (error) {
      console.error('Node stop failed:', error);
    }
  };
}

const nodeStore = new NodeStore();

export default nodeStore;
