import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
  providers: [ContactService]
})
export class ContactAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ContactAddComponent>,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async saveContact(data: any): Promise<void> {
    const payload = new FormData();
    payload.append('name', data.contact.name);
    payload.append('phone', '5599683660');
    await this.contactService.create(payload);
    this.dialogRef.close();
    this.reload('/contact');
  }

  async editContact(data: any): Promise<void> {
    const body = { name: data.contact.name, phone: '5599683660' };
    await this.contactService.update(body, data.contact.id);
    this.dialogRef.close();
    this.reload('/contact');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }

}
