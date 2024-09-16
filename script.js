let playerText = document.getElementById("playerText")
let restartBtn = document.getElementById("restartBtn")


let counter = 0;
// Gi zacuvuvam site polinja vo niza
let boxes = Array.from(document.getElementsByClassName("box"))

// So ova ke moze da ja smenima bojata na polinjata koi pobedile
// potocno da go smenime css-ot
let winnerIndicator = getComputedStyle(document.body).getPropertyValue("--winning-blocks")

let borderColor = getComputedStyle(document.body).getPropertyValue("--gold")

let redColor = getComputedStyle(document.body).getPropertyValue("--red")

// Ako e nereseno tekstot gore da e crven
let tieColor = getComputedStyle(document.body).getPropertyValue("--tie")

let aPlayerHasWon = false

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT

// Pravam uste edna niza koja sto ke pocne prazna za da se pamti koe pole
// bilo veke iskoristeno za da nema overwriting
let spaces = Array(9).fill(null)


// Pravam event listener na sekoe pole za sekoj klik od igracot
const startGame = () => {
  boxes.forEach(box => box.addEventListener("click", boxClicked))
}

function boxClicked(n){

  // dokolku nekoj pobedil, ne moze da se klikaat ostanatite polinja
  if(aPlayerHasWon){
    return
  }

  const id = n.target.id

  // Ovoj IF ke se ispolni samo ako poleto koe e kliknato ne e null
  // sto znaci deka poleto e prazno i mozeme da stavime X ili O
  if(!spaces[id]){
    spaces[id] = currentPlayer;  // Go popolnuvam praznoto pole vo nizata so X ili O
    n.target.innerText = currentPlayer; // Go popolunav praznoto pole koe igracite go gledaat

    counter++;

    // Ako pri klikanje na pole, nekoj pobedil, tekstot ke se smeni
    // od Tic Tac Toe vo koj igrac pobedil
    if(playerHasWon() !== false){
      playerText.textContent = `${currentPlayer} has won!`

      //tuka vo winning blocks ke se zacuva nizata elementi a, b, c koja sto
      // pobedila spored funkcijata playerHasWon
      let winning_blocks = playerHasWon()

      // Tuka ja menuvame bojata na pobednickite polinja
      winning_blocks.map(box => boxes[box].style.color = winnerIndicator)
      winning_blocks.map(box => boxes[box].style.borderColor = borderColor)
      return
    }


    // Ternaren operator koj sto posle stavanje na X ili O na pole
    // ke go smeni igracot vo O ili X
    // (ako currentPlayer e X togas sega ke e O, ako ne, togas ke e X)
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT


    // Vo slucaj da e nereseno

    if(counter === 9){
      playerText.textContent = "It's a tie!"
      playerText.style.color = tieColor
      boxes.forEach(box => {
        box.style.color = redColor
        box.style.borderColor = borderColor
      })
    }
  }
}

// Tuka ke gi cuvame moznite kombinacii na index polinja za da ima pobednik
const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

// Proveruvame dali ima nekoja od moznite winningCombinations ispolneto
function playerHasWon() {
  for(const condition of winningCombinations) {

    // Sekoja vrednost od winningCombinations ja zacuvuvame vo a, b, c
    // a moze da bide 0, 3, 6, 1, 2
    // b moze da bide 1, 4, 7, 3, 5
    // c moze da bide 2, 5, 8, 6, 7
    let [a, b, c] = condition

    // Proveruvame dali site se X ili site se O za da ima winning combination
    if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
      aPlayerHasWon = true
      return [a, b, c]   // ja vrakjame winning combination nizata
    }
  }

  return false  // ova ke se ispolni dokolku nikoj ne pobedil vo for loopot
}

// Mu pravam event listener na kopceto Restart taka sto pri klikanje ke se
// napravi restart funkcijata sto ke gi isprazni polinjata
restartBtn.addEventListener("click", restart)

function restart(){
  // Ja praznime psevdo nizata za pamtenje na kliknati polinja
  spaces.fill(null)

  // Gi praznime site polinja koi igracite gi gledaat
  boxes.forEach(box => {
    box.innerText = ""
    box.style.backgroundColor = ""
    box.style.color = ""
  })

  playerText.style.color = ""

  // Go vrakjame tekstot od koj pobedil vo Tic Tac Toe
  playerText.textContent = "Tic Tac Toe"

  counter = 0;

  // Vrakjame na prv igrac da e X
  currentPlayer = X_TEXT

  aPlayerHasWon = false
}

startGame()
