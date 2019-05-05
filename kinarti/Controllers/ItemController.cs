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

    public class ItemController : ApiController
    {
        //[System.Web.Http.HttpGet]
        //[Route("api/items")]
        //public IEnumerable<Item> GeItem()
        //{
        //    Item item = new Item();
        //    List<Item> lm = item.getItems();
        //    return lm;
        //}

        // POST api/values
        [HttpPost]
        [Route("api/item")]
        public void Post([FromBody]Item p)
        {
            try
            {
                p.insert();   //    int someError = Convert.ToInt32("will fail to convert");
            }
            catch (Exception e)
            {
                throw e; // throw new Exception("Error in posting a new item");
            }
        }


        [HttpPut]
        [Route("api/item")]
        public void Put([FromBody]Item p, int Id)
        {
            p.updateItem(Id);
        }

    }
}