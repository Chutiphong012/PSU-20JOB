import { apiService } from './api';
import { Announcement, ApiResponse, Pagination } from '@/types';

interface AnnouncementListResponse {
  items: Announcement[];
  pagination: Pagination;
}

class AnnouncementService {
  private endpoint = '/announcements';

  async getAll(page: number = 1, limit: number = 10): Promise<ApiResponse<AnnouncementListResponse>> {
    return apiService.get<AnnouncementListResponse>(this.endpoint, {
      page: String(page),
      limit: String(limit),
    });
  }

  async getById(id: string): Promise<ApiResponse<Announcement>> {
    return apiService.get<Announcement>(`${this.endpoint}/${id}`);
  }

  async getLatest(limit: number = 5): Promise<ApiResponse<Announcement[]>> {
    return apiService.get<Announcement[]>(`${this.endpoint}/latest`, {
      limit: String(limit),
    });
  }

  async getImportant(): Promise<ApiResponse<Announcement[]>> {
    return apiService.get<Announcement[]>(`${this.endpoint}/important`);
  }
}

export const announcementService = new AnnouncementService();
export default AnnouncementService;
