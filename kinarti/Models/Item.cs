using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Data;
using System.Text;
using System.Web.Http;

namespace kinarti.Models
{
    public class Item
    {
        public int ID { get; set; }
        public int Type { get; set; }
        public float Cost { get; set; }
        public int ProjectID { get; set; }

        public Item(int _id, int _type, float _cost, int _projectID)
        {
            ID = _id;
            ProjectID = _projectID;
            Type = _type;
            Cost = _cost;
        }
        public Item()
        {
        }
        public int insert()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.insertItem(this);
            return numAffected;
        }
        //--------------------------------------------------------------------------
        // get the list of the boxes
        ////--------------------------------------------------------------------------
        //public List<Handle> getHandles()
        //{
        //    DBservices dbs = new DBservices();
        //    List<Handle> lp = dbs.getHandles("PriceITConnectionString", "handleTbl");
        //    return lp;
        //}

        public int updateItem(int Id)
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.updateItem(this, Id);
            return numAffected;
        }

    }
}