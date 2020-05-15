import { Component, OnInit, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import gql from 'graphql-tag';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
name='';
type='';
details='';
  constructor(private apollo: Apollo,private  dialogRef:  MatDialogRef<CreateproductComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) { }

  ngOnInit(): void {
  
    
  
  }
createProduct(){
  if(this.name!=null && this.name!=undefined && this.name.trim()!='' &&
  this.type!=null && this.type!=undefined && this.type.trim()!='' && 
  this.details!=null && this.details!=undefined && this.details.trim()!=''){
    this.apollo.mutate({
      mutation: gql`
      mutation addProduct(
        $name: String!,
        $type: String!,
        $details: String) {
          addProduct(
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
          
          if(entry[1]==null){
            alert('Success')
            this.dialogRef.close()
          }
          else if(entry[1].name!=null){
            alert('Product already exists')
          }

      })
        //alert("Username already exists")
      
      

    })

  }

  else{
    alert('Enter all fields')
  }

}

onKeyName(event){
this.name=event.target.value;
}

onKeyType(event){
  this.type=event.target.value;
  }
  closeMe(){
    this.dialogRef.close();
  }
  onKeyDetails(event){
    this.details=event.target.value;
  }

  
}
