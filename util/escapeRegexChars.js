// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
export default (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
