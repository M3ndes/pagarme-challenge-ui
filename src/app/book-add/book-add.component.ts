import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
  providers: [BookService]
})
export class BookAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BookAddComponent>,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async saveBook(data: any): Promise<void> {
    const payload = new FormData();
    payload.append('name', data.book.name);
    payload.append('borrowed', 'false');
    await this.bookService.create(payload);
    this.dialogRef.close();
    this.reload('/book');
  }

  async editBook(data: any): Promise<void> {
    const body = { name: data.book.name, borrowed: 'false', contact_id: '1' };
    await this.bookService.update(body, data.book.id);
    this.dialogRef.close();
    this.reload('/book');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
}
