var bcrypt = require('bcrypt');
var crypto = require('crypto');
var async = require('async');

module.exports = function(router) {
  router.get('/forgot', function(req, res) {
    res.render('forgot', { title: 'Landline | Forgot Password' });
  });

  router.post('/forgot', function(req, res, next) {
    // if (!name || !password) {
    //   return done(new Error('All fields are required'));
    // }
    async.waterfall([
    //   function(done) {
    //     crypto.randomBytes(20, function(err, buf) {
    //       var token = buf.toString('hex');
    //       done(err, token);
    //     });
    //   },
      // function(token, done) {
        // TODO: Assumes Mongodb
        // User.findOne({ email: req.body.email }, function(err, user) {
        //   if (!user) {
        //     return done(new Error('No account with that email address exists.'));
        //     // return res.redirect('/forgot');
        //     // req.flash('error', 'No account with that email address exists.');
        //   }
        //   user.save(function(err) {
        //     done(err, token, user);
        //   });
        // });

        // test user
        // var user = {
        //     email: req.body.email,
        //     resetPasswordToken: token,
        //     resetPasswordExpires: Date.now() + 3600000 // 1 hour
        //   };
      // },
      // function(token, user, done) {
        // TODO: Assumes sendgrid email is setup
        // var smtpTransport = nodemailer.createTransport('SMTP', {
        //   service: 'SendGrid',
        //   auth: {
        //     user: '!!! YOUR SENDGRID USERNAME !!!',
        //     pass: '!!! YOUR SENDGRID PASSWORD !!!'
        //   }
        // });
        // var mailOptions = {
        //   to: user.email,
        //   from: 'passwordreset@landline.io',
        //   subject: 'Landline Password Reset',
        //   text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        //     'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        //     'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        //     'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        // };
        // smtpTransport.sendMail(mailOptions, function(err) {
        //   req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        //   done(err, 'done');
        // });
      // }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  });
};