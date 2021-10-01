import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../services/contact.service';
import { ContactAddComponent } from '../contact-add/contact-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})

export class ContactListComponent implements OnInit {
  name!: string;
  contact!: any;
  displayedColumns: string[] = ['id', 'name', 'phone', 'actions'];
  dataSource: any[] = [];
  constructor(
    public dialog: MatDialog,
    private contactService: ContactService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const contact = await this.contactService.all();
    console.log(contact);
    this.dataSource.push(contact);
    this.dataSource = [...this.dataSource];
  }

  async deleteContact(id: any): Promise<void> {
    await this.contactService.delete(id);
    this.reload('/contact');
  }

  contactAdd(contact: any): void {
    if (contact == null) {
      contact = {
        name: ''
      }
    }
    const dialogRef = this.dialog.open(ContactAddComponent, {
      width: '250px',
      data: { contact }
    });
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
}
