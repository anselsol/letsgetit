import { Keypair } from '@solana/web3.js';
import * as Bip39 from 'bip39';
import fs from 'fs';
import fsPromise from 'fs/promises';
import { generateWords } from '../helpers.js';

let index = 0;

// const entriesFilename = './files/entries.json';
const resultsFilename = './files/results.json';

// let entries = JSON.parse(fs.readFileSync(entriesFilename));
let results = JSON.parse(fs.readFileSync(resultsFilename));

async function main() {
  index++;

  let phrase = generateWords();

  // if (entries.includes(phrase)) {
  //   setTimeout(function () {
  //     console.log('Entry exists');
  //     return main();
  //   }, 0);
  // }

  const seedRaw = await Bip39.mnemonicToSeed(phrase);
  const seed = seedRaw.slice(0, 32);
  const account = Keypair.fromSeed(seed);
  const pubKey = account.publicKey.toString();

  console.log(`Try #${index} ${pubKey}: ${phrase}`);

  if (pubKey === 'CqHBALZHoYYQ7ymr5TdgWhvCc19GHVGubkAaRAq3th2a') {
    console.error('FOUND IT', phrase);
    results.push({ phrase });
    await fsPromise.writeFile(resultsFilename, JSON.stringify(results));
    console.error('CHECK FILE', phrase);

  } else {
    // entries.push({ phrase });
    // await fsPromise.writeFile(entriesFilename, JSON.stringify(entries));
    setTimeout(function () {
      return main();
    }, 0);
  }
}

main();
