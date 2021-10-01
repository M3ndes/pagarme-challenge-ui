import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IDvd } from '../models/dvd.model';

@Injectable()
export class DvdService {
  apiUrl = 'http://localhost:8080/dvd';
  constructor(private http: HttpClient) { }

  async all(): Promise<IDvd> {
    const response: IDvd = await this.http.get<IDvd>(this.apiUrl).toPromise();
    return response;
  }

  async create(payload: any): Promise<IDvd> {
    const response: IDvd = await this.http.post<IDvd>(this.apiUrl, payload).toPromise();
    return response;
  }

  async update(body: any, id: number): Promise<IDvd> {
    const response: IDvd = await this.http.put<IDvd>(`${this.apiUrl}/${id}`, body).toPromise();
    return response;
  }

  async delete(id: any): Promise<IDvd> {
    const response: IDvd = await this.http.delete<IDvd>(`${this.apiUrl}/${id}`).toPromise();
    return response;
  }
}
