import { prompt, ui } from 'inquirer';
import { setTimeout } from 'node:timers/promises';

(async (...args: string[]) => {

    await prompt([{
        type: 'confirm',
        name: 'gotologin',
        message: 'Login?'
    }]);

    setTimeout(50);

})(...process.argv.splice(2));

