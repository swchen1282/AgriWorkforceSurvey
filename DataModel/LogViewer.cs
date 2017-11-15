using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace COAWebService.DataModel
{
    public class LogViewer
    {
        public string farmerId { get; set; }

        public string userName { get; set; }

        public string fullName { get; set; }

        public int? readErrorLength { get; set; }

        public int? writeErrorLength { get; set; }

        public int? correct { get; set; }

        public string updateTime { get; set; }

        public int quantity { get; set; }

    }
}