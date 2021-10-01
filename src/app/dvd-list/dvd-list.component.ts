import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DvdService } from '../services/dvd.service';
import { DvdAddComponent } from '../dvd-add/dvd-add.component';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dvd-list',
  templateUrl: './dvd-list.component.html',
  styleUrls: ['./dvd-list.component.css'],
  providers: [DvdService, ContactService]
})
export class DvdListComponent implements OnInit {
  name!: string;
  dvd!: any;
  displayedColumns: string[] = ['id', 'name', 'borrowed', 'contact_id', 'actions'];
  dataSource: any[] = [];
  constructor(
    public dialog: MatDialog,
    private dvdService: DvdService,
    private contactService: ContactService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const dvd = await this.dvdService.all();
    this.getNames(dvd);
    this.dataSource.push(dvd);
    this.dataSource = [...this.dataSource];
  }

  async deleteDvd(id: any): Promise<void> {
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
      await this.dvdService.delete(id);
      this.reload('/dvd');
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

  async getNames(dvd: any): Promise<void> {
    if (dvd) {
      for (let i = 0; i < dvd.length; i++) {
        if (dvd[i].contact_id) {
          const contact = await this.contactService.find(dvd[i].contact_id);
          dvd[i].contact_id = contact.name;
        } else {
          dvd[i].contact_id = '';
        }
      }
    }
    return;
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
