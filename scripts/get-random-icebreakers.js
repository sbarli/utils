const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

const icebreakers = require('../data/icebreaker-questions');
const randomListGroups = require('../functions/random-list-groups');
const { getRandomIntegerInclusive } = require('../functions/get-random-integer');

const convertStringBooleanToBoolean = (initVal, exact = true) => {
  if (initVal === 'true') {
    return true;
  }
  if (initVal === 'false') {
    return false;
  }
  return undefined;
}

const parsedArgs = Object.keys(argv).reduce((acc, key) => {
  if (['am', 'al', 'select'].includes(key)) {
    return {...acc, [key]: convertStringBooleanToBoolean(argv[key])};
  }
  if (key === 'pg') {
    return {...acc, [key]: Number(argv[key])};
  }
  return {...acc, [key]: argv[key]}
}, {});

const QUESTIONS_PER_GROUP = parsedArgs.pg ? parsedArgs.pg : 3;
const ALLOW_LESS_THAN = parsedArgs.al ? parsedArgs.al : false;
const ALLOW_MORE_THAN = parsedArgs.am ? parsedArgs.am : false;
const SELECT_ONE = parsedArgs.select ? parsedArgs.select : false;

console.log('WILL HAVE LEFTOVERS: ', icebreakers.length % QUESTIONS_PER_GROUP !== 0);

const icebreakerGroups = randomListGroups(icebreakers, QUESTIONS_PER_GROUP, ALLOW_LESS_THAN, ALLOW_MORE_THAN);

if (SELECT_ONE) {
  const randomlySelectedGroup = getRandomIntegerInclusive(0, icebreakerGroups.length - 1);
  const randomIcebreakers = icebreakerGroups[randomlySelectedGroup];
  console.log(`
    QUESTIONS:
      ${JSON.stringify(randomIcebreakers, null, 2)}
  `);
}
else {
  console.log(`
    QUESTIONS:
      ${JSON.stringify(icebreakerGroups, null, 2)}
  `);
}