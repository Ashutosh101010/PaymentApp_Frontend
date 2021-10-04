import { Component, OnInit } from '@angular/core';
import {JSONConstants} from "../Model/JSONHelper";
import {Router} from "@angular/router";
import {NetworkService} from "../network.service";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(public router:Router,public networkService:NetworkService) { }

  ngOnInit(): void {

  }

}
