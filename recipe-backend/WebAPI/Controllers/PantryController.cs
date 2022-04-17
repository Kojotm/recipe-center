using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PantryController : ControllerBase
    {
        private readonly RecipeService recipeService;

        public PantryController(RecipeService service)
        {
            recipeService = service;
        }

        // GET: api/Pantry/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DRecipe>> GetRecipe(int id)
        {
            DRecipe result = await recipeService.GetRecipeById(id);
            return new ActionResult<DRecipe>(result);
        }

        [HttpPut("filter")]
        public ActionResult<DRecipe[]> Filter(PantryFilter pantryFilter, int pageNumber = 1, int pageSize = 20)
        {
            var result = new DRecipe[0]; //recipeService.FilterRecipes(pantryFilter, pageNumber, pageSize);
            return new ActionResult<DRecipe[]>(result);
        }
    }
}
