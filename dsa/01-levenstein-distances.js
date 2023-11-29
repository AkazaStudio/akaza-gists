function levenshteinDistance(str1, str2) {
    return levenshteinDistanceHelper(str1, str2);
  }
  
function levenshteinDistanceHelper(str1, str2, cache = {}) {
    // Base Cases: Both strings are empty
    if (str1.length === 0 && str2.length === 0) {
      return 0;
    }
  
    if (cache[`${str1}${str2}`]) {
      return cache[`${str1}${str2}`];
    }
  
    // Recursive Cases
    const len1 = str1.length;
    const len2 = str2.length;
  
    // If last chat is equal, solve subproblems
    if (str1[len1 - 1] === str2[len2 - 1] && str1.length > 0 && str2.length > 0){
      return levenshteinDistanceHelper(
        str1.slice(0, len1 - 1), 
        str2.slice(0, len2 - 1), 
        cache
      );
    }
    
    let replacements = Infinity;
    let deletions = Infinity;
    let insertions = Infinity;
  
    // Try replacement: assume the values are equal, resolve subproblems slicing both strings
    if (str1.length > 0 && str2.length > 0) {
      const replacedStr = str1.slice(0, len1 - 1) + str2[len2 - 1];
      replacements = 1 + levenshteinDistanceHelper(replacedStr, str2, cache); 
    }
    
    // Try insertion: assume a new char was added, don't slice str1
    if (str2.length > 0) {
      const insertedStr = str1 + str2[len2 - 1];
      insertions = 1 + levenshteinDistanceHelper(insertedStr, str2, cache);
    }
  
    // Try delete: assume last chat was removed, don't slice str2
    if (str1.length > 0) {
      deletions = 1 + levenshteinDistanceHelper(str1.slice(0, len1 - 1), str2, cache); 
    }
  
    const editions = Math.min(replacements, insertions, deletions);
  
    cache[`${str1}${str2}`] = editions;
    
    return cache[`${str1}${str2}`];
  }
  
  exports.levenshteinDistance = levenshteinDistance;
  