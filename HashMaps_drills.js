const HashMap = require('./hashmap');

function main() {
    const lotr = new HashMap();
	lotr.set('Hobbit', 'Bilbo');
	lotr.set('Hobbit', 'Frodo');
	lotr.set('Wizard', 'Gandolf');
	lotr.set('Human', 'Aragon');
	lotr.set('Elf', 'Legolas');
	lotr.set('Maiar', 'The Necromancer');
	lotr.set('Maiar', 'Sauron');
	lotr.set('RingBearer', 'Gollum');
	lotr.set('LadyOfLight', 'Galadriel');
	lotr.set('HalfElven', 'Arwen');
	lotr.set('Ent', 'Treebeard');

	//console.log(lotr);

	let maiar = lotr.get('Maiar');
	console.log(maiar)

	let hobbit = lotr.get('Hobbit');
	console.log(hobbit);
}

main();

//4.

function remDups(str) {
    let removeDups = new HashMap();
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      removeDups.set(str.charAt(i), str.charAt(i));
    }
    for (let i in removeDups._hashTable) {
      newStr = newStr + removeDups.getByIndex(i);
    }
    return newStr;
  }


  //5. 

  function permutationIsPalindrome(str) {
    str = str.toLowerCase().trim();
    let palindrome = new HashMap();
    let charCounts = {};
  
    for (let i = 0; i < str.length; i++) {
      if (!charCounts[str.charAt(i)]) {
        charCounts[str.charAt(i)] = 1;
      }
      palindrome.set(str.charAt(i), charCounts[str.charAt(i)]++);
    }
  
    let numOdds = 0;
    for (let i in palindrome._hashTable) {
      if (palindrome.getByIndex(i) % 2 === 0) {
        continue;
      } else {
        numOdds++;
      }
    }
    return numOdds <= 1 ? true : false;
  }

  //6

  function groupAnagrams(arr) {
    let anagrams = new HashMap();
    let differentAnagrams = new HashMap();
    let originalAnagrams = {};
    const result = [];
  
    for (let i = 0; i < arr.length; i++) {
      originalAnagrams[arr[i]] = arr[i]
        .split("")
        .sort()
        .join("");
    }
  
    for (let i in originalAnagrams) {
      anagrams.set(originalAnagrams[i], i);
      differentAnagrams.set(i, originalAnagrams[i]);
    }
  
    for (let i in anagrams._hashTable) {
      let newGroup = [];
      for (let j in differentAnagrams._hashTable) {
        if (anagrams.getKeyByIndex(i) === differentAnagrams.getByIndex(j)) {
          newGroup.push(differentAnagrams.getKeyByIndex(j));
        }
      }
      result.push(newGroup);
    }
    return result;
  }
  
  // console.log(
  //   groupAnagrams(["east", "cars", "acre", "arcs", "teas", "eats", "race"])
  // );


  