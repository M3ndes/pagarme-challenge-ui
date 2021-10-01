import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CdService } from '../services/cd.service';

@Component({
  selector: 'app-cd-add',
  templateUrl: './cd-add.component.html',
  styleUrls: ['./cd-add.component.css'],
  providers: [CdService]
})
export class CdAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CdAddComponent>,
    private cdService: CdService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async saveCd(data: any): Promise<void> {
    const payload = new FormData();
    payload.append('name', data.cd.name);
    payload.append('borrowed', 'false');
    await this.cdService.create(payload);
    this.dialogRef.close();
    this.reload('/cd');
  }

  async editCd(data: any): Promise<void> {
    const body = { name: data.cd.name, borrowed: 'false', contact_id: '1' };
    await this.cdService.update(body, data.cd.id);
    this.dialogRef.close();
    this.reload('/cd');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
}
