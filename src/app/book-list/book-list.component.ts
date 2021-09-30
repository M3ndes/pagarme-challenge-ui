import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../services/book.service';
import { ComponentDialogComponent } from '../shared/component-dialog/component-dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [BookService]
})
export class BookListComponent implements OnInit {
  animal!: string;
  name!: string;
  book!: any;
  displayedColumns: string[] = ['id', 'name', 'borrowed', 'contact_id'];
  dataSource: any[] = [];
  constructor(
    public dialog: MatDialog,
    private bookService: BookService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getBooks();
  }

  async getBooks(): Promise<any> {
    const book = await this.bookService.all();
    this.dataSource.push(book);
    this.dataSource = [...this.dataSource];
    return;
  }
  
  openDialog(data: any): void {
    const dialogRef = this.dialog.open(ComponentDialogComponent, {
      width: '250px',
      data: { name: '', animal: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}