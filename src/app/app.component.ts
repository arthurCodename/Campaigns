import { Component, OnInit } from '@angular/core';
import { CampaignsService } from './core/campaigns.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private campaingsService: CampaignsService) {}

  ngOnInit(): void {
    this.campaingsService.loadCampaigns();
  }
}
