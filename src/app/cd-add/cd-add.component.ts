import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CdService } from '../services/cd.service';
import { ContactService } from '../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cd-add',
  templateUrl: './cd-add.component.html',
  styleUrls: ['./cd-add.component.css'],
  providers: [CdService, ContactService]
})
export class CdAddComponent implements OnInit {
  contacts: any[] = [];
  slide = false;
  contact_id = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CdAddComponent>,
    private cdService: CdService,
    private contactService: ContactService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const contacts = await this.contactService.all();
    this.contacts.push(contacts);
    this.contacts = [...this.contacts];
  }

  async saveCd(data: any): Promise<void> {
    if (!data.cd.name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um nome para o cd.'
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

    const payload = { name: data.cd.name, borrowed: this.isChecked(), contact_id: this.contact_id };
    await this.cdService.create(payload);
    this.dialogRef.close();
    this.reload('/cd');
  }

  async editCd(data: any): Promise<void> {
    if (!data.cd.name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'você precisa informar um nome para o cd.'
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
    const body = { name: data.cd.name, borrowed: this.isChecked(), contact_id: this.contact_id };
    await this.cdService.update(body, data.cd.id);
    this.dialogRef.close();
    this.reload('/cd');
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
