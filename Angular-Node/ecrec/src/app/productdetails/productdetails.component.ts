import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
name=''
flag:boolean=false
  constructor(private activatedRoute: ActivatedRoute,private router: Router,private apollo: Apollo) { }

  ngOnInit(): void {
    
    this.activatedRoute.queryParams.subscribe(params => {
      this.name = params['name'];
      console.log(localStorage.getItem('username') + ' '+params['name'])
      this.apollo.query({
        query: gql`
        query likedproducts(
          $username: String!,
          $name: String!) {
            likedproducts(
              username: $username,
              name: $name) {
                username
                name
              }
              
          
      }       `,
       variables:{
         username:localStorage.getItem('username'),
         name:params['name']
       }
      })
      .subscribe(result=>{
        
        
          Object.entries(result.data).forEach(entry => {
            console.log(result.data)
                      if(entry[1]!=null){
                        this.flag=true
                      }
  
        })
          //alert("Username already exists")
        
        
  
      })
  


    });

    




  }

  likeProduct(){
    this.apollo.mutate({
      mutation: gql`
      mutation addLikedProducts(
        $username: String!,
        $name: String!) {
          addLikedProducts(
            username: $username,
            name: $name) {
              username
              name
              
            }
            
        
    }
      
      `,
      variables:{
        username:localStorage.getItem('username'),
        name:this.name
       
      }
    })
    .subscribe(result=>{
      
      
        Object.entries(result.data).forEach(entry => {
          
          console.log(result.data)
            alert('Success')
            
            location.reload()

          
        

      })
        //alert("Username already exists")
      
      

    })


  }
unlikeProduct(){

}
  back(){
this.router.navigate(['/maincomponent'])
  }

}
