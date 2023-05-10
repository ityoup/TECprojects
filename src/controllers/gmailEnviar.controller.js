import nodemailer from "nodemailer";
import { con } from "../controllers/db.js";

async function userGmail(usuario) {
  let [resultado] = await con.query('select * from userGmail;');
  console.log(resultado[0].usuario);
}

export const gmailSend = function gmailSend(ip, city, region, pais) {
  
  
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: userGmail(`user`),
          pass: userGmail(`pass`),
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
