import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  navBarIcons = [
    
    {
      text: "Top List",
      routerLink: "/list"
    },
    {
      text: "Hot",
      routerLink: "/hot"
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
