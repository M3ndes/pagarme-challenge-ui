import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ICd } from '../models/cd.model';

@Injectable()
export class CdService{
    apiUrl = 'http://localhost:8080/cd';
    constructor(private http: HttpClient){}

    async all(): Promise<ICd> {
        const response: ICd = await this.http.get<ICd>(this.apiUrl).toPromise();
        return response;
      }

      async create(payload: any): Promise<ICd> {
        const response: ICd = await this.http.post<ICd>(this.apiUrl, payload).toPromise();
        return response;
      }

      async update(body: any, id: number): Promise<ICd> {
        const response: ICd = await this.http.put<ICd>(`${this.apiUrl}/${id}`, body).toPromise();
        return response;
      }

      async delete(id: any): Promise<ICd> {
        const response: ICd = await this.http.delete<ICd>(`${this.apiUrl}/${id}`).toPromise();
        return response;
      }
}
