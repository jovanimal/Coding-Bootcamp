let names = ["Shabir", "Jovan", "Jordan", "Elizabeth"];

function longestName(names) {
  let longest = "";
  for (let i = 0; i < names.length; i++) {
    if (longest.length < names[i].length) longest = names[i];
  }
  return longest;
}

// function longestStringReduce(arr) {
//   return arr.reduce((a, b) => a.length < b.length ? b : a, "");

console.log(longestName(["Shabir", "Jovan", "Jordan", "Elizabeth", "Jordan"]));
