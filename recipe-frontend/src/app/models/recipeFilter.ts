import { Difficulty } from "./difficulty";

export class RecipeFilter {
    searchPhrase = "";
    maxCalories? = null;
    maxDurationInMinutes? = null;
    minServings? = null;
    difficulty = Difficulty.None;
}
