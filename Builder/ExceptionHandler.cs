using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using COAWebService.DataModel;
using System.Configuration;

namespace COAWebService.Builder
{
    public class ExceptionHandler
    {
        private static ExceptionHandler _Instance;
        private static readonly object _Lock = new object();
        private ExceptionLog _ExceptionLog = new ExceptionLog();

        public static ExceptionHandler Instance {

            get {
                lock (_Lock) {
                    if (_Instance == null) {
                        _Instance = new ExceptionHandler();
                    }
                }
                return _Instance;
            }

        }

        public virtual void WriteExceptionLog(Exception ex, string userName, string selfDefine) {
            
            if (ex.TargetSite != null) {
                _ExceptionLog.name = ex.TargetSite.ToString();
            }
            if (ex.Message != null) {
                _ExceptionLog.message = ex.Message.ToString();
            }
            if (ex.Source != null) {
                _ExceptionLog.source = ex.Source;
            }            
            _ExceptionLog.selfDefine = selfDefine;
            _ExceptionLog.userName = userName;
            
            _ExceptionLog.createTime = DateTime.Now;

            using (var databaseContext = new DatabaseContext(ConfigurationManager.AppSettings["WritableDatabase"].ToString()))
            {
                databaseContext.ExceptionLog.Add(_ExceptionLog);
                databaseContext.SaveChanges();
            }
        }

    }
}