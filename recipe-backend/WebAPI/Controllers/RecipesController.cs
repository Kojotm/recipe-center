using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeService recipeService;
        private readonly UserService userService;

        public RecipesController(RecipeService service, UserService userService)
        {
            recipeService = service;
            this.userService = userService;
        }

        // GET: api/Recipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DRecipe>> GetRecipe(int id)
        {
            DRecipe result = await recipeService.GetRecipeById(id);
            return new ActionResult<DRecipe>(result); 
        }

        [HttpPost("get-by-user-id")]
        public ActionResult<DRecipe[]> GetRecipeByUserId(string userId, int pageNumber = 1, int pageSize = 20)
        {
            if (int.TryParse(userId, out int id))
            {
                DRecipe[] result = recipeService.GetRecipeByUserId(id, pageNumber, pageSize);
                return new ActionResult<DRecipe[]>(result);
            }

            return BadRequest("Wrong user id");
        }

        // PUT: api/Recipes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(int id, Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            //_context.Entry(recipe).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!RecipeExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return NoContent();
        }


        [HttpPut("filter")]
        public ActionResult<DRecipe[]> Filter(RecipeFilter recipeFilter, int pageNumber = 1, int pageSize = 20)
        {
            var result = recipeService.FilterRecipes(recipeFilter, pageNumber, pageSize);
            return new ActionResult<DRecipe[]>(result);
        }

        // POST: api/Recipes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("add-recipe")]
        public ActionResult<bool> AddRecipe(AddRecipe recipe, string token)
        {
            if(!userService.CheckIfAuthorized(token))
            {
                return Unauthorized("Need a valid token");
            }

            Recipe newRecipe = recipeService.AddRecipeToRecipe(recipe);

            var success = recipeService.AddRecipe(newRecipe);
            return new ActionResult<bool>(success);
        }

        [HttpDelete("delete-recipe/{id}")]
        public ActionResult<bool> DeleteRecipe(int id)
        {
            //var recipe = recipeService.GetRecipeById(id);
            //if (recipe == null)
            //{
            //    return NotFound("No such recipe found");
            //}

            return new ActionResult<bool>(recipeService.DeleteRecipe(id));
        }

        [HttpPut("meal-plan-calculation")]
        public ActionResult<DRecipe[]> MealPlanCalculation(MealPlanCalculation mealPlanCalculation)
        {
           var result = recipeService.GetRecipesForMealPlanner(mealPlanCalculation);
            return new ActionResult<DRecipe[]>(result);
        }
    }
}
