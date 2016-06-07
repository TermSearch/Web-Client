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

  return removeDutchDuplicates(onlyUniques);

};

const removeDutchDuplicates = (dictEntries) => {

  dictEntries.forEach((entry) => {

    // Converting array to Set removes all duplicates
    // Then convert is back to array
    const onlyUniques = [...new Set(entry.nl)];
    entry.nl = onlyUniques;

  });

  return dictEntries;

}
