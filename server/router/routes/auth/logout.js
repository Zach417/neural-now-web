var path = require('path');

module.exports = function (app) {

	app.use('/auth/sign-out', function (req, res) {
		res.clearCookie('accessToken');
			return res.json({
				success: true,
				message: "Sign out succeeded.",
			});
	});

}
