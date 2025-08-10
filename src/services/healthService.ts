import apiClient from '../config/api';
import { HealthCheckResponse } from '../types/apiTypes';

export class HealthService {
  public static async getHealthCheck(): Promise<HealthCheckResponse> {
    const response = await apiClient.get<HealthCheckResponse>('/health');
    return response.data!;
  }

  public static async ping(): Promise<{ message: string }> {
    const response = await apiClient.get<{ message: string }>('/health/ping');
    return response.data!;
  }
}