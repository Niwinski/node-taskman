const sgmail = require("@sendgrid/mail");

const sendgridKey = process.env.SENDGRID_API_KEY;

sgmail.setApiKey(sendgridKey);

// sgmail.send();

// sgmail
//     .send({
//         to: "tom@ea.com",
//         from: "tom@ea.com",
//         subject: "Sending with SendGrid is Fun",
//         text: "foobar mcgivens.js",
//         html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//     })
//     .then(() => {
//         console.log("Email sent");
//     })
//     .catch((error) => {
//         console.error(error);
//     });

const sendWelcomeMail = (email, name) => {
    sgmail.send({
        to: email,
        from: "tom@ea.com",
        subject: "Welcome to the TaskMan App",
        text: `bam, ${name} you're here`,
        //        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    });
};

const sendGoodbyeEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: "tom@ea.com",
        subject: "Goodbye buddy!",
        text: `we will miss you, ${name} you're here ${email}`,
        //        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    });
};

module.exports = { sendWelcomeMail, sendGoodbyeEmail };
