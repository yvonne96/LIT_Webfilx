import { OpaqueToken } from '@angular/core';

export interface AppConfig {
  movieApiUrl: string;
  baseServiceUrl: string;
}

export const WEBFLIX_CONFIG: AppConfig = {
  baseServiceUrl: 'http://localhost:8080',
  movieApiUrl: 'http://localhost:8080/movie'
};

export let APP_CONFIG = new OpaqueToken('app-config');
