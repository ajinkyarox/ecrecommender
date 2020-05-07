import { Component, OnInit,Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import gql from "graphql-tag";
import { Apollo } from 'apollo-angular'
import { async } from '@angular/core/testing';


const ADD_LOGIN = gql`
    mutation addLogin(
        $username: String!,
        $password: String!) {
          addLogin(
            username: $username,
            password: $password) {
            _id
        }
    }
`;

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
   
  username='';
password='';
repassword='';
  constructor(private apollo: Apollo,private  dialogRef:  MatDialogRef<CreateaccountComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) { }

  ngOnInit(): void {
  }

  onKeyUsername(event){
    this.username=event.target.value;
  }
  onKeyPassword(event){
    this.password=event.target.value;
  }
  onKeyResPassword(event){
    this.repassword=event.target.value;
  }
  createAccount(){
    if(this.username!=null && this.username!=undefined && this.username.trim()!='' &&
    this.password!=null && this.password!=undefined && this.password.trim()!='' && 
    this.repassword!=null && this.repassword!=undefined && this.repassword.trim()!='' && 
    this.password==this.repassword){
      this.apollo.mutate({
        mutation: gql`
        mutation addLogin(
          $username: String!,
          $password: String!) {
            addLogin(
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
      })
      .subscribe(result=>{
        
        
          Object.entries(result.data).forEach(entry => {
            
            if(entry[1]==null){
              alert('Success')
              this.dialogRef.close()
            }
            else if(entry[1].username!=null){
              alert('Username already exists')
            }
  
        })
          //alert("Username already exists")
        
        
  
      })
  
    }
    else if(this.password!=this.repassword){
      alert('Enter correct password')
    }
    else{
      alert('Enter all fields')
    }
      }
closeMe(){
  this.dialogRef.close();
}
}
