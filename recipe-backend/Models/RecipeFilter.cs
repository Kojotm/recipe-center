namespace Models
{
    public class RecipeFilter
    {
        public string SearchPhrase { get; set; }
        public int? MaxCalories { get; set; } = null;
        public int? MaxDurationInMinutes { get; set; } = null;
        public int? MinServings { get; set; } = null;
        public Difficulty Difficulty { get; set; }
    }
}
