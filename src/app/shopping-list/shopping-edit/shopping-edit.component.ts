import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
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
  index: number;

  constructor(
    // private readonly shoppingListService: ShoppingListService,
    private readonly store: Store<fromShoppingList.AppState>) { }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // Old Approach
    // this.subscription = this.shoppingListService.selectedIngredient.subscribe(
    //   (index: number) => {
    //     this.isEditMode = true;
    //     this.index = index;
    //     let ingredient = this.shoppingListService.getIngredient(index);
    //     this.shoppingEditForm.form.patchValue({
    //       'name' : ingredient.name,
    //       'amount' : ingredient.amount
    //     })
    //   }
    // );

    // Redux approach
    this.subscription = this.store.select('shoppingList').subscribe(
      (storeData: fromShoppingList.ShoppingListState) => {
        if(storeData.ingredientToBeUpdatedIndex != -1) {
          this.isEditMode = true;
          this.index = storeData.ingredientToBeUpdatedIndex;
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
    // Traditional approach
    // this.shoppingListService.addIngredient(
    //   new Ingredient(
    //     this.shoppingEditForm.value.name, 
    //     this.shoppingEditForm.value.amount
    //   )
    // );

    // Redux approach
    const ingredient = new Ingredient(
      this.shoppingEditForm.value.name,
      this.shoppingEditForm.value.amount
    );
    this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
  }

  onEditIngredient() {
    // Old approach
    // this.shoppingListService.updateIngredient(
    //   this.index,
    //   this.shoppingEditForm.value.name,
    //   this.shoppingEditForm.value.amount
    // );

    this.store.dispatch(new ShoppingListActions.EditIngredient({
      index: this.index, 
      updatedIngredient: {
        name: this.shoppingEditForm.value.name,
        amount: this.shoppingEditForm.value.amount
      }
    }));
    this.onClearIngredient();
  }

  onDeleteIngredient() {
    this.isEditMode = false;
    // Old approach
    // this.shoppingListService.deleteIngredient(this.index);

    // Redux approach
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.index));
    this.onClearIngredient();
  }

  onClearIngredient() {
    this.isEditMode = false;
    this.shoppingEditForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
