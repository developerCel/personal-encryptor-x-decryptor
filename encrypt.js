const prompts = require('prompts');
var crypto = require('crypto');
const { json } = require('stream/consumers');

const algorithm = 'aes256';

class Encryptor {
    constructor() { };

    static async start() {
        const response = await prompts({
            type: 'text',
            name: 'value',
            message: 'Enter string to encrypt:',
        });
        var text = response.value;
        let key = crypto.createHash('sha256').update(String(process.env.SECRET_KEY)).digest('base64').substr(0, 32);
        var iv = crypto.randomBytes(16);

        var cipher = crypto.createCipheriv(algorithm, key, iv);
        var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

        return `${iv.toString("hex")}:${encrypted}`;

    }
}

module.exports = Encryptor;