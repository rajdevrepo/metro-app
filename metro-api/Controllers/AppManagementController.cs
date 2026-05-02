using custom_endpoint.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace custom_endpoint.Controllers
{
    [Route("api/appmanagement")]
    [ApiController]
    public class AppManagementController : ControllerBase
    {
        private readonly SqlHelper _sqlHelper;
        public AppManagementController(SqlHelper sqlHelper)
        {
            _sqlHelper = sqlHelper;
        }
        [HttpPost("getstationlist")]
        public async Task<IActionResult> get_stationlist([FromBody] Dictionary<string, object> parameters)
        {
            try
            {
                string resultJson = await _sqlHelper.ExecuteStoredProcedureAsync("USP_GetStationName", parameters);
                return Ok(resultJson);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
        [HttpPost("insert-newrequest")]
        public async Task<IActionResult> ins_newrequest([FromBody] Dictionary<string, object> parameters)
        {
            try
            {
                string resultJson = await _sqlHelper.ExecuteStoredProcedureAsync("USP_AddNewApplication", parameters);
                return Ok(resultJson);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
        [HttpPost("get-pendingapproval")]
        public async Task<IActionResult> get_pendingapproval([FromBody] Dictionary<string, object> parameters)
        {
            try
            {
                string resultJson = await _sqlHelper.ExecuteStoredProcedureAsync("USP_Get_PendingforApproval", parameters);
                return Ok(resultJson);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
        [HttpPost("get-requestapplndetl")]
        public async Task<IActionResult> get_requestapplndetl([FromBody] Dictionary<string, object> parameters)
        {
            try
            {
                string resultJson = await _sqlHelper.ExecuteStoredProcedureAsync("USP_Get_RequestApplnDetl", parameters);
                return Ok(resultJson);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
        [HttpPost("insert-newrequest-approval")]
        public async Task<IActionResult> ins_newrequest_approval([FromBody] Dictionary<string, object> parameters)
        {
            try
            {
                string resultJson = await _sqlHelper.ExecuteStoredProcedureAsync("USP_Ins_RequestApproval", parameters);
                return Ok(resultJson);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
        [HttpPost("get-categorywisecount")]
        public async Task<IActionResult> get_categorywisecount([FromBody] Dictionary<string, object> parameters)
        {
            try
            {
                string resultJson = await _sqlHelper.ExecuteStoredProcedureAsync("USP_GetCatWiseCount", parameters);
                return Ok(resultJson);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
