import { Component, OnInit, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import gql from 'graphql-tag';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit {
  name='';
  type='';
  details='';
  constructor(private apollo: Apollo,private router: Router,private  dialogRef:  MatDialogRef<DeleteproductComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) { }

  ngOnInit(): void {
    this.name=this.data.name
    this.type=this.data.type
    this.details=this.data.details
  }
  closeMe(){
    this.dialogRef.close();
  }
  deleteProduct(){
    console.log("Deleted")
    this.apollo.mutate({
      mutation: gql`
      mutation deleteProduct(
        $name: String!,
        $type: String!,
        $details: String) {
          deleteProduct(
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
      console.log(result)
      
        Object.entries(result.data).forEach(entry => {
          console.log(entry)
 if(entry[1]==null){
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
}
