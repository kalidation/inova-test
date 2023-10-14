import { IFetchResponse } from "./model";

export class HttClient {
  async get<T>(url: string): Promise<IFetchResponse<T>> {
    try {
      const response: Response = await fetch(url);
      if (response.status === 404) {
        return {
          data: undefined,
          isError: true,
          error: `Not Found`
        };
      } else if (response.status === 500) {
        return {
          data: undefined,
          isError: true,
          error: `Server error`
        };
      } else if (!response.ok) {
        return {
          data: undefined,
          isError: true,
          error: `HTTP error! status: ${response.status}`
        };
      }

      const resData = await response.json();
      return {
        data: resData,
        isError: false,
        error: ""
      };
    } catch (error) {
      throw error;
    }
  }
}
