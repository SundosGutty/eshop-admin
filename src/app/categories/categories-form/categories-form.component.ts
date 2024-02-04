import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, OnDestroy  {
  categoriesForm!:  FormGroup
  editMode = false
  currentCategoryId: string = null
  messageState!: {
    message: string,
    class: string
  } | null

formFields = [
    { label: 'Name', controlName: 'name', type: 'text', placeholder: 'Category name', colSpan: 3 },
    { label: 'Icon', controlName: 'icon', type: 'text', placeholder: 'Category icon', colSpan: 3 },
    { label: 'Color', controlName: 'color', type: 'color',  colSpan: 3 },
  ];

  cardContent: {}
  createCategorySubscription: Subscription
  updateCategorySubscription: Subscription
  categoriesSubscription: Subscription

  constructor(private fb: FormBuilder, private categoriesService: CategoriesService, private location: Location, private router: ActivatedRoute, private route : Router){}

  ngOnInit(){
   this.categoriesForm = this.fb.group({
    name:  ['', Validators.required], 
    icon: ['', Validators.required],
    color: ['#a95a5a', Validators.required]
   })
   this._checkEditMode()
  }

  onSubmit(){
    this.categoriesForm.markAllAsTouched()
   if (this.categoriesForm.valid){
    const category:  Category  = {
      id: this.currentCategoryId,
      name: this.categoriesForm.get('name')?.value,
      icon: this.categoriesForm.get('icon')?.value,
      color:  this.categoriesForm.get('color')?.value
    }
    if(this.editMode){
      this._updateCategory(category)

    }else{
      this._addCategory(category)

    }
  }
  }
  private _addCategory(category : Category){
   this.createCategorySubscription =  this.categoriesService.createCategory(category).subscribe(category =>{
      this.messageState =  {
        message: `Category ${category.name} added successfully`,
        class: 'success'
      }
     },
     (error)=>{
      this.messageState =  {
        message: 'Something went wrong. Please try again later',
        class: 'warning'
      }
     })
     this.goBackToList()
  }

  private _updateCategory(category : Category){
    this.updateCategorySubscription =  this.categoriesService.updateCategory(category).subscribe(category =>{
      this.messageState =  {
        message: `Category ${category.name} updated successfully`,
        class: 'success'
      }
     },
     ()=>{
      this.messageState =  {
        message: 'Something went wrong. Please try again later',
        class: 'warning'
      }
     })
     this.goBackToList()
  }

  get categoForm (){
    return this.categoriesForm.controls
  }
  closeModal(){
    this.messageState = null
  }

  goBackToList(){
    timer(500).toPromise().then(done=>{
      this.location.back()
    })
  }

  private _checkEditMode (){
   this.router.params.subscribe((params)=>{
    if (params['id']){
      this.editMode = true
      this.currentCategoryId = params['id']
     this.categoriesSubscription =  this.categoriesService.getCategory(params['id']).subscribe((category) => {
        this.categoriesForm.patchValue({ name: category.name });
        this.categoriesForm.patchValue({ icon: category.icon });
        this.categoriesForm.patchValue({ color: category.color });
      });
    }
   })
   this.cardContent= {
    btnsPositionStyle :"d-flex justify-content-end flex-wrap",
    title: this.editMode ? 'Edit Category' : 'Add Categories',
    description: this.editMode ? 'You can edit the category' : 'You can add a category to the list',
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

  ngOnDestroy(): void {
    if (this.createCategorySubscription) this.createCategorySubscription.unsubscribe()
    if (this.updateCategorySubscription)  this.updateCategorySubscription.unsubscribe()
    if (this.categoriesSubscription) this.categoriesSubscription.unsubscribe()      
  }

  

}
