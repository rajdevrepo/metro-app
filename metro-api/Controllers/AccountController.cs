using custom_endpoint.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace custom_endpoint.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SqlHelper _sqlHelper;
        public AccountController(SqlHelper sqlHelper)
        {
            _sqlHelper = sqlHelper;
        }
        [HttpPost("validate-user")]
        public async Task<IActionResult> getlogindetails([FromBody] Dictionary<string, object> parameters)
        {
            try
            {
                string resultJson = await _sqlHelper.ExecuteStoredProcedureAsync("Usp_GetLoginDetails", parameters);
                return Ok(resultJson);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
