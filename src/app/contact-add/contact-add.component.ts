import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import Swal from 'sweetalert2';

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
    if (!data.contact.name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um nome para o contato.'
      });
      return;
    }
    if (!data.contact.phone) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um telefone para o contato.'
      });
      return;
    }

    const payload = { name: data.contact.name, phone: data.contact.phone };
    await this.contactService.create(payload);
    this.dialogRef.close();
    this.reload('/contact');
  }

  async editContact(data: any): Promise<void> {
    if (!data.contact.name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um nome para o contato.'
      });
      return;
    }

    if (!data.contact.phone) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um telefone para o contato.'
      });
      return;
    }

    const body = { name: data.contact.name, phone: data.contact.phone };
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
