import { Component, OnInit } from '@angular/core';
import {NetworkService} from "../network.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private networkService:NetworkService) { }

  ngOnInit(): void {
  }


  verifyToken() {
    console.log("login")
  }
}
