var async = require('async');

module.exports = function(router) {
  router.get('/reset/:token', function(req, res) {
  	// TODO: Assumes Mongodb
	// User.findOne({
	// 	resetPasswordToken: req.params.token,
	// 	resetPasswordExpires: {
	// 		$gt: Date.now()
	// 	}
	// }, function(err, user) {
	// 	if (!user) {
	// 		// req.flash('error', 'Password reset token is invalid or has expired.');
	// 		// return res.redirect('/forgot');
	// 		return done(new Error('Password reset token is invalid or has expired.'));
	// 	}
		res.render('reset', {
			user: req.user
		});
	// });
  });

  router.post('/reset/:token', function(req, res) {
	async.waterfall([
		// function(done) {
			// TODO: Assumes Mongodb
			// User.findOne({
			// 	resetPasswordToken: req.params.token,
			// 	resetPasswordExpires: {
			// 		$gt: Date.now()
			// 	}
			// }, function(err, user) {
			// 	if (!user) {
			// 		req.flash('error', 'Password reset token is invalid or has expired.');
			// 		return res.redirect('back');
			// 	}

			// 	user.password = req.body.password;
			// 	user.resetPasswordToken = undefined;
			// 	user.resetPasswordExpires = undefined;

			// 	user.save(function(err) {
			// 		req.logIn(user, function(err) {
			// 			done(err, user);
			// 		});
			// 	});
			// });
		// },
		// function(user, done) {
		// TODO: Assumes sendgrid email is setup
		// 	var smtpTransport = nodemailer.createTransport('SMTP', {
		// 		service: 'SendGrid',
		// 		auth: {
		// 			user: '!!! YOUR SENDGRID USERNAME !!!',
		// 			pass: '!!! YOUR SENDGRID PASSWORD !!!'
		// 		}
		// 	});
		// 	var mailOptions = {
		// 		to: user.email,
		// 		from: 'passwordreset@demo.com',
		// 		subject: 'Your password has been changed',
		// 		text: 'Hello,\n\n' +
		// 			'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
		// 	};
		// 	smtpTransport.sendMail(mailOptions, function(err) {
		// 		req.flash('success', 'Success! Your password has been changed.');
		// 		done(err);
		// 	});
		// }
	], function(err) {
		res.redirect('/login');
	});
  });
};