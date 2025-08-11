export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  displayName: string;
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  version: string;
  environment: string;
  database: {
    connected: boolean;
    latency?: number;
  };
  uptime: number;
}