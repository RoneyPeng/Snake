// let readline = require('readline');
import readline from 'readline';

// Clear Console use in development environment.
const blank = '\n'.repeat(process.stdout.rows);
console.log(blank);
readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);
