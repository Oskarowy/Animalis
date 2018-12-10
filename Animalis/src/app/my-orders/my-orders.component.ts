import { switchMap } from 'rxjs/operators';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent{
  orders$: Observable<any>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {

      this.orders$ = authService.user$.pipe(switchMap(u => 
        orderService.getOrdersByUser(u.uid)));
    }
}
