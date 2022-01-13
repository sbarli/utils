const icebreakers = require('../data/icebreaker-questions');
const randomListGroups = require('./random-list-groups');
const { getRandomIntegerInclusive } = require('./get-random-integer');

const getIcebreakers = ({ questionsPerGroup, allowLessThan, allowMoreThan, selectOne }) => {
  const icebreakerGroups = randomListGroups(icebreakers, questionsPerGroup, allowLessThan, allowMoreThan);
  if (selectOne) {
    const randomlySelectedGroup = getRandomIntegerInclusive(0, icebreakerGroups.length - 1);
    const randomIcebreakers = icebreakerGroups[randomlySelectedGroup];
    return randomIcebreakers;
  }
  return icebreakerGroups;
};

module.exports = { getIcebreakers };