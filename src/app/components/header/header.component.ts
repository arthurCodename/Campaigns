import { Component, OnInit } from '@angular/core';
import { CampaignsComponent } from '../campaigns/campaigns.component';


@Component({
  providers: [CampaignsComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  constructor(private campaigns: CampaignsComponent) { }

  ngOnInit(): void {
  }
  openDialog() : void {
    this.campaigns.openDialog();
  }
 
}
