// src/services/spacexApi.ts
import axios from 'axios';
import type { Launch, Payload, Launchpad } from '../types/launch';

const BASE_URL = 'https://api.spacexdata.com/v5';

export const spacexApi = {
  async getNextLaunch(): Promise<Launch> {
    const response = await axios.get(`${BASE_URL}/launches/next`);
    return response.data;
  },

  async getLatestLaunches(limit: number = 10, success?: boolean): Promise<Launch[]> {
    const query = {
      query: success !== undefined ? { success } : {},
      options: {
        limit,
        sort: {
          date_unix: -1
        }
      }
    };

    const response = await axios.post(`${BASE_URL}/launches/query`, query);
    return response.data.docs;
  },

  async getLaunchpad(id: string): Promise<Launchpad> {
    const response = await axios.get(`${BASE_URL}/launchpads/${id}`);
    return response.data;
  },

  async getPayloads(ids: string[]): Promise<Payload[]> {
    const promises = ids.map(id => 
      axios.get(`${BASE_URL}/payloads/${id}`).then(res => res.data)
    );
    return Promise.all(promises);
  }
};