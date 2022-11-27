import { Component, OnInit } from '@angular/core';
import {ItemComponent} from '../item/item.component'

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdditemComponent } from '../additem/additem.component';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
  constructor(private dialog : MatDialog) { }
  
  ngOnInit(): void {
    
  }
  openDialog(){
    this.dialog.open( AdditemComponent, {
      width: "600px",
      height: "70vh",
    })
  }
}
