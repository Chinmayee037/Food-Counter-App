import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Observable, of, switchMap, take, tap, timer } from 'rxjs';
export enum OrderStatus {
  Proccesing = 'processing',
  Completed = 'completed',
  Waiting = 'waiting',
}
@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  
  listOfWaitingOrders: any[] = [];
  listOfOriginalOrders: any[]=[];
  listOfProccesingOrders: any[] = [];
  listOfCompletedOrders: any[] = [];
  ordProccessingInterval = 4000;
  ordCompleteInterval = 5500;
  ordWaitingInterval = 2500;

  lastElementExcludedList: any[] = [];
  lastCompletedOrder:any;
  constructor(public service: CustomersService) { }
  ngOnInit(): void {
    this.getAllOrderDet();
  }

 
  getAllOrderDet() {
    this.service.getAllCustomer().subscribe(
      (data) => {
        this.listOfOriginalOrders = data.users;
        this.proccessOneByOne();
      },
      (error) => {
        console.error('Error fetching users:', error);
      })
  }
  
  orderInQueue(index: number): Observable<any> {
    return of(index).pipe(
      switchMap((index) => {
        this.listOfOriginalOrders[index].status = OrderStatus.Waiting;
        this.listOfWaitingOrders.push(this.listOfOriginalOrders[index]);
        return of({ data: this.listOfOriginalOrders[index], index });

      })
    );

  }

  proccessOneByOne(){
    timer(1000, this.listOfOriginalOrders.length + 1 * this.ordWaitingInterval)
    .pipe(
      take(this.listOfOriginalOrders.length),
      switchMap((ind) => this.orderInQueue(ind))
    ).subscribe((orderProcessed) => {
      this.startOrderPlacing(orderProcessed);
      this.completeOrders(orderProcessed);
    });
  }
 
  startOrderPlacing(orderProcessed: { data: any; ind: any }) {
    timer(
      this.ordProccessingInterval,
      this.ordProccessingInterval * this.listOfOriginalOrders.length + 1
    )
      .pipe(
        take(1),
        tap((_) => {
          orderProcessed.data.status = OrderStatus.Proccesing;
          this.listOfProccesingOrders.push(orderProcessed.data);
        })
      )
      .subscribe();
  }

  completeOrders(orderTobeCompleted: { data: any; ind: any; }) {
    timer(this.ordCompleteInterval, this.ordCompleteInterval * this.listOfOriginalOrders.length + 1)
      .pipe(
        take(1),
        tap(_ => {
          orderTobeCompleted.data.status = OrderStatus.Completed
          this.listOfCompletedOrders.unshift(orderTobeCompleted.data);

          // this.lastElementExcludedList = [...this.listOfCompletedOrders];
       
          this.lastElementExcludedList = this.listOfCompletedOrders.slice(1);
          this.lastCompletedOrder = this.listOfCompletedOrders[0];   
          
        
        })
      )
      .subscribe()
  }
}
