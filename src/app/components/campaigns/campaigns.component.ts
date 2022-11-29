import { Component, OnInit } from '@angular/core';
import { Campaign, CampaignsService } from 'src/app/core/campaigns.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css'],
})
export class CampaignsComponent implements OnInit {
  campaigns: Campaign[] = [];

  constructor(private campaignsService: CampaignsService) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.campaignsService.getCampaigns().subscribe({
      next: (res) => {
        this.campaigns = res.items;
      },
    });
  }

  deleteCampaign(uuid: string): void {
    this.campaignsService.deleteCampaign(uuid).subscribe({
      next: () => {
        this.loadCampaigns();
      },
    });
  }

  editCampaign(value: Campaign) {
    this.campaignsService.editCampaign(value).subscribe({
      next: () => {
        this.loadCampaigns();
      },
    });
  }
}
