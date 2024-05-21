import { action, makeObservable, observable } from 'mobx';

import $api from '../../api/api';
import { ServiceData } from '../Services';
import { BaseStore } from '../baseClass';

export interface NodeData {
  Id: number;
  hostname: string;
  ip: string;
}
export interface NodeI {
  nodes: NodeData[];
  parentId: number;
}
class NodeStore extends BaseStore<NodeI, NodeData> {
  constructor() {
    super('/node');
    makeObservable(this, {
      data: observable,
      activeElement: observable,
      setData: action,
      setActive: action,
      start: action,
      stop: action,
    });
  }
  getNodes = (parentId: number) => {
    return this.data.find((elem) => elem.parentId === parentId);
  };
  getNode = (parentId: number, id: number) => {
    const nodes = this.getNodes(parentId);
    return nodes?.nodes.find((elem) => elem.Id === id);
  };

  setData = async (response: NodeData[], parentId?: number) => {
    if (parentId === undefined) {
      throw new Error('parentId is required for NodeStore');
    }

    const existingIndex = this.data.findIndex(
      (elem) => elem.parentId === parentId
    );

    if (existingIndex > -1) {
      this.data[existingIndex].nodes = response;
    } else {
      this.data.push({ nodes: response, parentId });
    }
  };

  start = async (clusterId: number, nodeId: number) => {
    try {
      const response = await $api.get<ServiceData[]>(
        `/start/${clusterId}/${nodeId}`
      );
      return response.data;
    } catch (error) {
      console.error('Node start failed:', error);
    }
  };
  stop = async (clusterId: number, nodeId: number) => {
    try {
      const response = await $api.get<ServiceData[]>(
        `/stop/${clusterId}/${nodeId}`
      );
      return response.data;
    } catch (error) {
      console.error('Node stop failed:', error);
    }
  };
}

const nodeStore = new NodeStore();

export default nodeStore;
