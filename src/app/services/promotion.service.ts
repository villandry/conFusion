import {Injectable} from '@angular/core';
import {Promotion} from '../shared/promotion';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {baseURL} from '../shared/baseurl';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private  http: HttpClient) {
  }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions');
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]));
  }
}
