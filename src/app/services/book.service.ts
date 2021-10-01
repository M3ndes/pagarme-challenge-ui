import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IBook } from '../models/book.model';
import { IPaginationResponse } from "../models/pagination.model";

@Injectable()
export class BookService{
    apiUrl = 'http://localhost:8080/book';
    constructor(private http: HttpClient){}

    async all(): Promise<IPaginationResponse<IBook>> {
        return await this.http.get<IPaginationResponse<IBook >>(this.apiUrl).toPromise();
      }

      async create(payload: any): Promise<IBook> {
        const response: IBook = await this.http.post<IBook>(this.apiUrl, payload).toPromise();
        return response;
      }

      async update(body: any, id: number): Promise<IBook> {
        const response: IBook = await this.http.put<IBook>(`${this.apiUrl}/${id}`, body).toPromise();
        return response;
      }

      async delete(id: any): Promise<IBook> {
        const response: IBook = await this.http.delete<IBook>(`${this.apiUrl}/${id}`).toPromise();
        return response;
      }
}
