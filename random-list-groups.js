// use to randomly assign one-offs to a list
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomListGroups = (list, perGroup = 2, allowSingles = false) => {
  const randomOrderedList = shuffle([...list]);
  const groups = [];
  for (let i = 0; i < randomOrderedList.length; i += perGroup) {
    const list = [];
    for (let p = 0; p < perGroup; p++) {
      list.push(randomOrderedList[i + p]);
    }
    groups.push(list);
  }
  // if we don't want a single item in the final group
  if (!allowSingles && groups[groups.length - 1].length === 1) {
    // select a random group index other than the last one
    const randomlySelectedGroup = getRandomInteger(0, groups.length - 2);
    // add the person to that group
    groups[randomlySelectedGroup] = [...groups[randomlySelectedGroup], ...groups[groups.length - 1]];
    // remove the single-item group from final list
    groups.pop();
  }
  return groups;
};

