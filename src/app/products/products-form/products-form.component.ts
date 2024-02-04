import { Location } from "@angular/common";
import { ThisReceiver } from "@angular/compiler";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, takeUntil, timer } from "rxjs";
import { Category } from "src/app/shared/models/category";
import { Product } from "src/app/shared/models/product";
import { CategoriesService } from "src/app/shared/services/categories.service";
import { ProductsService } from "src/app/shared/services/products.service";

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html'
})

export class AdminProductsFormComponent implements OnInit, OnDestroy{
    productForm!:  FormGroup
    imageDisplay: string | ArrayBuffer;
    catagories: {}[]
    allCategories : Category[]
    editMode = false
    formFields: any[] = [];
    imageFile:any
    currentProductId: string = null
    messageState!: {
      message: string,
      class: string
    } | null
  
    cardContent: {}

    categoriesSubscription: Subscription
    createProductSubscription: Subscription
    updateProductSubscription: Subscription
    constructor(private fb: FormBuilder, private productsService: ProductsService, private location: Location, private router: ActivatedRoute, private route : Router, private categoriesService : CategoriesService){}
  
    async ngOnInit(){
     this._initForm()
     this._checkEditMode()
     this._getCategories();
    }

    private _initForm(){
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [true]
           })
    }

    private _getCategories() {
       this.categoriesSubscription=  this.categoriesService
          .getCategories()
        //   .pipe(takeUntil(this.endsubs$))
          .subscribe((categories) => {
            this.allCategories = categories
            this.catagories = categories.map(item => ({
                label: item.name,
                value: item.name?.toLowerCase()
            }));
            this.formFields = [
                { label: 'Name', controlName: 'name', type: 'text', placeholder: 'Product name', colSpan: 3 },
                { label: 'Brand', controlName: 'brand', type: 'text', placeholder: 'Product brand', colSpan: 3 },
                { label: 'Price', controlName: 'price', type: 'number', placeholder: 'Product price', colSpan: 3 },
                { label: 'Count In Stock', controlName: 'countInStock', type: 'number', placeholder: 'Product count in stock', colSpan: 3 },
                { label: 'Category', controlName: 'category', type: 'select', options: this.catagories, colSpan: 3 },
                { label: 'Main Image', controlName: 'image', type: 'file', placeholder: 'Select an image', accept: 'image/*', colSpan: 3 },
                { label: 'Is Featured', controlName: 'isFeatured', type: 'toggle', colSpan: 3 },
                { label: 'Description', controlName: 'description', type: 'text', placeholder: 'Category description', colSpan: 7 },
                { label: 'More Description', controlName: 'richDescription', type: 'textarea', placeholder: '', colSpan: 10 },
              ];
          });
      }
  

      onSubmit() {
        this.productForm.markAllAsTouched()
        if (this.productForm.invalid) return;

        const productFormData = new FormData();
        Object.keys(this.productForm.controls).forEach(key => {
            const control = this.productForm.get(key);
            if (control) {
                if (key === 'image' && control.value instanceof File) {
                    productFormData[key] = control.value.name;
                } 
                if (key === 'category'){
                    let category = this.allCategories.find((cat) => { 
                        return cat.name.toLowerCase() === control.value.toLowerCase();
                    });
                    if (category) {
                        productFormData[key] = category.id;
                    }
                }
                else {
                    productFormData[key] = control.value;
                }
            }
          });
        if (this.editMode) {
          this._updateProduct(productFormData);
        } else {
          this._addProduct(productFormData);
        }
    }

    private _addProduct(productData: FormData) {
     this.createProductSubscription=    this.productsService
          .createProduct(productData)
          .subscribe(
            (product: Product) => {
                this.messageState =  {
              message: `Product ${product.name} updated successfully`,
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
       this.goBackToList(1000)
      }
    
      private _updateProduct(productFormData: FormData) {
       this.updateProductSubscription=  this.productsService
          .updateProduct(productFormData, this.currentProductId)
          .subscribe(
            () => {
                this.messageState =  {
                    message: `Product updated successfully`,
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
          this.goBackToList(1000)

      }
    
  
    get categoForm (){
      return this.productForm.controls
    }
    closeModal(){
      this.messageState = null
    }
  
      goBackToList(time = 500){
      timer(time).toPromise().then(()=>{
        this.location.back()
      })
    }
  
    private _checkEditMode (){
     this.router.params.subscribe((params)=>{
      if (params['id']){
        this.editMode = true
        this.currentProductId = params['id']
        this.productsService.getProduct(params['id']).subscribe((product) => {
          this.productForm.patchValue({ name: product.name });
          this.productForm.patchValue({ brand: product.brand });
          this.productForm.patchValue({ price: product.price });
          this.productForm.patchValue({ category: product.category.name.toLocaleLowerCase() });
          this.productForm.patchValue({ countInStock: product.countInStock });
          this.productForm.patchValue({ isFeatured: product.isFeatured });
          this.productForm.patchValue({ description: product.description });
          this.productForm.patchValue({ richDescription: product.richDescription });
          this.productForm.patchValue({ image: product.image });
          this.imageDisplay = product.image;
          this.productForm.get('image').setValidators([]);
          this.productForm.get('image').updateValueAndValidity();
        });
      }
     })
     this.cardContent= {
      btnsPositionStyle :"d-flex justify-content-end flex-wrap",
      title: this.editMode ? 'Edit Product' : 'Add Product',
      description: this.editMode ? 'You can edit the product' : 'You can add a product to the list',
      btns: [
        {
          action: this.onSubmit.bind(this), 
          icon: 'fa-plus',
          class: 'btn-success me-2',
          btnText: this.editMode ? 'Edit' : 'Create'
        },
        {
          action: this.goBackToList.bind(this),
          icon: 'fa-arrow-left',
          class: 'btn-warning',
          btnText: 'back'
        }
      ]
    }
    }

    get productsForm() {
        return this.productForm.controls;
      }

    onImageUpload(event: any){
        const file = event.target.files[0];
        if (file) {
          this.productForm.patchValue({ image: file });
          this.productForm.get('image').updateValueAndValidity();
          const fileReader = new FileReader();
          fileReader.onload = () => {
            this.imageDisplay = fileReader.result;
          };
          fileReader.readAsDataURL(file);
        }
       
    }

    updateImg(event){
        const file = event.target.files[0];
        if (file) {
          this.productForm.patchValue({ image: file });
          this.productForm.get('image').updateValueAndValidity();
          const fileReader = new FileReader();
          fileReader.onload = () => {
            this.imageDisplay = fileReader.result;
          };
          fileReader.readAsDataURL(file);
        }
    }

      onCancle() {
        this.location.back();
      }

      ngOnDestroy(): void {
        if ( this.categoriesSubscription) this.categoriesSubscription.unsubscribe()
        if (this.createProductSubscription) this.createProductSubscription.unsubscribe()
        if (this.updateProductSubscription) this.updateProductSubscription.unsubscribe()
      }
    
}