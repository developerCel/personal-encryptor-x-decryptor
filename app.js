const Encryptor = require('./encrypt');
const Decryptor = require('./decrypt');
const prompts = require('prompts');


(() => start())();
// test
async function start() {
    var loopFlag = true;
    while (loopFlag) {
        const response = await prompts({
            type: 'select',
            name: 'value',
            message: 'Select your action:',
            choices: [
                { title: 'Encrypt', description: 'Encrypt Password', value: true },
                { title: 'Decrypt', description: 'Decrypt Password', value: false },
            ],
            initial: 0
        });

        if (response.value) {
            const result = await Encryptor.start();
            console.log(`Your encrypted string: ${result}`);
        } else {
            const result = await Decryptor.start();
            console.log(`Your decrypted string: ${result}`);

        }

        const confirm = await prompts({
            type: 'toggle',
            name: 'value',
            message: 'Continue?',
            initial: true,
            active: 'yes',
            inactive: 'no'
        });
        loopFlag = confirm.value;
    }
}