function searchRegexFunction(likePattern) {
  const regexPattern =
    "^" +
    likePattern
      .replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")
      .replace(/%/g, ".*")
      .replace(/_/g, ".") +
    "$";
  return new RegExp(regexPattern, "i");
}

function matchAny(text, patterns) {
  return patterns.some((pattern) => searchRegexFunction(pattern).test(text));
}
