const {json} = require('micro');
const nodemailer = require('nodemailer');
const config = require('./config').config;

module.exports = async (req, res) => {
    const js = await (json(req));
    const transporter = nodemailer.createTransport(config.mail);
    const filePath = './static/' + js.filename 

    /** In order to attach file in email, ssh through the server, move the file you want to attach to "~App/kartero/static/" and use its filename in curl or POST request. */
    const mailSetup = {
        from:  js.sender,
        to: js.recipient_email,
        subject: js.subject,
        text: js.message,
        attachments: { filename: js.filename, path: filePath }
    }
    
    transporter.sendMail(mailSetup, (err, info) => {
        if(err){ return res.end(err + ' error sending email.') }
        res.end('Successfully sent to ' + info.accepted);
    })
}