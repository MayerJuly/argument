import $api from '../api/api';
import { ServiceData } from './Services';

export abstract class BaseStore<T, K> {
  data: T[] = [];
  url: string;
  activeElement: number | null = null;
  constructor(url: string) {
    this.url = url;
  }

  fetchData = async (...parentIds: number[]): Promise<K[] | undefined> => {
    try {
      const response = await $api.get<K[]>(
        `${this.url}${parentIds.map((id) => `/${id}`).join('')}` +
          `${parentIds.length <= 1 ? '/' : ''}`
      );
      return response.data;
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };

  abstract setData: (response: K[], parentId?: number) => Promise<void>;

  getData = async (...parentIds: number[]) => {
    const data = await this.fetchData(...parentIds);
    if (data) {
      await this.setData(data, parentIds[parentIds.length - 1]);
    }
  };

  setActive(elemId: number | null) {
    this.activeElement = elemId;
  }

  abstract start: (
    ...parentIds: number[]
  ) => Promise<ServiceData[] | undefined> | Promise<void>;

  abstract stop: (
    ...parentIds: number[]
  ) => Promise<ServiceData[] | undefined | void> | Promise<void>;
}
