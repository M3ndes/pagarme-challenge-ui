import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IBook } from '../models/book.model';

@Injectable()
export class BookService{
    apiUrl = 'http://localhost:8080/book';
    constructor(private http: HttpClient){}

    async all(): Promise<IBook> {
        const response: IBook = await this.http.get<IBook>(this.apiUrl).toPromise();
        return response;
      }
}
