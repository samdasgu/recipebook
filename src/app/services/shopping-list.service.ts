import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Ingredient } from "../model/ingredient.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.action";
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";

@Injectable({providedIn: 'root'})
export class ShoppingListService {

    constructor(private readonly store: Store<fromShoppingList.AppState>) {}

    addIngredients(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

}