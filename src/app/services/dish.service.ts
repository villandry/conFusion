import { Injectable } from '@angular/core';
import {DISHES} from '../shared/dishes';
import {Dish} from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES);
  }

  getDish(id: number): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.id === String(id)))[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
}
