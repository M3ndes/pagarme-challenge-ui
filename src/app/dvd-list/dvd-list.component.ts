import { Component, OnInit } from '@angular/core';
import { DvdService } from '../services/dvd.service';
import { MatDialog } from '@angular/material/dialog';
import { DvdAddComponent } from '../dvd-add/dvd-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dvd-list',
  templateUrl: './dvd-list.component.html',
  styleUrls: ['./dvd-list.component.css'],
  providers: [DvdService]
})
export class DvdListComponent implements OnInit {
  name!: string;
  dvd!: any;
  displayedColumns: string[] = ['id', 'name', 'borrowed', 'contact_id', 'actions'];
  dataSource: any[] = [];
  constructor(
    public dialog: MatDialog,
    private dvdService: DvdService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const dvd = await this.dvdService.all();
    this.dataSource.push(dvd);
    this.dataSource = [...this.dataSource];
  }

  async deleteDvd(id: any): Promise<void> {
    await this.dvdService.delete(id);
    this.reload('/dvd');
  }

  dvdAdd(dvd: any): void {
    if (dvd == null) {
      dvd = {
        name: ''
      }
    }
    const dialogRef = this.dialog.open(DvdAddComponent, {
      width: '250px',
      data: { dvd }
    });
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
  
}
