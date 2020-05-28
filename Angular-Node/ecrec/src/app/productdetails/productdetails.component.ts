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
type=''
flag:boolean=false
unflag:boolean=false
recproducts:any=[]
  constructor(private activatedRoute: ActivatedRoute,private router: Router,private apollo: Apollo) { }

  ngOnInit(): void {
    
    this.activatedRoute.queryParams.subscribe(params => {
      this.name = params['name'];
      this.type=params['type']

      console.log(localStorage.getItem('username') + ' '+params['name'])
      this.apollo.query({
        query: gql`
        query recproducts(
          $username: String!,
          $name: String!,
          $type:String) {
            recproducts(
              username: $username,
              name: $name,
              type: $type) {
                username
                name
                type
              }
              
          
      }       `,
       variables:{
         username:localStorage.getItem('username'),
         name:params['name'],
         type:this.type
       }
      })
      .subscribe(result=>{
        
        
          Object.entries(result.data).forEach(entry => {
            this.recproducts=result.data.recproducts
                      
                     
                        
                      
  
        })
          //alert("Username already exists")
        
        
  
      })


      this.apollo.query({
        query: gql`
        query likedproducts(
          $username: String!,
          $name: String!,
          $type:String) {
            likedproducts(
              username: $username,
              name: $name, 
              type:$type) {
                username
                name
                type
              }
              
          
      }       `,
       variables:{
         username:localStorage.getItem('username'),
         name:params['name'],
         type:this.type
       }
      })
      .subscribe(result=>{
        
        
          Object.entries(result.data).forEach(entry => {
            console.log(result.data)
                      if(entry[1]!=null){
                        this.flag=true
                      }
                      else{
                        this.apollo.query({
                          query: gql`
                          query unlikedproducts(
                            $username: String!,
                            $name: String!,
                            $type:String) {
                              unlikedproducts(
                                username: $username,
                                name: $name,
                                type: $type) {
                                  username
                                  name
                                  type
                                }
                                
                            
                        }       `,
                         variables:{
                           username:localStorage.getItem('username'),
                           name:params['name'],
                           type:this.type
                         }
                        })
                        .subscribe(result=>{
                          
                          
                            Object.entries(result.data).forEach(entry => {
                              console.log(result.data)
                                        if(entry[1]!=null){
                                          this.unflag=true
                                        }
                                       
                                          
                                        
                    
                          })
                            //alert("Username already exists")
                          
                          
                    
                        })                
                      }
  
        })
          //alert("Username already exists")
        
        
  
      })
  


    });

    




  }

  productDetails(nme,tpe){
    this.router.navigate(['/productdetails'],{ queryParams: { name: nme ,type:tpe} })
  }


  likeProduct(){
    this.apollo.mutate({
      mutation: gql`
      mutation addLikedProducts(
        $username: String!,
        $name: String!,
        $type:String) {
          addLikedProducts(
            username: $username,
            name: $name,type:$type) {
              username
              name
              type
            }
            
        
    }
      
      `,
      variables:{
        username:localStorage.getItem('username'),
        name:this.name,
        type:this.type
       
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
  this.apollo.mutate({
    mutation: gql`
    mutation addUnlikedProducts(
      $username: String!,
      $name: String!,
      $type: String) {
        addUnlikedProducts(
          username: $username,
          name: $name,
          type:$type) {
            username
            name
            type
          }
          
      
  }
    
    `,
    variables:{
      username:localStorage.getItem('username'),
      name:this.name,
      type:this.type
     
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
  back(){
this.router.navigate(['/maincomponent'])
  }

}
