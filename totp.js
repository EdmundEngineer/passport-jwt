const totp = require("totp-generator");
const keygen = require("keygenerator");
const key = keygen._();
const token = totp(key, {
	digits: 4,
	algorithm: "SHA-512",
	period: 60,
	timestamp: 1465324707000,
});
console.log(token);