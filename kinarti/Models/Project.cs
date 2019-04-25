using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data.SqlClient;
using System.Web.Configuration;
using System.Data;

using System.Text;


namespace kinarti.Models
{
    public class Project
    {
        public string project_name { get; set; }
        public DateTime create_date { get; set; }
        public string description { get; set; }
        public int cost { get; set; }
        public int status { get; set; }
        public string customer_name { get; set; }

        public Project(string _project_name, DateTime _create_date, string _description, int _cost, int _status, string _customer_name)
        {
            project_name = project_name;
            create_date = _create_date;
            description = _description;
            cost = _cost;
            status = _status;
            customer_name = _customer_name;
        }

        public Project()
        {

        }

        public int insertProject()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.insertProject(this);
            return numAffected;
        }

        public List<Project> GetProjects()
        {
            DBservices db = new DBservices();
            List<Project> projectsList = new List<Project>();
            projectsList = db.GetProjects();
            return projectsList;
        }

        //    public List<Customer> GetCustomers()
        //    {
        //        DBservices db = new DBservices();
        //        List<Customer> customerList = new List<Customer>();
        //        customerList = db.GetCustomers();
        //        return customerList;
        //    }

        //    public void Put(Customer c)
        //    {
        //        DBservices db = new DBservices();
        //        db.Put(c);
        //    }

        //    public void DeleteCust(string custID)
        //    {
        //        DBservices db = new DBservices();
        //        db.DeleteCust(custID);
        //    }
        //}
    }
}
