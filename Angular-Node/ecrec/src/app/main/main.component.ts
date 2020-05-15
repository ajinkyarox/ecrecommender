import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateproductComponent } from '../createproduct/createproduct.component';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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
                    console.log(this.products[0].name)

      })
        //alert("Username already exists")
      
      

    })






  }
  logOut(){

    this.router.navigate(['/'])
  }
createProduct(){
  this.dialog.open(CreateproductComponent);
}

}
