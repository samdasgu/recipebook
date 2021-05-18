import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient.model';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form', {static: true}) shoppingEditForm: NgForm;
  subscription: Subscription;
  isEditMode = false;

  constructor(
    private readonly store: Store<fromShoppingList.AppState>) { }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(
      (storeData: fromShoppingList.ShoppingListState) => {
        if(storeData.ingredientToBeUpdatedIndex != -1) {
          this.isEditMode = true;
          let ingredient = storeData.ingredientToBeUpdated;
          this.shoppingEditForm.form.patchValue({
            'name' : ingredient.name,
            'amount' : ingredient.amount
          })
        } else {
          this.isEditMode = false;
        }
      } 
    )
  }

  onAddIngredient() {
    const ingredient = new Ingredient(
      this.shoppingEditForm.value.name,
      this.shoppingEditForm.value.amount
    );
    this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
  }

  onEditIngredient() {
    this.store.dispatch(new ShoppingListActions.EditIngredient(<Ingredient>{
        name: this.shoppingEditForm.value.name,
        amount: this.shoppingEditForm.value.amount
      }
    ));
    this.onClearIngredient();
  }

  onDeleteIngredient() {
    this.isEditMode = false;
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClearIngredient();
  }

  onClearIngredient() {
    this.isEditMode = false;
    this.shoppingEditForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
