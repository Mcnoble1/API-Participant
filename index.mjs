import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();

console.log('Creating a Starting balance');
const startingBalance = stdlib.parseCurrency(100);

const accAlice = await stdlib.newTestAccount(startingBalance);
console.log('Hello, Alice and Bobs!');

console.log('Launching');
const ctcAlice = accAlice.contract(backend);

console.log('Starting backends...');

const users = [];

let attachers = 0;

const startBobs = async() => {
    const newBob = async(who) => {
        const acc = await stdlib.newTestAccount(startingBalance);
        const ctc = acc.contract(backend, ctcAlice.getInfo());
        while(attachers < 5) {
            console.log(`${who} is ready`);
            attachers += 1;
            console.log(`New attacher added, Total attachers:`, attachers);
            users.push(acc.getAddress());
            await stdlib.wait(1);
        }
        console.log('New User tried to attach to the contract but was rejected: maximum of 5 attachers reached');
        console.log(`Users:`, users);
        process.exit(0);
        };

        newBob('Bob1');
        newBob('Bob2');
        newBob('Bob3');
        newBob('Bob4');
        newBob('Bob5');
        newBob('Bob6');
        newBob('Bob7');
        newBob('Bob8');
        newBob('Bob9');
}


await ctcAlice.p.Alice({
    // Alice Interact Object
    ready: () => {
        console.log('Alice is ready to accept Attachers');
        startBobs();
    },
})

