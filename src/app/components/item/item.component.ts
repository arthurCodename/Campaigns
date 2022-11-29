import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Campaign } from 'src/app/core/campaigns.service';
import { CampaignsService } from '../../core/campaigns.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() campaignData: Campaign;
  @Input() editData: any;

  @Output() deleteEvent = new EventEmitter();

  constructor(private campaignsService: CampaignsService) {}

  ngOnInit(): void {}

  deleteCampaign(uuid: string): void {
    this.deleteEvent.emit(uuid);
  }

  openDialog(): void {
    this.campaignsService.openDialog(this.campaignData);
  }
}
