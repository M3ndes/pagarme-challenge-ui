import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-component-dialog',
  templateUrl: './component-dialog.component.html',
  styleUrls: ['./component-dialog.component.css']
})

export class ComponentDialogComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: '',
    public dialogRef: MatDialogRef<ComponentDialogComponent>
  ){}

  ngOnInit(): void{
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}


