var crypto = require('crypto');


module.exports = function (context, cb) {
	// pem in an application secret
	var pem = context.secrets.pem;
	if (!pem) {
		return cb(new Error('PEM secret is missing'));
	}
	
	// cert is an application secret
	var cert = context.secrets.cert;
	if (!cert) {
		return cb(new Error('CERT secret is missing'));
	}
	
	if (context.data.function == 'sign') {
		cb(null, sign(context.data.data, pem));
	}
	else if (context.data.function == 'verify') {
		cb(null, verify(context.data.data, context.data.signature, cert));
	}
	else {
		console.log('Invalid parameters');
	}

	cb(null, 'Done');
	
	// Helper functions
	function sign(data, pem) {
		console.log('data: ' + data + '; pem: ' + pem);
		var sign = crypto.createSign('RSA-SHA256');
		sign.update(data);
		
		// sign.sign returns the actual signature, which we return to the caller.
		var sig = sign.sign(pem, 'binary');
		return sig;
	}
	
	function verify(data, signature, cert) {
		var verify = crypto.createVerify('RSA-SHA256');
		verify.update(data);
		
		// Verify.verify returns 'true' if the signature matches, 'false' otherwise.
		var ver = verify.verify(cert, signature, 'binary');
		return ver;
	}
};

