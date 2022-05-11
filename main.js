'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};
console.log(stacks.c)

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// movePiece should remove the last element in the array of the startStack and add it to the endStack //

const movePiece = (startStack, endStack) => {
  stacks[endStack].push(stacks[startStack].pop());
  checkForWin();
};

// isLegal needs to check if the movePiece follows the rules of not allowing larger 
const isLegal = (startStack, endStack) => {
  if(stacks[startStack].length > 0) {
    if(stacks[endStack].slice(-1) > stacks[startStack].slice(-1) || stacks[endStack].length === 0 ) {
      return true;
    } else {
      return false;
    }
  }
};

const checkForWin = () => {
  if ((stacks.a.length == 0 && stacks.b.length == 4) || stacks.c.length == 4) {
    return true;
  } else {
    return false;
  }
};

const towersOfHanoi = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
  } else {
    console.log("------ Invalid Move ------");
  }
};
      
const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
