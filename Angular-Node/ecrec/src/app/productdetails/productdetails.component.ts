import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
name=''
  constructor(private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.name = params['name'];
    });
  }
  back(){
this.router.navigate(['/maincomponent'])
  }

}
