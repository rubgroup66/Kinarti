using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using kinarti.Models;
using System.IO;
using System.Web;
using System.Web.Hosting;

namespace kinarti.Controllers
{

    public class ProjectController : ApiController
    {

        [Route("api/Proj")]
        public void Post([FromBody]Project proj)
        {
            proj.insertProject();
        }

        [HttpGet]
        [Route("api/proj")]
        public IEnumerable<Project> Get()
        {
            Project proj = new Project();
            List<Project> projectList = proj.GetProjects();
            return projectList;
        }

    }
}
