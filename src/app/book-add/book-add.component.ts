import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { ContactService } from '../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
  providers: [BookService, ContactService]
})
export class BookAddComponent implements OnInit {
  contacts: any[] = [];
  slide = false;
  contact_id = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BookAddComponent>,
    private bookService: BookService,
    private contactService: ContactService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const contacts = await this.contactService.all();
    this.contacts.push(contacts);
    this.contacts = [...this.contacts];
  }

  async saveBook(data: any): Promise<void> {
    if (!data.book.name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um nome para o livro.'
      });
      return;
    }
    if (this.slide == true && !this.contact_id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um contato em caso de empréstimo.'
      });
      return;
    }

    const payload = { name: data.book.name, borrowed: this.isChecked(), contact_id: this.contact_id };
    await this.bookService.create(payload);

    this.dialogRef.close();
    this.reload('/book');
  }

  async editBook(data: any): Promise<void> {
    if (!data.book.name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um nome para o livro.'
      });
      return;
    }
    if (this.slide == true && !this.contact_id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um contato em caso de empréstimo.'
      });
      return;
    }
    const body = { name: data.book.name, borrowed: this.isChecked(), contact_id: this.contact_id };
    await this.bookService.update(body, data.book.id);
    this.dialogRef.close();
    this.reload('/book');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  slideChange(data: any): void {
    this.slide = data.checked;
    if (this.slide == false) {
      this.contact_id = 0;
    }
  }

  isChecked(): boolean {
    return this.slide;
  }

  changeContact(value: any): void {
    this.isChecked() ? this.contact_id = value : this.contact_id = 0;
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
}
