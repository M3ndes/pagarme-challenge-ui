import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../services/contact.service';
import { ComponentDialogComponent } from '../shared/component-dialog/component-dialog.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})
export class ContactListComponent implements OnInit {

  animal!: string;
  name!: string;
  contact!: any;
  displayedColumns: string[] = ['id', 'name', 'phone'];
  dataSource: any[] = [];
  constructor(
    public dialog: MatDialog,
    private ContactService: ContactService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getcontacts();
  }

  async getcontacts(): Promise<any> {
    const contact = await this.ContactService.all();
    console.log(contact);
    this.dataSource.push(contact);
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
