import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject} from "rxjs";
import {Country} from "../model/country";
import {tap} from "rxjs/operators";

const API_PREFIX = "/api/countries";


@Injectable({
  providedIn: "root"
})
export class CountryService {

  private cacheRefillPending = false;
  private cache: Country[] | undefined;
  private readonly waitingQueue = new Subject<Country[]>();

  constructor(private readonly httpClient: HttpClient) {
  }

  getCountries(): Observable<Country[]> {
    if (this.cache) {
      return of(this.cache);
    } else if (this.cacheRefillPending) {
      return this.waitingQueue;
    } else {
      this.cacheRefillPending = true;
      return this.httpClient.get<Country[]>(API_PREFIX).pipe(
        tap(countries => {
          this.cache = countries;
          this.waitingQueue.next(this.cache);
          this.waitingQueue.complete();
        })
      );
    }
  }
}
