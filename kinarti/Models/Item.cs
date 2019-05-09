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

        public int BoxMaterial { get; set; }
        public int BoxMeasures { get; set; }
        public int Partitions { get; set; }
        public int Shelves { get; set; }
        public int IsDistanced { get; set; }
        public int BoxWoodDrawers { get; set; }
        public int InternalLegraBoxDrawers { get; set; }
        public int ExternalLegraBoxDrawers { get; set; }

        public int InternalScalaBoxDrawers { get; set; }
        public int ExternalScalaBoxDrawers { get; set; }
        public int FacadeMaterialTypeID { get; set; }
        public int Facade { get; set; }
        public int HingesQuantity1 { get; set; }
        public int HingesType1ID { get; set; }
        public int HingesQuantity2 { get; set; }
        public int HingesType2ID { get; set; }
        public int ExtraWallQuantity { get; set; }
        public int ExtraWallTypeID { get; set; }
        public int HandlesQuantity { get; set; }
        public int HandlesTypeID { get; set; }
        public int IronWorksQuantity1 { get; set; }
        public int IronWorksType1ID { get; set; }
        public int IronWorksQuantity2 { get; set; }
        public int IronWorksType2ID { get; set; }
        public int ExtraCostForItem { get; set; }


        public Item(int _id, int _type, float _cost, int _projectID,
                int _shelves, int _isDistanced, int  _boxWoodDrawers, 
                int _internalLegraBoxDrawers, int _externalLegraBoxDrawers, 
                int _internalScalaBoxDrawers, int _externalScalaBoxDrawers,
                int _facadeMaterialTypeID, int _facade,
                int _hingesQuantity1, int _hingesType1ID,
                int _hingesQuantity2, int _hingesType2ID,
                int _extraWallQuantity, int _extraWallTypeID,
                int _handlesQuantity, int _handlesTypeID,
                int _ironWorksQuantity1, int _ironWorksType1ID,
                int _ironWorksQuantity2, int _ironWorksType2ID,
                int _extraCostForItem
            )
        {
            ID = _id;
            ProjectID = _projectID;
            Type = _type; //will always be 1 until we add open box
            //   Cost = _cost;

            Shelves = _shelves;
            IsDistanced = _isDistanced;
            BoxWoodDrawers = _boxWoodDrawers;
            InternalLegraBoxDrawers = _internalLegraBoxDrawers;
            ExternalLegraBoxDrawers = _externalLegraBoxDrawers;
            InternalScalaBoxDrawers = _internalScalaBoxDrawers;
            ExternalScalaBoxDrawers = _externalScalaBoxDrawers;
            FacadeMaterialTypeID = _facadeMaterialTypeID;
            Facade = _facade;
            HingesQuantity1 = _hingesQuantity1;
            HingesType1ID = _hingesType1ID;
            HingesQuantity2 = _hingesQuantity2;
            HingesType2ID = _hingesType2ID;
            ExtraWallQuantity = _extraWallQuantity;
            ExtraWallTypeID = _extraWallTypeID;
            HandlesQuantity = _handlesQuantity;
            HandlesTypeID = _handlesTypeID;
            IronWorksQuantity1 = _ironWorksQuantity1;
            IronWorksType1ID = _ironWorksType1ID;
            IronWorksQuantity2 = _ironWorksQuantity2;
            IronWorksType2ID = _ironWorksType2ID;
            ExtraCostForItem = _extraCostForItem;
     
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