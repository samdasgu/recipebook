import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../../model/recipe.model';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit {

  @Input('recipe') recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
