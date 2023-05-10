import nodemailer from "nodemailer";

export const gmailSend = function gmailSend(ip, city, region, pais) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'jclogs0201@gmail.com',
          pass: 'zgcftcfqbozjassv',
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
