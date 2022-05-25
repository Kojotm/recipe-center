namespace Models
{
    public class AddRecipe
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Ingredients { get; set; }
        public string Categories { get; set; }
        public int Calories { get; set; }
        public int Servings { get; set; }
        public int DurationInMinutes { get; set; }
        public double Sodium { get; set; }
        public double Protein { get; set; }
        public double Fats { get; set; }
        public int UserId { get; set; }
    }
}
