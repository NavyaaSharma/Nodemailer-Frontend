var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
	res.render('index');
});

app.get('/index', function (req, res) {
	res.render('index');
});


app.get('/contact', function (req, res) {
	res.render('contact');
});

app.post('/contact/send', function (req, res) {
	var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true, // use SSL
		auth: {
			user: 'nodemailer007@gmail.com', //enter email you want to send mail from,
			pass: 'qddvvqqirwegpjsu' //enter passsword
		},
		tls: {
			rejectUnauthorized: false,
		}
	});

	var mailOptions = {
		from: '"Nodemailer Bot" <nodemailer007@gmail.com>',
		to: req.body.email,
		subject: req.body.subject,
		text: 'New Mail! Name: ' + req.body.name + 'Email: ' + req.body.email + 'Message: ' + req.body.message,
		html: '<p>New Mail!</p><ul><li>' + req.body.message + '</li></ul>'
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			res.status(401);
			res.redirect('/');
		} else {
			console.log('Message Sent: ' + info.response);
			res.status(200);
			res.redirect('/');
		}
	});
});
port = process.env.PORT || 3000;
app.listen(port);
console.log('Server is running on' + port);