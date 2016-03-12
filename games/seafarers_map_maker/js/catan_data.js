var gameData = {
  hexRows: 9,
  hexColumns: 12,

  types: [
    "water", "sheep", "wheat", "wood",
    "brick", "ore", "gold", "desert"
  ],

  hexCounts: {
    "water": 33,
    "sheep": 7,
    "wheat": 7,
    "wood": 7,
    "brick": 5,
    "ore": 5,
    "gold": 3,
    "desert": 3,
    "blank": 0,
    "frame": 0,
  },

  numberCounts: [
    0, //0s
    0, //1s
    1, //2s
    4, //3s
    4, //4s
    5, //5s
    5, //6s
    0, //7s
    5, //8s
    5, //9s
    4, //10s
    4, //11s
    1, //12s
  ],

  portCounts: {
    "blank": 0,
    "3:1": 5,
    "2:1sheep": 1,
    "2:1wheat": 1,
    "2:1wood": 1,
    "2:1brick": 1,
    "2:1ore": 1,
  },
}
