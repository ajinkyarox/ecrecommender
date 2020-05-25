import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateproductComponent } from '../createproduct/createproduct.component';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { UpdateproductComponent } from '../updateproduct/updateproduct.component';
import { DeleteproductComponent } from '../deleteproduct/deleteproduct.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private apollo: Apollo,private router: Router,private  dialog:  MatDialog) { }
products:any;
  ngOnInit(): void {

    this.apollo.query({
      query: gql`
      query {
        products {
          name
          type
          details
        }
        }
     `
    })
    .subscribe(result=>{
      
      
        Object.entries(result.data).forEach(entry => {
          
                    this.products=entry[1]
                    console.log(this.products[0])

      })
        //alert("Username already exists")
      
      

    })






  }
  logOut(){
    localStorage.setItem('username','')
    this.router.navigate(['/'])
  }
createProduct(){
  this.dialog.open(CreateproductComponent);
}

updateProduct(name,type,details){
  console.log(name)
  var obj={'name':name,'type':type,'details':details}
  this.dialog.open(UpdateproductComponent,{data:obj});

}
deleteProduct(name,type,details){
  console.log(name)
  var obj={'name':name,'type':type,'details':details}
  this.dialog.open(DeleteproductComponent,{data:obj});
}

productDetails(nme){
  this.router.navigate(['/productdetails'],{ queryParams: { name: nme } })
}

buyProduct(name){
  var uname:String=localStorage.getItem('username')
  var cnt:String='1'
console.log(name+' '+uname+' '+cnt)
this.apollo.mutate({
  mutation: gql`
  mutation addPurchaseDetails(
    $name: String!,
    $username: String!,
    $count: String) {
      addPurchaseDetails(
        name: $name,
        username: $username,
        count: $count) {
          name
          username
          count
        }
        
    
}
  
  `,
  variables:{
    name:name,
    username:uname,
    count:cnt
  }
})
.subscribe(result=>{
  
  
    Object.entries(result.data).forEach(entry => {
      
      
        alert('Success')
        
        location.reload()

      


  })
    //alert("Username already exists")
  
  

})


}


}
