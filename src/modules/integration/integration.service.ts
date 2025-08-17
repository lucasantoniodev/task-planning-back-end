import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class IntegrationService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(
    url: string,
    config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<T, any>> {
    const response$ = this.httpService.get<T>(url, config);
    return lastValueFrom(response$);
  }

  async post<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<T, any>> {
    const response$ = this.httpService.post<T>(url, body, config);
    return lastValueFrom(response$);
  }

  async put<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<T, any>> {
    const response$ = this.httpService.put<T>(url, body, config);
    return lastValueFrom(response$);
  }

  async patch<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<T, any>> {
    const response$ = this.httpService.patch<T>(url, body, config);
    return lastValueFrom(response$);
  }

  async delete<T>(url: string, config?: any): Promise<AxiosResponse<T, any>> {
    const response$ = this.httpService.delete<T>(url, config);
    return lastValueFrom(response$);
  }
}
