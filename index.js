const {json} = require('micro');
const nodemailer = require('nodemailer');
const config = require('./config').config;

module.exports = async (req, res) => {
    const js = await (json(req));
    const transporter = nodemailer.createTransport(config.mail);

    console.log(js);

    const mailSetup = {
        from: "Kartero <f4automailer@sunpowercorp.com>",
        to: js.recipient_email,
        subject: js.subject,
        html: 'I am your new Mailman, Meet Kartero.'
    }

    transporter.sendMail(mailSetup, (err, info) => {
        if(err){ return err; }
        
        console.log(info);
    })
}