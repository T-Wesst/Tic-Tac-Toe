$(function() {
  // INITIAL GAME STATE
  let board = new Array(9).fill(null);
  let turn;

  // PLAYERS
  [playerOne, playerTwo] = [
    { 'background-color': ' rgba(223, 177, 104, 0.856)' },
    { 'background-color': ' rgb(112, 112, 219)' }
  ];

  // UI
  const restartBtn = $('#restart');
  const table = $('#table');
  const cell = $('.cell');
  const td = $('td');

  // EVENT LISTENERS
  restartBtn.on('click', restartGame);
  table.on('click', '.cell', function() {
    // if the current cells text is empty return
    if ($(this).text()) return;
    // if the board contains the current cells id return
    if (board[this.id]) return;
    // if the turn is playerOne and the cells BG color is red || the BG is red
    turn === playerOne && ($(this).css(playerOne) || $(this).css(playerOne))
      ? //  return BG red
        $(this)
          .css(playerOne)
          .text('X')
      : // else return BG blue
        $(this)
          .css(playerTwo)
          .text('O');
    // set the board index at the current cells id equal to the current turn
    board[$(this).attr('id')] = turn;
    checkForWinner();
    switchTurn();
  });

  // FUNCTIONS
  function restartGame() {
    // playerOne starts by default
    turn = playerOne;
    // set values to null
    board = new Array(9).fill(null);
    // remove color from display
    cell.css({ 'background-color': 'white' });
    $('.cell').removeClass('rotate');
    render();
  }

  function render() {
    // on each td set the text as boards index
    td.each(function(index, element) {
      $(element).text(board[index]);
    });
  }

  function switchTurn() {
    // if turn is currently playerOne switch to player two, else switch to playerOne
    turn === playerOne ? (turn = playerTwo) : (turn = playerOne);
  }

  function checkForWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    winPatterns.forEach(function(arr, index) {
      // first col of numbers 0, 3, 6
      let first = winPatterns[index][0];
      // second col of numbers 1, 4, 7
      let second = winPatterns[index][1];
      // third col of numbers 2, 5, 8
      let third = winPatterns[index][2];
      // if the the numbers in each col match their patter
      if (
        board[first] &&
        board[first] === board[second] &&
        board[first] === board[third]
      ) {
        $('.cell').addClass('rotate');
        alert('winner');
        setTimeout(function() {
          restartGame();
        }, 5000);
      }
    });
  }
  restartGame();
});
