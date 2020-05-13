import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { MainComponent } from './main/main.component';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
title='EC-RECOMMENDER';
loginStatus=false;
  constructor(private router: Router) {}
  loginPage(){

this.router.navigate(['/logincomponent'])
  }
 
  
}
