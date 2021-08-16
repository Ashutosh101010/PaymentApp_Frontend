import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  private toggle: boolean | undefined;
  status = 'Edit';
  tog() {
    this.enableTxtBox=! this.enableTxtBox;
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Edit' : 'Save';


  }




  enableTxtBox = true;
}
