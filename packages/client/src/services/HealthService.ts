import { AxiosInstance } from "axios";
import { HealthLog } from "../types/HealthLog";

export class HealthService {
  constructor(private api: AxiosInstance) {}

  async listHealthLogs(): Promise<HealthLog[]> {
    const response = await this.api.get<{ data: HealthLog[] }>("/logs");
    return response.data.data;
  }

  async createHealthLog(data: Omit<HealthLog, 'id' | 'createdAt' | 'userId'>): Promise<HealthLog> {
    const response = await this.api.post<HealthLog>("/logs", data);
    return response.data;
  }
}
