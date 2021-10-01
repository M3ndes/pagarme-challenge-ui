import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../services/book.service';
import { BookAddComponent } from '../book-add/book-add.component';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [BookService, ContactService]
})

export class BookListComponent implements OnInit {
  name!: string;
  book!: any;
  displayedColumns: string[] = ['id', 'name', 'borrowed', 'contact', 'actions'];
  dataSource: any[] = [];
  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private contactService: ContactService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const book = await this.bookService.all();
    this.getNames(book);
    this.dataSource.push(book);
    this.dataSource = [...this.dataSource];
  }

  async deleteBook(id: any): Promise<void> {
    const result = await Swal.fire({
      title: 'Atenção!',
      text: 'Você tem certeza que deseja deletar esse registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar'
    });

    if (result.isConfirmed) {
      await this.bookService.delete(id);
      this.reload('/book');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'registro deletado com sucesso.'
      });
    }
  }

  async getNames(book: any): Promise<void> {
    if (book) {
      for (let i = 0; i < book.length; i++) {
        if (book[i].contact_id) {
          const contact = await this.contactService.find(book[i].contact_id);
          book[i].contact_id = contact.name;
        } else {
          book[i].contact_id = '';
        }
      }
    }
    return;
  }

  bookAdd(book: any): void {
    if (book == null) {
      book = {
        name: ''
      }
    }
    const dialogRef = this.dialog.open(BookAddComponent, {
      width: '300px',
      data: { book }
    });
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
}