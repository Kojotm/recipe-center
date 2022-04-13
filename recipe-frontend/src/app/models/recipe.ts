import { Difficulty } from "./difficulty";
import { NutritionInfo } from "./nutritionInfo";

export interface Recipe {
    id: number;
    name?: string | undefined;
    description?: string[] | undefined;
    ingredients?: string[] | undefined;
    categories?: string[] | undefined;
    calories?: number | undefined;
    servings?: number | undefined;
    durationInMinutes?: number | undefined;
    nutritionInfo?: NutritionInfo;
    difficulty: Difficulty;
}
