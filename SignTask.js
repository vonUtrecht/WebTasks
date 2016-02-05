var crypto = require('crypto');


module.exports = function (context, cb) {
	// pem in an application secret
	// var pem = context.secrets.pem;
	var pem = '-----BEGIN PRIVATE KEY-----MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyDgKFevtSV/HLRGH4YjL9YMNpUXdCl0FoqYoCI2amx9gPrL89lrGo8o6PIemI++fWKiQHymEud3nZ8YYfgHRHk4HZvrP7vffRawpm/zr9TnBxWEOT3c+dnOcHpxYkbTNH5WiBy4vDSLZOE1Wm9ot80ur+CA6Nmj70IrPvx63L5K4eDkdWWRsKTMQMsJOZ/mYQ9fPnUo0JSjZsiW+oliA8jHeKb/9f+HcdtZv1kaYj5B7FB1DcNd0PzA+nAIoDpDbjAegPMAlPLEvMYamDi4/QLH043v4VlvG3669ipgosx1c0xFP5m+2hb8gYJaeUzwIxlBSQoN9YhgUXADSp7dyLAgMBAAECggEAD7I5zq00vTbmKIEdZy62SAKLt3ETDlppzbbZulkx52nz8Lh4c2QhbT9UtJF3a41UDAZ9qUzR8a1enzPcxad77gNhjbceBAc5yCBOM8je2Q2yeTYgCZz4Jxt50lbhwNGk6lBIPN5GB9pqbR+PNr9tNH0eHMl2XvfwrMeSYoTmcUl7L7+Tlb6g3XrsaGdayfv3rIvIOpBlGd1ryJYB7NOczBDYkHUnXXluizALgxcDH88sy6hoQ1L1hpVkh9MyDTgVZ7wq1cJt3hT2msEoyi9EjVpZRj9BbMIbjgCjy3qAY4usncfFFkq2htQWbt4/RAnqdLK8DS4ftrikLWA50/rjAQKBgQDSOn3YOb1fW5Hy+PSFTGzpwwbAhfSrWv1gB55x9XYpnTvwq1Mle3/BtOFtExtnvajVM9k5hVap4RrN1crOmdTWM2GKD2lmZODvM7ZHqqr5+3daH679zG6kXsV07KqPkEcrxa+gQOV6oatMMBG/R/aTrCgN/Zb8jCzFDBYhtMR6KwKBgQDY0j/CHys+mi3DwSYzs4n3ww7Vg5s5FJOaZYwsEjyqAgalp3//aTE4IRt+NdUHzRvUSHTf0I4aPaD9Z/BYq3ke4JgovYx1KdvYNRGN5FYnf4+QIumXLeHsGGMuDGuP95n7KLKeLwCtqGNqlTckweR98ZtB9HxYoNlUGZuXDgDXIQKBgFu1EmK5xWeMvZ09hwWDMlvDLPXdOb9qgO9cQ3048+PxaE1zn2DRgAjTTCdV13Wo4ban2JHkHcsbnKLAKal4p8UNQvaEBJmbVhhi+ZhH1jAYx5b0DVU/0eA4S3DXMQxRhwqMQTHqPXECh4RDz+oejW0cA5kez7e5umn2/MyVW8RjAoGAKdxl3OfBpKOFxG6NHpxCPeiV+5keJeYYHU4Pww5+UeB0QhVVvA0mKI0Tzsk76Parsc+PaQrN9LkDVQl1ONlaWCDKn8sAzDoZrOOKERgNnjCdmhlzefGs1bVbqK9TMQd/3iLcYXf3rI9/KjvG2rzojXxRGmnGfCIJ85fCF2bnuKECgYAYUgWjx+ocoRjj6wKYaS2g9zUZ2h2d/Irtrteq2NNwsBHLq2G5DgYBbET5wkSysE8+Bz69mQtsJhWlV92DvbnFWJE1RSixxn3ez29+glY/cmQACuNlJANAwtQ2h6v890E5ed9eOF8LfMg1qEMuQ5KC0Xsqvhv2e/BSFGE4csJ1iA==-----END PRIVATE KEY-----';
	if (!pem) {
		return cb(new Error('PEM secret is missing'));
	}
	
	// cert is an application secret
	// var cert = context.secrets.cert;
	var cert = '-----BEGIN CERTIFICATE-----MIIDLjCCAhagAwIBAgIQuVUOm+iNdYJILXktBQSEpDANBgkqhkiG9w0BAQsFADAlMSMwIQYDVQQDExpGT1IgVEVTVElORyBQT1JQT0lTRVMgT05MWTAeFw0xNjAyMDIxMDA2MDVaFw0zOTEyMzEyMzU5NTlaMCUxIzAhBgNVBAMTGkZPUiBURVNUSU5HIFBPUlBPSVNFUyBPTkxZMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsg4ChXr7Ulfxy0Rh+GIy/WDDaVF3QpdBaKmKAiNmpsfYD6y/PZaxqPKOjyHpiPvn1iokB8phLnd52fGGH4B0R5OB2b6z+7330WsKZv86/U5wcVhDk93PnZznB6cWJG0zR+VogcuLw0i2ThNVpvaLfNLq/ggOjZo+9CKz78ety+SuHg5HVlkbCkzEDLCTmf5mEPXz51KNCUo2bIlvqJYgPIx3im//X/h3HbWb9ZGmI+QexQdQ3DXdD8wPpwCKA6Q24wHoDzAJTyxLzGGpg4uP0Cx9ON7+FZbxt+uvYqYKLMdXNMRT+ZvtoW/IGCWnlM8CMZQUkKDfWIYFFwA0qe3ciwIDAQABo1owWDBWBgNVHQEETzBNgBAAoUTm618I1gjhWbYTuIs4oScwJTEjMCEGA1UEAxMaRk9SIFRFU1RJTkcgUE9SUE9JU0VTIE9OTFmCELlVDpvojXWCSC15LQUEhKQwDQYJKoZIhvcNAQELBQADggEBALE2vP6ctdxMBSLr0muddOwDDiugEr9dzOTTB+XIlANsWKg58SGzYjdrkNmSRmYbnqJGj0kjmNCmbjcZ+C/IAE7IYak8feajJ7iDeJK+lQw2o+CFSdLkZ7azFUj0zvbFI+YWnncdnyZBHGB6mXzeoK54BXON2Wyp1YW3412c73djtu7lBrSHQoHyIm5UpGFCjQjcs+5R9O4tOlpyYcjpv/fwL0n/FzhcrXhB0EwiUNHDJ8D5dGMe0V0miRkjDAEXeIAc/ItWI15zBleYmbC0DeTXi3QhdRgkx2H77ZWURvkmMkfLg4QHCUhvPrPSEIEH237aqXE64V0/Qbk8iMUCxRs=-----END CERTIFICATE-----';
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

