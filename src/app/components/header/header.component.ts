import { Component, OnInit } from '@angular/core';
import { CampaignsService } from 'src/app/core/campaigns.service';
import { CampaignsComponent } from '../campaigns/campaigns.component';

@Component({
  providers: [CampaignsComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  constructor(private campaigns: CampaignsService) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.campaigns.openDialog();
  }
}
