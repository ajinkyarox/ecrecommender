import { Component, OnInit,Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {

  constructor(private  dialogRef:  MatDialogRef<CreateaccountComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) { }

  ngOnInit(): void {
  }
closeMe(){
  this.dialogRef.close();
}
}
