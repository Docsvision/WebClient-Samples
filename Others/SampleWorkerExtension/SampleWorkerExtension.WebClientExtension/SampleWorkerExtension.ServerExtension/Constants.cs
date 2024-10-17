using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServerExtension
{
    public static class Constants
    {
        public static readonly Guid SampleSomeEventId = new Guid("B2C6F070-C7F1-4F07-914F-94652804DD1C");

        public static class Fields
        {
            public const string ConcurrentFieldAlias = "Concurrent";
            public const string TypeIdFieldAlias = "TypeID";
            public const string AutoSendToSelfFieldAlias = "AutoSendToSelf";
            public const string SubTypeIdFieldAlias = "SubTypeID";
            public const string DataFieldAlias = "Data";
            public const string CreateDateFieldAlias = "CreateDate";
            public const string ObjectIdFieldAlias = "ObjectID";
        }
    }
}