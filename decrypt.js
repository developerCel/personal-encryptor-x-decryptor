const prompts = require('prompts');
var crypto = require('crypto');
const { json } = require('stream/consumers');

const algorithm = 'aes256';
// 95f818759d9802a6f9a5ef5edaec7b39
class Decrypt {
    constructor() { };

    static async start() {
        const response = await prompts({
            type: 'text',
            name: 'value',
            message: 'Enter string to decrypt:',
        });
        let [ivs, text] = response.value.split(":");
        let key = crypto.createHash('sha256').update(String(process.env.SECRET_KEY)).digest('base64').substr(0, 32);

        let iv = Buffer.from(ivs, "hex");
        var decipher = crypto.createDecipheriv(algorithm, key, iv);
        var decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');


        return decrypted;

    }
}

module.exports = Decrypt;