import { Component } from '@angular/core';
import {CountryService} from "./shared/services/country.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private readonly countryService: CountryService) {
    // for(let i = 0; i < 10; i++) {
    //   this.countryService.getCountries();
    // }
  }
}
