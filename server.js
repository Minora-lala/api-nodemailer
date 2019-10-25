let express = require("express"),
  nodeMailer = require('nodemailer'),
  bodyParser = require('body-parser');

let app = express();

app.use(express.static('pages'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// création du transporteur de nodemailer avec utilisation de Gmail comme serveur SMTP
app.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          // Attention ne laisser pas vos mot de pass en clair.
          // A CHANGER POUR VOTRE ADRESSE MAIL
          user: 'MyAccount@gmail.com',
          pass: '4w3s0m3P4ssw0rd'
      }
  });
        // Les options d'envoye du mail
    let mailOptions = {
        // d'où vient le message
        from: 'Salon du seminaire 👥 <seminaire@nodemailer.fr>', // sender address
        // Sur qu'elle adresse il va être envoyer
        to: 'contact@mon-entreprise.fr',
        // La forme du mail
        subject: req.body.subject,
        text: req.body.message,
        html: '<b>' + req.body.message + '</b>'
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.writeHead(301, { Location: 'index.html' });
    res.end();
});

let server = app.listen(3000, function(){
    let port = server.address().port;
    console.log("Server started at localhost", port);
});
