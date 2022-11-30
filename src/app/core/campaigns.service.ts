import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AdditemComponent } from '../components/additem/additem.component';


export interface Campaign {
  uuid: string;
  product: string;
  keyword: string;
  location: string;
  radius: string;
  bid: string;
  fund: string;
  status: boolean;
}

interface GetCampaignsResponse {
  items: Campaign[];
}

const CAMPAIGNS_JSON_PATH = '/assets/campaign-data/campaign-data.json';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  campaigns: Campaign[] | null = null;

  constructor(private httpClient: HttpClient, private dialog: MatDialog) {}

  loadCampaigns(): Observable<GetCampaignsResponse> {
    return this.httpClient.get<GetCampaignsResponse>(CAMPAIGNS_JSON_PATH);
  }

  getCampaigns(): Observable<GetCampaignsResponse> {
    if (this.campaigns === null) {
      return from(
        this.loadCampaigns().pipe(
          map((res) => {
            this.campaigns = res.items;
            return res;
          })
        )
      );
    }
    return of({ items: this.campaigns });
  }

  addCampaign(campaign: Campaign): void {
    
    this.campaigns!.push(campaign);
    
  }



  editCampaign(campaign: Campaign): Observable<any> {
    
    const idx = this.campaigns!.findIndex((item) => {
      return item.uuid === campaign.uuid;
    });
    
    this.campaigns![idx!] = campaign;
    
    return from([{ status: 'updated' }]);
  
  }

  deleteCampaign(uuid: string): Observable<any> {
    this.campaigns = this.campaigns!.filter((item) => item.uuid !== uuid);
    return from([{ status: 'deleted' }]);
  }

  openDialog(campaign?: Campaign) {
    this.dialog.open(AdditemComponent, {
      data: { campaign: campaign },
      
    });
  }
}
