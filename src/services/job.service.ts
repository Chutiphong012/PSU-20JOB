import { apiService } from './api';
import { JobItem, ApiResponse, Pagination } from '@/types';

interface JobListResponse {
  items: JobItem[];
  pagination: Pagination;
}

interface JobSearchParams {
  keyword?: string;
  department?: string;
  type?: string;
  page?: number;
  limit?: number;
}

class JobService {
  private endpoint = '/jobs';

  async getAll(page: number = 1, limit: number = 10): Promise<ApiResponse<JobListResponse>> {
    return apiService.get<JobListResponse>(this.endpoint, {
      page: String(page),
      limit: String(limit),
    });
  }

  async getById(id: string): Promise<ApiResponse<JobItem>> {
    return apiService.get<JobItem>(`${this.endpoint}/${id}`);
  }

  async search(params: JobSearchParams): Promise<ApiResponse<JobListResponse>> {
    const queryParams: Record<string, string> = {};

    if (params.keyword) queryParams.keyword = params.keyword;
    if (params.department) queryParams.department = params.department;
    if (params.type) queryParams.type = params.type;
    if (params.page) queryParams.page = String(params.page);
    if (params.limit) queryParams.limit = String(params.limit);

    return apiService.get<JobListResponse>(`${this.endpoint}/search`, queryParams);
  }

  async getLatest(limit: number = 5): Promise<ApiResponse<JobItem[]>> {
    return apiService.get<JobItem[]>(`${this.endpoint}/latest`, {
      limit: String(limit),
    });
  }

  async getByDepartment(department: string): Promise<ApiResponse<JobListResponse>> {
    return apiService.get<JobListResponse>(`${this.endpoint}/department/${department}`);
  }
}

export const jobService = new JobService();
export default JobService;
