import { Ingredient } from "../../model/ingredient.model";
import * as ShoppingListAction from "./shopping-list.action";

export interface AppState {
    shoppingList: ShoppingListState
}

export interface ShoppingListState {
    ingredients: Ingredient[],
    ingredientToBeUpdated: Ingredient,
    ingredientToBeUpdatedIndex: number
}

const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 10)
    ],
    ingredientToBeUpdatedIndex: -1,
    ingredientToBeUpdated: null
};

export function shoppingListReducer(
    state = initialState, 
    action: ShoppingListAction.ShoppingListActions): ShoppingListState {

    switch(action.type) {
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        
        case ShoppingListAction.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }

        case ShoppingListAction.EDIT_INGREDIENT:
            const updatedIngredientIndex = action.payload.index;
            const updatedIngredient: Ingredient = {
                ...state.ingredients[updatedIngredientIndex],
                ...action.payload.updatedIngredient
            };
            const updatedIngredientList = [...state.ingredients];
            updatedIngredientList[updatedIngredientIndex] = updatedIngredient;
            return{
                ...state,
                ingredients: updatedIngredientList
            }

        case ShoppingListAction.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ing, ingIndex) => {
                    return ingIndex !== action.payload
                })
            }

        case ShoppingListAction.START_EDIT:
            return {
                ...state,
                ingredientToBeUpdatedIndex: action.payload,
                ingredientToBeUpdated: {...state.ingredients[action.payload]}
            }

        case ShoppingListAction.STOP_EDIT:
            return {
                ...state,
                ingredientToBeUpdated: null,
                ingredientToBeUpdatedIndex: -1
            }
        default:
            return state;
    }
}