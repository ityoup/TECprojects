import nodemailer from "nodemailer";

export const gmailSend = function gmailSend(ip, city, region, pais) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'lizarraga.juan.1gv@gmail.com',
          pass: 'ktqgnsmqhdyqvmdg',
        },
      });
    
      var mailOptions = {
        from: 'lizarraga.juan.1gv@gmail.com',
        to: 'pv190116676@vallarta.tecmm.edu.mx', 
        subject: 'Ha entrado alguien a login.jclizarraga.com',
        text: `La ip:${ip} Ciudad: ${city}, Region: ${region}, Pais: ${pais}`
      };
        
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado a: ' + JSON.stringify(info.envelope.to[0]));
        }
      });
}
