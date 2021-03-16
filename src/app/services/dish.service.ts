import {Injectable} from '@angular/core';
import {DISHES} from '../shared/dishes';
import {Dish} from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES), 2000);
    });
  }

  getDish(id: number): Promise<Dish> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === String(id)))[0]), 2000);
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });
  }
}
