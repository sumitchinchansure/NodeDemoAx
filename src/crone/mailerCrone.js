// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');
const wishService = require('../services/wishService')

// Function for sending the mail after every 15 senconds.
function sentValidRequestMail() {
    try {
        var textBody = getWishText();
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_ACC_USERNAME,
                pass: process.env.MAIL_ACC_PASSWORD
            }
        });

        // Message object
        let message = {
            from: process.env.MAIL_SENDER,
            to: process.env.MAIL_RECEIVER,
            subject: process.env.MAIL_SUBJECT,
            text: textBody
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    } catch (error) {
        console.log('Error in sending email: ', error);
    }
}

// Function for converting the valid request in to plain text.
function getWishText() {

    const validRequests = wishService.validRequests;
    var plainText = "No NEW Requests are Available...!!!";

    console.log("LENTH OF LIST :" + validRequests.length);

    if (validRequests.length > 0) {
        plainText = "";
        for (let index = 0; index < validRequests.length; index++) {
            plainText = '\n' + plainText + 'username :' + validRequests[index].username + ', address :' + validRequests[index].address +
                ', freeText :' + validRequests[index].wishText + '\n';
        }
    }

    return plainText;
}

module.exports = {
    sentValidRequestMail
}


