import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Debug from 'debug';
import nodemailer from 'nodemailer';


dotenv.config();
const debug = Debug('http');


dotenv.config();

module.exports = {

encodeToken: (id, email, admin) => {
const payload = { id, email, admin };
const option = { expiresIn: '1d' };
const secret = process.env.SECRET_KEY;
return jwt.sign(payload, secret, option);
    },
    sendMail: (res, mailOption) => {
try {
const transport = nodemailer.createTransport({
service: process.env.MAILER_SERVICE,
auth: {
user: process.env.MAILER_EMAIL,
pass: process.env.MAILER_PASS,
},
});
transport.sendMail(mailOption, (err, info) => {
if (err) debug(err);
else debug(info);
});
} catch (err) {
    res.status(500).json({
        status: 500,
        error: 'Server error',
      });
}
}
};
