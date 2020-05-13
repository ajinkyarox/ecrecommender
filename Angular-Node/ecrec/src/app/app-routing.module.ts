import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';




@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'maincomponent', component: MainComponent },
    {path:'logincomponent',component:LoginComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
