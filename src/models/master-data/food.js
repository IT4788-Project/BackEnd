const food_default = [
  {
    id: 1,
    name: "thịt lợn",
    calories: 250,
    glucozo: 10,
    lipit: 15,
    protein: 20,
    vitamin: 5,
    unit: "100 gam",
    tags: [
      2,
      3,
      7
    ]
  },
  {
    id: 2,
    name: "Gạo",
    calories: 130,
    glucozo: 5,
    lipit: 1,
    protein: 3,
    vitamin: 2,
    unit: "100 gam",
    tags: [
      8,
      3
    ]
  },
  {
    id: 3,
    name: "Trứng gà",
    calories: 70,
    glucozo: 1,
    lipit: 5,
    protein: 10,
    vitamin: 8,
    unit: "100 gam",
    tags: [
      6,
      10
    ]
  },
  {
    id: 4,
    name: "thịt bò",
    calories: 250,
    glucozo: 8,
    lipit: 18,
    protein: 25,
    vitamin: 6,
    unit: "100 gam",
    tags: [
      2,
      7
    ]
  },

  {
    id: 5,
    name: "Rau",
    calories: 40,
    glucozo: 2,
    lipit: 1,
    protein: 3,
    vitamin: 15,
    unit: "100 gam",
    tags: [
      5,
      6
    ]
  },
  {
    id: 6,
    name: "Đường",
    calories: 150,
    glucozo: 20,
    lipit: 0,
    protein: 0,
    vitamin: 0,
    unit: "100 gam",
    tags: [

      3
    ]
  },
  {
    id: 7,
    name: "Tôm",
    calories: 85,
    glucozo: 3,
    lipit: 1,
    protein: 18,
    vitamin: 10,
    unit: "100 gam",
    tags: [
      6,
      3
    ]
  },
  {
    id: 8,
    name: "Lạc",
    calories: 500,
    glucozo: 30,
    lipit: 45,
    protein: 25,
    vitamin: 2,
    unit: "100 gam",
    tags: [
      1,
      9
    ]
  },
  {
    id: 9,
    name: "Đậu phụ",
    calories: 70,
    glucozo: 2,
    lipit: 4,
    protein: 8,
    vitamin: 6,
    unit: "100 gam",
    tags: [
      9,
      1
    ]
  },
  {
    id: 10,
    name: "Cà rốt",
    calories: 85,
    glucozo: 6,
    lipit: 0,
    protein: 1,
    vitamin: 14,
    unit: "100 gam",
    tags: [
      5,
      6,
      10
    ]
  },
  {
    id: 11,
    name: "Cá",
    calories: 70,
    glucozo: 0,
    lipit: 1,
    protein: 15,
    vitamin: 12,
    unit: "100 gam",
    tags: [
      6,
      11
    ]
  },
  {
    id: 12,
    name: "Khoai tây",
    calories: 70,
    glucozo: 15,
    lipit: 0,
    protein: 2,
    vitamin: 10,
    unit: "100 gam",
    tags: [
      10,
      11
    ]
  },
  {
    id: 13,
    name: "Cà chua",
    calories: 18,
    glucozo: 3,
    lipit: 0,
    protein: 1,
    vitamin: 10,
    unit: "100 gam",
    tags: [
      6,
      3,
      11
    ]
  },
  {
    id: 14,
    name: "Bắp cải",
    calories: 25,
    glucozo: 3,
    lipit: 0,
    protein: 2,
    vitamin: 20,
    unit: "100 gam",
    tags: [
      5,
      10
    ]
  },
  {
    id: 15,
    name: "Mỳ tôm",
    calories: 55,
    glucozo: 10,
    lipit: 2,
    protein: 8,
    vitamin: 4,
    unit: "100 gam",
    tags: [
      10,
      3
    ]
  },
  {
    id: 16,
    name: "Xúc xích",
    calories: 300,
    glucozo: 5,
    lipit: 25,
    protein: 10,
    vitamin: 2,
    unit: "100 gam",
    tags: [
      12,
      3
    ]
  },
  {
    id: 17,
    name: "Ngô",
    calories: 86,
    glucozo: 19,
    lipit: 1,
    protein: 3,
    vitamin: 2,
    unit: "100 gam",
    tags: [
      10,
      3,
      5
    ]
  },
  {
    id: 18,
    name: "Gạo lứt",
    calories: 120,
    glucozo: 5,
    lipit: 1,
    protein: 3,
    vitamin: 2,
    unit: "100 gam",
    tags: [
      7,
      13
    ]
  },
  {
    id: 19,
    name: "Bánh mì",
    calories: 250,
    glucozo: 10,
    lipit: 5,
    protein: 8,
    vitamin: 1,
    unit: "100 gam",
    tags: [
      1,
      13
    ]
  },
  {
    id: 20,
    name: "Rau muống",
    calories: 20,
    glucozo: 1,
    lipit: 0,
    protein: 2,
    vitamin: 8,
    unit: "100 gam",
    tags: [
      5,
      3,
      9
    ]
  },
  {
    id: 21,
    name: "Bơ",
    calories: 160,
    glucozo: 0,
    lipit: 15,
    protein: 2,
    vitamin: 6,
    unit: "100 gam",
    tags: [
      8,
      10
    ]
  },
  {
    id: 23,
    name: "Cá hồi",
    calories: 206,
    glucozo: 0,
    lipit: 13,
    protein: 22,
    vitamin: 4,
    unit: "100 gam",
    tags: [
      7,
      11
    ]
  },
  {
    id: 24,
    name: "Dưa chuột",
    calories: 16,
    glucozo: 2,
    lipit: 0,
    protein: 1,
    vitamin: 2,
    unit: "100 gam",
    tags: [
      1,
      5,
      6
    ]
  },
  {
    id: 25,
    name: "Măng cụt",
    calories: 30,
    glucozo: 6,
    lipit: 0,
    protein: 1,
    vitamin: 2,
    unit: "100 gam",
    tags: [
      9,
      10
    ]
  },
  {
    id: 26,
    name: "Chuối hột",
    calories: 105,
    lucozo: 27,
    lipit: 1,
    protein: 1,
    vitamin: 14,
    unit: "100 gam",
    tags: [
      6,
      10,
      11
    ]
  },
  {
    id: 27,
    name: "Rau diếp",
    calories: 45,
    glucozo: 2,
    lipit: 1,
    protein: 3,
    vitamin: 15,
    unit: "100 gam",
    tags: [
      5,
      6,
      10
    ]
  },
  {
    id: 28,
    name: "Ốc",
    calories: 90,
    glucozo: 6,
    lipit: 1,
    protein: 19,
    vitamin: 10,
    unit: "100 gam",
    tags: [
      7,
      8
    ]
  },
  {
    id: 29,
    name: "Gạo nếp",
    calories: 130,
    glucozo: 28,
    lipit: 0,
    protein: 2,
    vitamin: 1,
    unit: "100 gam",
    tags: [
      13,
      3,
      6
    ]
  },
  {
    id: 30,
    name: "Bò viên",
    calories: 200,
    glucozo: 1,
    lipit: 15,
    protein: 16,
    vitamin: 5,
    unit: "100 gam",
    tags: [
      2,
      7,
      8
    ]
  },
  {
    id: 31,
    name: "Sò điệp",
    calories: 70,
    glucozo: 1,
    lipit: 1,
    protein: 12,
    vitamin: 6,
    unit: "100 gam",
    tags: [
      10
    ]
  },
  {
    id: 32,
    name: "Măng chua",
    calories: 40,
    glucozo: 8,
    lipit: 0,
    protein: 1,
    vitamin: 2,
    unit: "100 gam",
    tags: [
      10,
      3
    ]
  },
  {
    id: 33,
    name: "Rau cải xanh",
    calories: 20,
    glucozo: 2,
    lipit: 0,
    protein: 2,
    vitamin: 8,
    unit: "100 gam",
    tags: [
      6,
      5,
      10
    ]
  },
];

module.exports = food_default;