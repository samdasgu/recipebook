import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../model/recipe.model";
import { RecipeService } from "./recipe.service";

import { map, tap } from 'rxjs/operators';
import { LoadingBarService } from "@ngx-loading-bar/core";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, 
        private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://ng-course-recipe-book-16439-default-rtdb.firebaseio.com/recipes.json', recipes)
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-16439-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                })
            }),
            tap(recipes => this.recipeService.setRecipes(recipes))
        );
    }
}