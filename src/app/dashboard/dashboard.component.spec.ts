import { ComponentFixture, TestBed } from '@angular/core/testing';
// imports: [ MatDialogModule]

import { DashboardComponent } from './dashboard.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]

    })
    .compileComponents();
    providers: [
      { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} }
    ]  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
