import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

  constructor(private apollo: Apollo,private router: Router,private  dialogRef:  MatDialogRef<UpdateproductComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
    console.log(data)
    
   }

  ngOnInit(): void {
    this.name=this.data.name
    this.type=this.data.type
    this.details=this.data.details
  }  

  name='';
  type='';
  details='';
  closeMe(){
    this.dialogRef.close();
  }
  updateProduct(){
    if(this.name!=null && this.name!=undefined && this.name.trim()!='' &&
    this.type!=null && this.type!=undefined && this.type.trim()!='' && 
    this.details!=null && this.details!=undefined && this.details.trim()!=''){
      this.apollo.mutate({
        mutation: gql`
        mutation updateProduct(
          $name: String!,
          $type: String!,
          $details: String) {
            updateProduct(
              name: $name,
              type: $type,
              details: $details) {
                name
                type
                details
              }
              
          
      }
        
        `,
        variables:{
          name:this.name,
          type:this.type,
          details:this.details
        }
      })
      .subscribe(result=>{
        
        
          Object.entries(result.data).forEach(entry => {
            
   if(entry[1].name!=null){
              alert('Success')
              this.dialogRef.close()
              location.reload()
            }
            else{
              alert('Failure')
            }
  
        })
          //alert("Username already exists")
        
        
  
      })
  
    }
  
    else{
      alert('Enter all fields')
    }
  
  }
  onKeyDetails(event){
    this.details=event.target.value;
  }
  onKeyName(event){
    this.name=event.target.value;
    }
    
    onKeyType(event){
      this.type=event.target.value;
      }
}
