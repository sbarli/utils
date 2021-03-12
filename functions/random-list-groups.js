const shuffle = require('./shuffle-array');
const { getRandomIntegerInclusive } = require('./get-random-integer');

const getBalancedRandomlySelectedGroupIdx = (groups, perGroup) => {
  const availableGroups = groups.filter(group => group.length <= perGroup);
  if (!availableGroups || !availableGroups.length) return getBalancedRandomlySelectedGroupIdx(groups, perGroup + 1);
  const randomlySelectedGroupIdx = getRandomIntegerInclusive(0, availableGroups.length - 1);
  return randomlySelectedGroupIdx;
};

const addEachToRandomGroup = (items, groups, perGroup) => {
  if (!items.length) {
    return groups;
  }
  const randomlySelectedGroupIdx = getBalancedRandomlySelectedGroupIdx(groups, perGroup);
  groups[randomlySelectedGroupIdx].push(items[0]);
  return addEachToRandomGroup(items.slice(1), groups, perGroup);
};

const randomListGroups = (initList, perGroup = 2, allowLessThan = false, allowMoreThan = true) => {
  const randomOrderedList = shuffle([...initList]);
  const createGroupsFromRandomList = (list, groups = [], perGroup = 2, allowLessThan = false, allowMoreThan = true) => {
    if (!list.length) return groups;
    const haveEnough = perGroup < list.length;
    if (!haveEnough) {
      if (allowLessThan) {
        return [...groups, [...list]];
      }
      if (allowMoreThan) {
        return addEachToRandomGroup(list, groups, perGroup);
      }
      return groups;
    }
    const newGroup = list.slice(0, perGroup);
    return createGroupsFromRandomList(list.slice(perGroup), [...groups, newGroup], perGroup, allowLessThan, allowMoreThan);
  }
  return createGroupsFromRandomList(randomOrderedList, [], perGroup, allowLessThan, allowMoreThan);
};

/**
 * EXAMPLES
 */
// const myList = [
//   'a',
//   'b',
//   'c',
//   'd',
//   'e',
//   'f',
//   'g',
// ]
// console.log('randomListGroups(myList) => [-,-] x 2, [-,-,-] x 1', JSON.stringify(randomListGroups(myList), null, 2))
// console.log('randomListGroups(myList, 2, true) => [-,-] x 2, [-] x 1', JSON.stringify(randomListGroups(myList, 2, true), null, 2))
// console.log('randomListGroups(myList, 2, false, false) => [-,-] x 2', JSON.stringify(randomListGroups(myList, 2, false, false), null, 2))

module.exports = randomListGroups;