import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../model/ingredient.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.action";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    selectedIngredient = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 10)
      ];


    constructor(private readonly store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {}

    getIngredient(index: number) : Ingredient {
        return this.ingredients[index];
    }

    getIngredients() : Ingredient[]{
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // Old traditional approach
        // this.ingredients.push(...ingredients);
        // this.ingredientsChanged.next(this.ingredients.slice());
        
        // Redux approach
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    updateIngredient(index: number, name: string, amount: number) {
        const ingredientToBeUpdated = this.getIngredient(index);
        ingredientToBeUpdated.name = name;
        ingredientToBeUpdated.amount = amount;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}