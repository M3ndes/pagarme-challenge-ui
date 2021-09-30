import { Component, OnInit } from '@angular/core';
import { DvdService } from '../services/dvd.service';
import { MatDialog } from '@angular/material/dialog';
import { ComponentDialogComponent } from '../shared/component-dialog/component-dialog.component';

@Component({
  selector: 'app-dvd-list',
  templateUrl: './dvd-list.component.html',
  styleUrls: ['./dvd-list.component.css'],
  providers: [DvdService]
})
export class DvdListComponent implements OnInit {

  animal!: string;
  name!: string;
  dvd!: any;
  displayedColumns: string[] = ['id', 'name', 'borrowed', 'contact_id'];
  dataSource: any[] = [];
  constructor(
    public dialog: MatDialog,
    private DvdService: DvdService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getdvds();
  }

  async getdvds(): Promise<any> {
    const dvd = await this.DvdService.all();
    this.dataSource.push(dvd);
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
