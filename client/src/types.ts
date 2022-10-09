export interface Record {
  id: string;
  date: string;
  meal_type: string;
  dish: string;
  ingredient: string;
  fats_per_100: number;
  carbs_per_100: number;
  proteins_per_100: number;
  quantity: number;
  unit: "g" | "ml";
}
