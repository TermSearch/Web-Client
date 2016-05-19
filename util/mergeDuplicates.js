// TODO: Use same function for webclient as well
// TODO: Write tests for this function
// TODO: Also remove duplicate nl translations here?
export default (dictEntries) => {
  const onlyUniques = [];
  dictEntries.forEach((entry) => {
    let unique = true;
    onlyUniques.forEach((uniqueEntry) => {
      if (uniqueEntry.de === entry.de) {
        unique = false;
        // add Dutch translations to existing uniqueEntry
        uniqueEntry.nl = uniqueEntry.nl.concat(entry.nl);
      }
    });
    if (unique) onlyUniques.push(entry);
  });
  return onlyUniques;
};
