// * This js file is incomplete. It will log to the console the elements you click
    // call another function and set stone. You will have to work through the logic
    // of the game as you know it from building it in the terminal. Work through the
    // puzzle slowly, stepping through the flow of logic, and making the game work.
    // Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.
// * Why are you get a warning in your console? Fix it.
// * Delete these comment lines!


// let topRow = document.querySelector("#top-row")
// let middleRow = document.querySelector("#middle-row")
// let bottomRow = document.querySelector("#bottom-row")

// let largeStone = document.querySelector("#four")
// let mediumStone = document.querySelector("#three")
// let smallStone = document.querySelector("#two")
// let extraSmallStone = document.querySelector("#one")

// topRow = []
// middleRow = []
// bottomRow = [largeStone, mediumStone, smallStone, extraSmallStone]
const counter = document.getElementById("counter")
let numberOfClicks = 0
let stone = null

// empty array to hold the value of the stone that was picked up
let startStone = []

// empty array to hold the value of the last stone in the end stack 
let endStone = []

// variable for top row and middle row
const topRow = document.getElementById("top-row")
const middleRow = document.getElementById("middle-row")
// this function is called when a row is clicked. 
// Open your inspector tool to see what is being captured and can be used.
const selectRow = (row) => {
  // const currentRow = row.getAttribute("data-row")

  // add event listener that counts moves

  // console.log("Yay, we clicked an item", row)
  // console.log("Here is the stone's id: ", row.id)
  // console.log("Here is the stone's data-size: ", currentRow)
  
  if(stone !== null) {
    dropStone(row.id)
    
    let rowTracker = row.childNodes
    console.log(rowTracker.length, "tracker")
    checkWin()
  } else if (!stone) {
    pickUpStone(row.id)
  }
} 

// this function can be called to get the last stone in the stack
// but there might be something wrong with it...
const pickUpStone = (rowID) => {
  const selectedRow = document.getElementById(rowID);
  console.log(`The row that was clicked on is the ${rowID}`)

  stone = selectedRow.lastElementChild
  console.log(stone, "pick up stone")

  selectedRow.removeChild(selectedRow.lastElementChild);
  console.log(`The stone size is ${stone.id}` )
  startStone.push(stone.id)
  console.log(startStone, "----startStone----")
}

// You could use this function to drop the stone but you'll need to toggle between pickUpStone & dropStone
// Once you figure that out you'll need to figure out if its a legal move...
// Something like: if(!stone){pickupStone} else{dropStone}

const dropStone = (rowID) => {
  const selectedRow = document.getElementById(rowID)
  let lastStone = selectedRow.lastElementChild
  console.log(lastStone, "----lastStone----")
  if(lastStone) {
    endStone.push(lastStone.id)
    console.log(lastStone.id, "----lastStone id----")
    console.log(endStone, "----endStone----")
  } 
  console.log(stone, "----stone dropped----")
    if(startStone < endStone  || endStone == 0) {
      console.log("----dropping stone----")
      document.getElementById(rowID).appendChild(stone)
      stone = null
      console.log("legal move")
      startStone = []
      endStone = []
    } else {
      startStone = startStone
      endStone.pop()
      console.log("illegal move")
      console.log("startStone: ", startStone, "endStone: ", endStone)
    }
    numberOfClicks++
    counter.innerText = numberOfClicks
}

const checkWin = () => {
  if(topRow.childNodes.length === 4 || middleRow.childNodes.length === 4) {
    counter.innerText = `It took you ${numberOfClicks} moves to win!`
    console.log("you win!!!")
    setTimeout(function(){
      window.location.reload();
   }, 2500);
    return true
  }
}

  // if(lastStone === null ) {
  //   startStone = []
  // // }
  // console.log(endStone, "----endStone---")
  // console.log(startStone, "---startStone---")
// }

// const isLegal = () => {
//   if(startStone < endStone || endStone == 0) {
//     console.log("Legal Move")
//     // dropStone()
//     return true
//   } else {
//     console.log("Illegal Move")
//     return false
//   }
// }



// const isLegal = (start, end) => {
//   const startRow = document.getElementById(start);
//   startStone = startRow.lastElementChild
//   console.log(startStone, "----startStone----")
//   const endRow = document.getElementById(end);
//   endStone = endRow.lastElementChild
//   console.log(endStone, "----endStone----")
//     if(startStone.id > endStone.id || endStone.id.length === 0) {
//       console.log("----legal move----")
//       dropStone()
//     } else {
//       console.log("Illegal Move")
//       return false
//     }
// }

// legal move logic
  // - use this keyword to isolate size of picked stone by the data-size
  // - once we have size of picked stone compare to size of stone in the selected row that picked stone is to be dropped
  // - if picked stone size is smaller than size of stone in selected row, drop stone
  // possible solutions: 
    // 1) set picked stone logic to its own variable
    // 2) set selected row to drop stone to its own variable if possible
    // 3) use conditional to compare these variables


// this.data-size > this.selectedRow.lastElementChild.data-size??? or this.getAttribute > this.selectedRow.getAttribute("data-size")

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.
