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
        //cc
        [HttpGet]
        [Route("api/proj")]
        public IEnumerable<Project> Get()
        {
            Project proj = new Project();
            List<Project> projectList = proj.GetProjects();
            return projectList;
        }

        //[HttpGet]
        //[Route("api/filter")]
        //public IEnumerable<Project> filterProj(Project status)
        //{
        //    Project P = new Project();
        //    return P.filter(status);
        //}
        
        [HttpPost]
        [Route("api/filter")]
        public IEnumerable<Project> filterProj(Filter status)
        {
           
            
          
            Project p = new Project();
            List<Project> projectList = p.filter(status);


            return projectList;

        }
        [HttpPost]
        [Route("api/filter/cust")]
        public IEnumerable<Project> filtercust(Filter cust)
        {
            Project p = new Project();
            List<Project> projectList = p.filterC(cust);

            return projectList;
        }
        [HttpPost]
        [Route("api/filter/price")]
        public IEnumerable<Project> filterprice(Filter price)
        {
            Project p = new Project();
            List<Project> projectList = p.filterC(price);

            return projectList;
        }
    }
}
