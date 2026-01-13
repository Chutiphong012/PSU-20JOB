import { apiService } from './api';
import { NewsItem, ApiResponse, Pagination } from '@/types';

interface NewsListResponse {
  items: NewsItem[];
  pagination: Pagination;
}

class NewsService {
  private endpoint = '/news';

  async getAll(page: number = 1, limit: number = 10): Promise<ApiResponse<NewsListResponse>> {
    return apiService.get<NewsListResponse>(this.endpoint, {
      page: String(page),
      limit: String(limit),
    });
  }

  async getById(id: string): Promise<ApiResponse<NewsItem>> {
    return apiService.get<NewsItem>(`${this.endpoint}/${id}`);
  }

  async getBySlug(slug: string): Promise<ApiResponse<NewsItem>> {
    return apiService.get<NewsItem>(`${this.endpoint}/slug/${slug}`);
  }

  async getLatest(limit: number = 5): Promise<ApiResponse<NewsItem[]>> {
    return apiService.get<NewsItem[]>(`${this.endpoint}/latest`, {
      limit: String(limit),
    });
  }

  async getByCategory(category: string, page: number = 1): Promise<ApiResponse<NewsListResponse>> {
    return apiService.get<NewsListResponse>(`${this.endpoint}/category/${category}`, {
      page: String(page),
    });
  }
}

export const newsService = new NewsService();
export default NewsService;
