import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdService } from '../services/cd.service';
import { ComponentDialogComponent } from '../shared/component-dialog/component-dialog.component';

@Component({
  selector: 'app-cds-list',
  templateUrl: './cds-list.component.html',
  styleUrls: ['./cds-list.component.css'],
  providers: [CdService]
})
export class CdsListComponent implements OnInit {

  animal!: string;
  name!: string;
  cd!: any;
  displayedColumns: string[] = ['id', 'name', 'borrowed', 'contact_id'];
  dataSource: any[] = [];
  constructor(
    public dialog: MatDialog,
    private cdService: CdService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getcds();
  }

  async getcds(): Promise<any> {
    const cd = await this.cdService.all();
    this.dataSource.push(cd);
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
