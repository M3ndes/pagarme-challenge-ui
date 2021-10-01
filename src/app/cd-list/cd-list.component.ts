import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdService } from '../services/cd.service';
import { CdAddComponent } from '../cd-add/cd-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cd-list',
  templateUrl: './cd-list.component.html',
  styleUrls: ['./cd-list.component.css'],
  providers: [CdService]
})
export class CdListComponent implements OnInit {
  name!: string;
  cd!: any;
  displayedColumns: string[] = ['id', 'name', 'borrowed', 'contact_id', 'actions'];
  dataSource: any[] = [];
  constructor(
    public dialog: MatDialog,
    private cdService: CdService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const cd = await this.cdService.all();
    this.dataSource.push(cd);
    this.dataSource = [...this.dataSource];
  }

  async deleteCd(id: any): Promise<void> {
    await this.cdService.delete(id);
    this.reload('/cd');
  }

  cdAdd(cd: any): void {
    if (cd == null) {
      cd = {
        name: ''
      }
    }
    const dialogRef = this.dialog.open(CdAddComponent, {
      width: '250px',
      data: { cd }
    });
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }

}
