import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../model/recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];

    getRecipes() : Recipe[] {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        if(!recipes) {
            return;
        }
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipeById(id: number): Recipe {
        return this.getRecipes().find(recipe => recipe.id == id);
    }

    addRecipe(recipe: Recipe) {
        if(recipe.id === undefined) {
            recipe.id = this.recipes.length + 1;
            this.recipes.push(recipe);
        } else {
            const recipeToBeUpdated: Recipe = this.getRecipeById(recipe.id);
            recipeToBeUpdated.name = recipe.name;
            recipeToBeUpdated.imagePath = recipe.imagePath;
            recipeToBeUpdated.description = recipe.description;
            recipeToBeUpdated.ingredients = recipe.ingredients;
        }
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(recipeId: number) {
        const updatedRecipes = this.recipes.filter(recipe => recipe.id !== recipeId);
        this.recipes = updatedRecipes;
        this.recipesChanged.next(this.recipes.slice());
    }

}