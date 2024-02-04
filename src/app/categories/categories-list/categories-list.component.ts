import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = []
  isAscendingOrder = true;
  isDialogShow = false
  currentId : string 

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
    title:"Categories" ,
    btnsPositionStyle:"btn-group",
    description: "List of all Categories",
    btns: [{routeTo: './form', icon: 'fa-plus', class: 'btn-success', btnText: 'New'}]
  }
  
  tableBtns= [
    {
      class: 'btn btn-primary me-2',
      action: this.editCategory.bind(this),
      icon: 'fa-solid fa-pen-to-square'

    }, 
    {
      class: 'btn btn-danger',
      action: this.deleteCategory.bind(this),
      icon: 'fa-solid fa-trash'
    }
  ]

  categoriesSbuscription: Subscription


  constructor(private categoriesService: CategoriesService, private router: Router){}
  ngOnInit() : void{
    this._getCategories()
  }
  

  editCategory(categoryId: string){
   this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  deleteCategory(categoryId: string){
    this.currentId = categoryId
    this.isDialogShow = true
    this.dialogContent = {
      title: 'Are you sure you would like to delete this category?', 
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
    if (ans){
  this.categoriesService.deleteCategory(this.currentId).subscribe(response=>{
      this.messageState =  {
        message: 'Category was deleted successfully',
        class: 'success'
      }
      this._getCategories()
    }, ()=>{
      this.messageState =  {
        message: 'Something went wrong. Please try again later',
        class: 'warning'
      }
    })
    }
   this.dialogContent = null
  }

  private _getCategories(){
   this.categoriesSbuscription =  this.categoriesService.getCategories().subscribe((categories: Category[])=>{
      this.categories = categories
     })
  }
  closeModal(){
    this.messageState = null
  }
  sortByName(): void {
    this.categories.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (this.isAscendingOrder) {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });
    this.isAscendingOrder = !this.isAscendingOrder;
}


ngOnDestroy(){
  if (this.categoriesSbuscription) this.categoriesSbuscription.unsubscribe()
}

}
