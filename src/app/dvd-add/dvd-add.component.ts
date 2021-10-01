import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DvdService } from '../services/dvd.service';

@Component({
  selector: 'app-dvd-add',
  templateUrl: './dvd-add.component.html',
  styleUrls: ['./dvd-add.component.css'],
  providers: [DvdService]
})
export class DvdAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DvdAddComponent>,
    private dvdService: DvdService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async saveDvd(data: any): Promise<void> {
    const payload = new FormData();
    payload.append('name', data.dvd.name);
    payload.append('borrowed', 'false');
    await this.dvdService.create(payload);
    this.dialogRef.close();
    this.reload('/dvd');
  }

  async editDvd(data: any): Promise<void> {
    const body = { name: data.dvd.name, borrowed: 'false', contact_id: '1' };
    await this.dvdService.update(body, data.dvd.id);
    this.dialogRef.close();
    this.reload('/dvd');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }

}
