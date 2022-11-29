import {
  Component,
  Inject,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Campaign, CampaignsService } from '../../core/campaigns.service';
import { v4 } from 'uuid';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

const cities = [
  'Kyiv',
  'Warsaw',
  'Tbilisi',
  'London',
  'Berlin',
  'Paris',
  'Los Angeles',
  'Toronto',
  'Prague',
  'Krakow',
  'Sydney',
  'Zurich',
  'Lisabon',
  'Madrid',
  'New York',
  'Philadelphia',
];

const keywords = [
  'computer services',
  'Enterprise',
  'Affiliation',
  'Marketing',
  'Law',
];

@Component({
  selector: '[app-additem]',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdditemComponent implements OnInit {
  addItemForm: FormGroup;
  public model: any;
  public modelkeywords : any
  campaign: Campaign;

  @Output() editData = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,
    private campaingsService: CampaignsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

	@ViewChild('instance', { static: true }) instance: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();

	searchCities: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map((term) =>
      term.length < 2 ? [] : cities.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
    ),
  );
  
	searchKeywords: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map((term) =>
      term.length < 2 ? [] : keywords.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
    ),
  );

  ngOnInit(): void {
    this.campaign = this.data.campaign;
    this.buildForm();
  }

  handleSubmit() {
    if (!this.data.campaign) {
      return this.addItem();
    }
    return this.editItem();
  }

  addItem() {
    this.campaingsService.addCampaign(this.addItemForm.value);
  }

  editItem() {
    this.editData.emit(this.addItemForm.value.uuid);
    this.campaingsService.editCampaign(this.addItemForm.value);
  }

  private buildForm() {
    this.addItemForm = this.formBuilder.group({
      uuid: this.campaign?.uuid || v4(),
      product: this.campaign?.product,
      keyword: this.campaign?.keyword ,
      location: this.campaign?.location ,
      radius: this.campaign?.radius,
      bid: this.campaign?.bid ,
      fund: this.campaign?.fund ,
      status: this.campaign?.status || false,
    });
  }
}
