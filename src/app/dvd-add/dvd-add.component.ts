import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DvdService } from '../services/dvd.service';
import { ContactService } from '../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dvd-add',
  templateUrl: './dvd-add.component.html',
  styleUrls: ['./dvd-add.component.css'],
  providers: [DvdService, ContactService]
})
export class DvdAddComponent implements OnInit {
  contacts: any[] = [];
  slide = false;
  contact_id = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DvdAddComponent>,
    private dvdService: DvdService,
    private contactService: ContactService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const contacts = await this.contactService.all();
    this.contacts.push(contacts);
    this.contacts = [...this.contacts];
  }

  async saveDvd(data: any): Promise<void> {
    if (!data.dvd.name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um nome para o dvd.'
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

    const payload = { name: data.dvd.name, borrowed: this.isChecked(), contact_id: this.contact_id };
    await this.dvdService.create(payload);
    this.dialogRef.close();
    this.reload('/dvd');
  }

  async editDvd(data: any): Promise<void> {
    if (!data.dvd.name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um nome para o dvd.'
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
    const body = { name: data.dvd.name, borrowed: this.isChecked(), contact_id: this.contact_id };
    await this.dvdService.update(body, data.dvd.id);
    this.dialogRef.close();
    this.reload('/dvd');
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