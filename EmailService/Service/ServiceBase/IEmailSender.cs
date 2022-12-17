using EmailService.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EmailService.Service.ServiceBase
{
    public interface IEmailSender
    {
       Task SendEmailAsync(Message message);
    }
}
