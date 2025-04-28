import { InjectionToken } from '@angular/core';

// Định nghĩa interface ApiConfig chứa các URL
export interface ApiConfig {
  dishUrl: string;
  categoryUrl: string;
}

// Tạo InjectionToken với tên 'api.config'
export const API_CONFIG = new InjectionToken<ApiConfig>('api.config');
