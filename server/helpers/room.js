function createRoom() {
  let values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let roomId = '';
  while (roomId.length < 6) {
    let char = values[Math.floor(Math.random() * values.length)]
    roomId += char;
  }
  return roomId;
}

module.exports = { createRoom }