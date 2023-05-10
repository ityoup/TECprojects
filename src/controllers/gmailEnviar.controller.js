import nodemailer from "nodemailer";
import { con } from "../controllers/db.js";

async function userGmail(acc) {
  let [resultado] = await con.query('select * from userGmail;');
 let cuentas = resultado[0].acc;
 console.log(cuentas);
}

export const gmailSend = function gmailSend(ip, city, region, pais) {
  let user = "user";
  let pass = "pass"
  
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: userGmail('user'),
          pass: userGmail('pass'),
        },
      });
    
      var mailOptions = {
        from: 'jclogs0201@gmail.com',
        to: 'jclizarraga@velasresorts.com', 
        subject: 'Ha entrado alguien a login.jclizarraga.com',
        text: `La ip: ${ip}\n Ciudad: ${city},\n Region: ${region},\n Pais: ${pais}`
      };
        
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado a: ' + JSON.stringify(info.envelope.to[0]));
        }
      });
}
