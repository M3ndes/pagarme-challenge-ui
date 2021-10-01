import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../services/book.service';
import { BookAddComponent } from '../book-add/book-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [BookService]
})

export class BookListComponent implements OnInit {
  name!: string;
  book!: any;
  displayedColumns: string[] = ['id', 'name', 'borrowed', 'contact_id', 'actions'];
  dataSource: any[] = [];
  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const book = await this.bookService.all();
    this.dataSource.push(book);
    this.dataSource = [...this.dataSource];
  }

  async deleteBook(id: any): Promise<void> {
    await this.bookService.delete(id);
    this.reload('/book');
  }

  bookAdd(book: any): void {
    if (book == null) {
      book = {
        name: ''
      }
    }
    const dialogRef = this.dialog.open(BookAddComponent, {
      width: '250px',
      data: { book }
    });
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
}