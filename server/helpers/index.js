function createRoom() {
  // let values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let roomId = '';
  while (roomId.length < 6) {
    let char = values[Math.floor(Math.random() * values.length)];
    roomId += char;
  }
  return roomId;
}

function generatePrompt() {
  // let prompts = ['red', 'blue', 'green', 'yellow', 'bottle', 'shoe', 'dog', 'cat', 'face', 'lipstick', 'phone', 'pen', 'chair', 'table']
  let prompts = ['dog']
  return prompts[Math.floor(Math.random() * prompts.length)];
}

module.exports = { createRoom, generatePrompt }