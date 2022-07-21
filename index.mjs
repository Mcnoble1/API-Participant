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

let done = false;
const users = [];

const startBobs = async() => {
    const newBob = async(who) => {
        const acc = await stdlib.newTestAccounts(startingBalance);
        const ctc = acc.contract(backend, ctcAlice.getInfo());
        users.push(acc.getAddress());
        };
        
        newBob('Bob1');
        newBob('Bob2');
        newBob('Bob3');
        while(!done) {
            await stdlib.wait(1);
        }

        console.log(users);
}


await ctcAlice.p.Alice({
    // Alice Interact Object
    ready: () => {
        console.log('Alice is ready');
        startBobs();
    },
})

console.log('Goodbye, Alice and Bobs!');
done = true;