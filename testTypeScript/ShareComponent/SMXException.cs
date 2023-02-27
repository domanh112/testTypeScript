using System;
using System.Collections.Generic;
using System.Text;

namespace testTypeScript.ShareComponent
{
    public class SMXException : Exception
    {
        public List<string> ListMessage { get; set; }
        public override string Message
        {
            get
            {
                string text = ((!string.IsNullOrWhiteSpace(base.Message)) ? base.Message : GetString(ListMessage));
                if (base.InnerException != null)
                {
                    text += base.InnerException!.Message;
                }

                return text;
            }
        }
        public SMXException(List<string> lstMessage)
            : base(string.Empty)
        {
            ListMessage = lstMessage;
        }

        private string GetString(List<string> lstMessage)
        {
            if (lstMessage == null || lstMessage.Count == 0)
            {
                return string.Empty;
            }

            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 0; i < lstMessage.Count - 1; i++)
            {
                stringBuilder.AppendLine(lstMessage[i]);
            }

            stringBuilder.Append(lstMessage[lstMessage.Count - 1]);
            return stringBuilder.ToString();
        }
    }
}
