import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdService } from '../services/cd.service';
import { CdAddComponent } from '../cd-add/cd-add.component';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cd-list',
  templateUrl: './cd-list.component.html',
  styleUrls: ['./cd-list.component.css'],
  providers: [CdService, ContactService]
})
export class CdListComponent implements OnInit {
  name!: string;
  cd!: any;
  displayedColumns: string[] = ['id', 'name', 'borrowed', 'contact_id', 'actions'];
  dataSource: any[] = [];
  constructor(
    public dialog: MatDialog,
    private cdService: CdService,
    private contactService: ContactService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const cd = await this.cdService.all();
    this.getNames(cd);
    this.dataSource.push(cd);
    this.dataSource = [...this.dataSource];
  }

  async deleteCd(id: any): Promise<void> {
    const result = await Swal.fire({
      title: 'Atenção!',
      text: 'Você tem certeza que deseja deletar esse registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar'
    });
    if (result.isConfirmed) {
      await this.cdService.delete(id);
      this.reload('/cd');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'registro deletado com sucesso.'
      });
    }
  }

  async getNames(cd: any): Promise<void> {
    if (cd) {
      for (let i = 0; i < cd.length; i++) {
        if (cd[i].contact_id) {
          const contact = await this.contactService.find(cd[i].contact_id);
          cd[i].contact_id = contact.name;
        } else {
          cd[i].contact_id = '';
        }
      }
    }
    return;
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
