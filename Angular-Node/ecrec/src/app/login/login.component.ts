import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { CreateaccountComponent } from '../createaccount/createaccount.component';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'EC-RECOMMENDER';
  
  username='';
  password='';

  constructor(private  dialog:  MatDialog,private router: Router,private apollo: Apollo) {
      
    
  }
      ngOnInit(){
        
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
    console.log("YES")
    this.router.navigate(['/maincomponent'])
  }

})


})
  }



  createAccount(){
    this.dialog.open(CreateaccountComponent);
  }}
