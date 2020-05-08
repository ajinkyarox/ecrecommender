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
  
  username='';
  password='';

  constructor(private  dialog:  MatDialog,private apollo: Apollo) {
      }
  onKeyUsername(event){
    this.username=event.target.value;
  }
  onKeyPassword(event){
    this.password=event.target.value;
  }
  login(){
    
this.apollo.query({
  query: gql`
  query  login($username: String!,
    $password: String!){
      login(
        username: $username,
        password: $password) {
          username
          password
        }
    }
  `,
  variables:{
    username:this.username,
    password:this.password
  }
}).subscribe(result=>{
  console.log(result.data)
  Object.entries(result.data).forEach(entry => {
            
  console.log(entry[0]+' '+entry[1])
  if(entry[1]==null){
    alert('Wrong Username or password')
  }
  else{
    
  }

})


})
  }
  createAccount(){
    this.dialog.open(CreateaccountComponent);
  }
}
