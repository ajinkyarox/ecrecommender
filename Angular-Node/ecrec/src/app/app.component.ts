import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateaccountComponent } from './createaccount/createaccount.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EC-RECOMMENDER';
  msg:any=null;
  username='';
  password='';

  constructor(apollo: Apollo,private  dialog:  MatDialog) {
    apollo
      .query({
        query: gql`
        
        query {
          
            hello
          
        }
        
        `,
      })
      .subscribe(result=>{
        this.msg=result.data as string;
        console.log(this.msg.hello)
      })
  }
  onKeyUsername(event){
    this.username=event.target.value;
  }
  onKeyPassword(event){
    this.password=event.target.value;
  }
  login(){
    console.log(this.username+' '+this.password)
  }
  createAccount(){
    this.dialog.open(CreateaccountComponent);
  }
}
