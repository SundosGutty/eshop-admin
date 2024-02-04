import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, timer } from "rxjs";
import { Product } from "src/app/shared/models/product";
import { ProductsService } from "src/app/shared/services/products.service";

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html'
})
export class AdminProductsListComponent implements OnInit , OnDestroy{

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 100; 


    products: Product[] = []
    currentId : string 
    isDialogShow = false

    dialogContent!: {
        title: string,
        description?: string,
        buttons :    {
          title : string,
          class: string,
          response: boolean 
      }[]
      } | null
    
      
      messageState!: {
        message: string,
        class: string
      } | null
    
      cardContent = {
        title:"Products" ,
        btnsPositionStyle:"btn-group",
        description: "List of all Products",
        btns: [{routeTo: './form', icon: 'fa-plus', class: 'btn-success', btnText: 'New'}]
      }
      
      tableBtns= [
        {
          class: 'btn btn-primary me-2',
          action: this.editProducts.bind(this),
          icon: 'fa-solid fa-pen-to-square'
    
        }, 
        {
          class: 'btn btn-danger',
          action: this.deleteProduct.bind(this),
          icon: 'fa-solid fa-trash'
        }
      ]

      productsSubscription: Subscription

      constructor(private productsService: ProductsService, private router : Router, private location: Location){}

      ngOnInit() : void{
        this._getProducts()
      }

      private _getProducts(){
       this.productsSubscription =  this.productsService.getProducts().subscribe((products: Product[])=>{
            this.products = products
           })
      }

  onPageChange(page: number) {
    this.currentPage = page;
    this._getProducts()
  }

      deleteProduct(productId: string){
        this.currentId = productId
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

      editProducts(productId: string){
        this.router.navigateByUrl(`products/form/${productId}`)
      }


      shouldDelete(ans: boolean){
        this.dialogContent = null
        if (ans){
        this.productsService.deleteProduct(this.currentId).subscribe(response=>{
          this.messageState =  {
            message: 'Product was deleted successfully',
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
            this.messageState = null
            this._getProducts()
          });
      }

      ngOnDestroy(): void {
        if (this.productsSubscription) this.productsSubscription.unsubscribe()
      }


}

