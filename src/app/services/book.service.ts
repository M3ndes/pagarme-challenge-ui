import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IBook } from '../models/book.model';
import { IPaginationResponse } from "../models/pagination.model";
import { environment } from 'src/environments/environment';

const PATH = 'book';

@Injectable()
export class BookService{

    constructor(private http: HttpClient){}

    async all(): Promise<IPaginationResponse<IBook>> {
        return await this.http.get<IPaginationResponse<IBook >>(`${environment.API_URL}/${PATH}`).toPromise();
      }

      async create(payload: any): Promise<IBook> {
        const response: IBook = await this.http.post<IBook>(`${environment.API_URL}/${PATH}`, payload).toPromise();
        return response;
      }

      async update(body: any, id: number): Promise<IBook> {
        const response: IBook = await this.http.put<IBook>(`${environment.API_URL}/${PATH}/${id}`, body).toPromise();
        return response;
      }

      async delete(id: any): Promise<IBook> {
        const response: IBook = await this.http.delete<IBook>(`${environment.API_URL}/${PATH}/${id}`).toPromise();
        return response;
      }
}
