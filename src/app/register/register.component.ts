import { Component, OnInit } from '@angular/core';
import {NetworkService} from "../network.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private networkService:NetworkService) { }

  ngOnInit(): void {
  }
  verifyToken() {
    console.log("register")
  }
}
