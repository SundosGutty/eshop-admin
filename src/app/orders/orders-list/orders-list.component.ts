import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, timer } from "rxjs";
import { Order } from "src/app/shared/models/order";
import { OrdersService } from "src/app/shared/services/orders.service";

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
})
export class AdminOrdersListComponent implements OnInit, OnDestroy{
    cardContent = {
        title:"Orders" ,
        btnsPositionStyle:"btn-group",
        description: "List of all Orders",
      }
      currentId: string
      messageState
      dialogContent
      orders: Order[] = [];
      isDialogShow= false

      tableBtns= [
        {
          class: 'btn btn-primary me-2',
          action: this.showOrder.bind(this),
          icon: 'fa-solid fa-pen-to-square'
    
        }, 
        {
          class: 'btn btn-danger',
          action: this.deleteOrder.bind(this),
          icon: 'fa-solid fa-trash'
        }
      ]

      ordersSubscription : Subscription

      constructor(private ordersService: OrdersService,
        private router: Router){}


      ngOnInit(){
        this._getOrders()
      }



      private _getOrders(){
       this.ordersSubscription=  this.ordersService.getOrders().subscribe((orders: Order[])=>{
           this.orders = orders
         })
      }


      showOrder(orderId) {
        this.router.navigateByUrl(`orders/details/${orderId}`);
      }

      deleteOrder(orderId: string){
        this.currentId = orderId
        this.isDialogShow = true
        this.dialogContent = {
          title: 'Are you sure you would like to delete this order?', 
          buttons: [
            {
              title: 'Cancel', 
              class: 'btn btn-secondary',
              response: false
            },
             {
              title: 'Confirm',
              class: 'btn btn-primary',
              response: true
            }
          ]
    
        }
    
      }

      shouldDelete(ans: boolean){
        this.dialogContent = null
        if (ans){
      this.ordersService.deleteOrder(this.currentId).subscribe(response=>{
          this.messageState =  {
            message: 'Order was deleted successfully',
            class: 'success'
          }
        }, ()=>{
          this.messageState =  {
            message: 'Something went wrong. Please try again later',
            class: 'warning'
          }
        })
      }
      timer(2000)
      .toPromise()
      .then(() => {
        this._getOrders();
        this.messageState = null
      });
    }

    ngOnDestroy(): void {
      if (this.ordersSubscription) this.ordersSubscription.unsubscribe()
    }

  
      
}