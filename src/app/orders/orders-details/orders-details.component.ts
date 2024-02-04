import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, timer } from "rxjs";
import { ORDER_STATUS } from "src/app/shared/constants/order.constants";
import { Order } from "src/app/shared/models/order";
import { OrdersService } from "src/app/shared/services/orders.service";

@Component({
    selector: 'admin-orders-details',
    templateUrl: './orders-details.component.html',
    styleUrls: ['./orders-details.component.scss']
})
export class AdminOrdersDetailsComponent implements OnInit, OnDestroy{
    order: Order;
    orderStatuses = [];
    selectedStatus: any;

    messageState!: {
        message: string,
        class: string
      } | null
    

    cardContent = {
        title:"Order Details" ,
        description: "All order details",
        btnsPositionStyle :"d-flex justify-content-end flex-wrap",
        btns: [
          {
            action: this.goBackToList.bind(this),
            icon: 'fa-arrow-left',
            class: 'btn-warning',
            btnText: 'back'
          }
        ]

      }
      updateOrderSubscription: Subscription
      orderSubscription: Subscription
  
    constructor(
      private orderService: OrdersService,
      private route: ActivatedRoute,
      private location: Location
    ) {}
  
    ngOnInit(): void {
      this._mapOrderStatus();
      this._getOrder();
    }

    goBackToList(){
      timer(500).toPromise().then(done=>{
        this.messageState = null
        this.location.back()
      })
    }
  
    private _mapOrderStatus() {
      this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
        return {
          id: key,
          name: ORDER_STATUS[key].label
        };
      });
    }
  
    private _getOrder() {
      this.route.params.subscribe((params) => {
        if (params['id']) {
         this.orderSubscription =  this.orderService.getOrder(params['id']).subscribe((order) => {
            this.order = order;
            this.selectedStatus = order.status;
          });
        }
      });
    }

  
    onStatusChange(event) {
     this.updateOrderSubscription =  this.orderService.updateOrder({ status: event }, this.order.id).subscribe(
        () => {
            this.messageState =  {
                message: `Order status was updated successfully`,
                class: 'success'
              }
        },
        () => {
            this.messageState =  {
                message: 'Something went wrong. Please try again later',
                class: 'warning'
              }
        }
        );
        this.goBackToList()
    }
    closeModal(){
        this.messageState = null
      }

      ngOnDestroy(): void {
        if (this.updateOrderSubscription) this.updateOrderSubscription.unsubscribe()
        if (this.orderSubscription) this.orderSubscription.unsubscribe()
      }
}