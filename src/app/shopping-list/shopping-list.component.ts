import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private ingredients: Observable<{ ingredients: Ingredient[]}>;
  // private ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(
    private readonly shoppingListService: ShoppingListService,
    private readonly store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    // Redux approach
    this.ingredients = this.store.select('shoppingList');

    // The old approach
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => this.ingredients = ingredients
    // );
  }

  ngOnDestroy(): void {
    // Old approach
    // this.subscription.unsubscribe();
  }

  onEditIngredient(index: number) {
    // Old approach
    // this.shoppingListService.selectedIngredient.next(index);

    // Redux approach
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
