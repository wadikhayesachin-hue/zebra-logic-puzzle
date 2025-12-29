console.log("Puzzle JS loaded");

export const PUZZLES = [


/* =========================
   LEVEL 1 – VERY EASY
========================= */

{
  id: "L1-P1",
  level: 1,
  title: "Morning Drinks",
  houses: 3,
  categories: {
    Person: ["Amit", "Ravi", "Neha"],
    Drink: ["Tea", "Coffee", "Juice"],
    City: ["Delhi", "Pune", "Jaipur"]
  },
  clues: [
    {
      type: "NOT_EQUAL",
      left:  { category: "Person", value: "Amit" },
      right: { category: "Drink", value: "Coffee" }
    },
    {
      type: "EQUAL",
      left:  { category: "City", value: "Pune" },
      right: { category: "Drink", value: "Tea" }
    },
    {
      type: "EQUAL",
      left:  { category: "Person", value: "Neha" },
      right: { category: "City", value: "Jaipur" }
    }
  ],
  
  solution: {
    House1: { Person: "Amit", Drink: "Tea", City: "Delhi" },
    House2: { Person: "Ravi", Drink: "Coffee", City: "Pune" },
    House3: { Person: "Neha", Drink: "Juice", City: "Jaipur" }
  }
},


{  id: "L1-P2",
  level: 1,
  title: "Pet Choices",
  houses: 3,
  categories: {
    Person: ["Rahul", "Sonia", "Karan"],
    Pet: ["Dog", "Cat", "Fish"],
    Color: ["Red", "Blue", "Green"]
  },
clues: [
  {
    type: "EQUAL",
    left:  { category: "Pet", value: "Dog" },
    right: { category: "Color", value: "Red" }
  },
  {
    type: "NOT_EQUAL",
    left:  { category: "Person", value: "Sonia" },
    right: { category: "Pet", value: "Fish" }
  },
  {
    type: "EQUAL",
    left:  { category: "Person", value: "Karan" },
    right: { category: "Color", value: "Blue" }
  }
],

  
  solution: {
    House1: { Person: "Rahul", Pet: "Dog", Color: "Red" },
    House2: { Person: "Karan", Pet: "Cat", Color: "Blue" },
    House3: { Person: "Sonia", Pet: "Fish", Color: "Green" }
  }
},

/* =========================
   LEVEL 2 – EASY
========================= */

{
  id: "L2-P1",
  level: 2,
  title: "Festival Traditions",
  houses: 4,
  categories: {
    Family: ["Sharma", "Iyer", "Khan", "Patel"],
    Tradition: ["Diwali", "Eid", "Pongal", "Navratri"],
    Color: ["Red", "Blue", "Green", "Yellow"]
  },
  clues: [
  {
    type: "NOT_EQUAL",
    left:  { category: "Family", value: "Sharma" },
    right: { category: "Tradition", value: "Eid" }
  },
  {
    type: "EQUAL",
    left:  { category: "Color", value: "Blue" },
    right: { category: "Tradition", value: "Pongal" }
  },
  {
    type: "EQUAL",
    left:  { category: "Family", value: "Patel" },
    right: { category: "Color", value: "Yellow" }
  },
  {
    type: "EQUAL",
    left:  { category: "Color", value: "Green" },
    right: { category: "Tradition", value: "Diwali" }
  }
],

 
  solution: {
    House1: { Family: "Sharma", Tradition: "Diwali", Color: "Green" },
    House2: { Family: "Iyer", Tradition: "Pongal", Color: "Blue" },
    House3: { Family: "Khan", Tradition: "Eid", Color: "Red" },
    House4: { Family: "Patel", Tradition: "Navratri", Color: "Yellow" }
  }
},

{
  id: "L2-P2",
  level: 2,
  title: "Weekend Plans",
  houses: 4,
  categories: {
    Person: ["Anu", "Rohit", "Meera", "Vikram"],
    Activity: ["Hiking", "Movie", "Shopping", "Reading"],
    Day: ["Friday", "Saturday", "Sunday", "Monday"]
  },
  clues: [
  {
    type: "NOT_EQUAL",
    left:  { category: "Person", value: "Meera" },
    right: { category: "Activity", value: "Shopping" }
  },
  {
    type: "RELATIVE_POSITION",
    left:  { category: "Activity", value: "Hiking" },
    right: { category: "Day", value: "Sunday" },
    relation: "IMMEDIATELY_BEFORE"
  },
  {
    type: "EQUAL",
    left:  { category: "Person", value: "Anu" },
    right: { category: "Day", value: "Friday" }
  },
  {
    type: "NOT_EQUAL",
    left:  { category: "Activity", value: "Movie" },
    right: { category: "Day", value: "Monday" }
  }
],

 
  solution: {
    House1: { Person: "Anu", Activity: "Reading", Day: "Friday" },
    House2: { Person: "Rohit", Activity: "Hiking", Day: "Sunday" },
    House3: { Person: "Meera", Activity: "Movie", Day: "Saturday" },
    House4: { Person: "Vikram", Activity: "Shopping", Day: "Monday" }
  }
},

/* =========================
   LEVEL 3 – MEDIUM
========================= */

{
  id: "L3-P1",
  level: 3,
  title: "Office Seating",
  houses: 4,
  categories: {
    Person: ["Ajay", "Bhavna", "Chirag", "Divya"],
    Role: ["Manager", "Designer", "Engineer", "Tester"],
    Drink: ["Tea", "Coffee", "Juice", "Water"],
    Desk: ["Near Window", "Corner", "Center", "Entrance"]
  },
  clues: [
    "The Manager sits near the Window.",
    "Bhavna drinks Juice.",
    "The Engineer does not sit at the Corner.",
    "Divya is not the Tester.",
    "The person at the Entrance drinks Water."
  ],
  eliminations: [
    { category: "Role", value: "Tester", house: 4 },
    { category: "Drink", value: "Coffee", house: 4 },
    { category: "Desk", value: "Corner", house: 3 }
  ],
  solution: {
    House1: { Person: "Ajay", Role: "Manager", Drink: "Tea", Desk: "Near Window" },
    House2: { Person: "Bhavna", Role: "Designer", Drink: "Juice", Desk: "Center" },
    House3: { Person: "Chirag", Role: "Engineer", Drink: "Coffee", Desk: "Corner" },
    House4: { Person: "Divya", Role: "Tester", Drink: "Water", Desk: "Entrance" }
  }
},

{
  id: "L3-P2",
  level: 3,
  title: "School Clubs",
  houses: 4,
  categories: {
    Student: ["Aarav", "Diya", "Kabir", "Riya"],
    Club: ["Music", "Drama", "Robotics", "Sports"],
    Grade: ["6", "7", "8", "9"],
    Bag: ["Red", "Blue", "Green", "Black"]
  },
  clues: [
    "The Robotics student is in Grade 9.",
    "Diya is not in the Music club.",
    "The student with the Black bag is in Grade 7.",
    "Kabir is in the Sports club.",
    "Grade 6 student carries a Red bag."
  ],
  eliminations: [
    { category: "Club", value: "Music", house: 2 },
    { category: "Grade", value: "6", house: 4 },
    { category: "Bag", value: "Black", house: 1 }
  ],
  solution: {
    House1: { Student: "Aarav", Club: "Music", Grade: "6", Bag: "Red" },
    House2: { Student: "Diya", Club: "Drama", Grade: "7", Bag: "Black" },
    House3: { Student: "Kabir", Club: "Sports", Grade: "8", Bag: "Blue" },
    House4: { Student: "Riya", Club: "Robotics", Grade: "9", Bag: "Green" }
  }
},

/* =========================
   LEVEL 4 – HARD
========================= */

{
  id: "L4-P1",
  level: 4,
  title: "Travel Diaries",
  houses: 5,
  categories: {
    Traveler: ["Ankit", "Bhavya", "Chetan", "Deepa", "Esha"],
    Country: ["Japan", "France", "Italy", "Spain", "Brazil"],
    Transport: ["Plane", "Train", "Ship", "Car", "Bus"],
    Month: ["Jan", "Feb", "Mar", "Apr", "May"]
  },
  clues: [
    "Ankit did not travel in March.",
    "The traveler to Japan went by Plane.",
    "Deepa traveled in April.",
    "The Bus traveler went to Brazil.",
    "Chetan did not use the Train.",
    "The Italy trip was in February."
  ],
  eliminations: [
    { category: "Month", value: "Mar", house: 1 },
    { category: "Transport", value: "Train", house: 3 },
    { category: "Country", value: "Japan", house: 2 }
  ],
  solution: {
    House1: { Traveler: "Ankit", Country: "France", Transport: "Train", Month: "Jan" },
    House2: { Traveler: "Bhavya", Country: "Italy", Transport: "Car", Month: "Feb" },
    House3: { Traveler: "Chetan", Country: "Spain", Transport: "Ship", Month: "Mar" },
    House4: { Traveler: "Deepa", Country: "Brazil", Transport: "Bus", Month: "Apr" },
    House5: { Traveler: "Esha", Country: "Japan", Transport: "Plane", Month: "May" }
  }
},

{
  id: "L4-P2",
  level: 4,
  title: "Startup Teams",
  houses: 5,
  categories: {
    Founder: ["Arjun", "Neel", "Pooja", "Sameer", "Tara"],
    Startup: ["FinTech", "EdTech", "Health", "AI", "Ecommerce"],
    City: ["Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad"],
    Funding: ["Bootstrapped", "Seed", "Series A", "Series B", "IPO"]
  },
  clues: [
    "The AI startup is based in Bangalore.",
    "Pooja founded the Health startup.",
    "The Mumbai startup is Bootstrapped.",
    "Sameer did not found the FinTech company.",
    "The Series B startup is in Delhi.",
    "Neel’s startup is not Ecommerce."
  ],
  eliminations: [
    { category: "Startup", value: "Ecommerce", house: 2 },
    { category: "City", value: "Mumbai", house: 5 },
    { category: "Founder", value: "Sameer", house: 1 }
  ],
  solution: {
    House1: { Founder: "Arjun", Startup: "FinTech", City: "Pune", Funding: "Seed" },
    House2: { Founder: "Neel", Startup: "EdTech", City: "Hyderabad", Funding: "IPO" },
    House3: { Founder: "Pooja", Startup: "Health", City: "Mumbai", Funding: "Bootstrapped" },
    House4: { Founder: "Sameer", Startup: "Ecommerce", City: "Delhi", Funding: "Series B" },
    House5: { Founder: "Tara", Startup: "AI", City: "Bangalore", Funding: "Series A" }
  }
},

/* =========================
   LEVEL 5 – EXPERT
========================= */

{
  id: "L5-P1",
  level: 5,
  title: "Luxury Apartments",
  houses: 5,
  categories: {
    Owner: ["A", "B", "C", "D", "E"],
    Floor: ["1", "2", "3", "4", "5"],
    Car: ["BMW", "Audi", "Tesla", "Mercedes", "Volvo"],
    Pet: ["Dog", "Cat", "Bird", "Fish", "None"],
    Drink: ["Tea", "Coffee", "Juice", "Wine", "Water"]
  },
  clues: [
    "The Tesla owner lives on Floor 5.",
    "Owner C drinks Wine.",
    "The person with the Dog lives above the Audi owner.",
    "Floor 1 owner has no pet.",
    "The Mercedes owner drinks Coffee.",
    "Owner A does not live on Floor 3 or 4."
  ],
  eliminations: [
    { category: "Floor", value: "3", house: 2 },
    { category: "Floor", value: "4", house: 2 },
    { category: "Pet", value: "Dog", house: 1 }
  ],
  solution: {
    House1: { Owner: "B", Floor: "1", Car: "BMW", Pet: "None", Drink: "Tea" },
    House2: { Owner: "A", Floor: "2", Car: "Audi", Pet: "Cat", Drink: "Water" },
    House3: { Owner: "C", Floor: "3", Car: "Volvo", Pet: "Bird", Drink: "Wine" },
    House4: { Owner: "D", Floor: "4", Car: "Mercedes", Pet: "Dog", Drink: "Coffee" },
    House5: { Owner: "E", Floor: "5", Car: "Tesla", Pet: "Fish", Drink: "Juice" }
  }
},

{
  id: "L5-P2",
  level: 5,
  title: "Global Conference",
  houses: 5,
  categories: {
    Speaker: ["Alpha", "Beta", "Gamma", "Delta", "Omega"],
    Topic: ["AI", "Climate", "Economics", "Health", "Security"],
    Country: ["USA", "India", "Germany", "Japan", "Brazil"],
    Time: ["9AM", "11AM", "1PM", "3PM", "5PM"],
    Hall: ["A", "B", "C", "D", "E"]
  },
  clues: [
    "The AI talk is at 9AM.",
    "Gamma speaks in Hall C.",
    "The speaker from Japan talks at 3PM.",
    "The Economics talk is not in Hall A.",
    "Delta is not from USA.",
    "The Brazil speaker talks at 5PM."
  ],
  eliminations: [
    { category: "Country", value: "USA", house: 4 },
    { category: "Hall", value: "A", house: 3 },
    { category: "Time", value: "5PM", house: 1 }
  ],
  solution: {
    House1: { Speaker: "Alpha", Topic: "AI", Country: "USA", Time: "9AM", Hall: "A" },
    House2: { Speaker: "Beta", Topic: "Climate", Country: "India", Time: "11AM", Hall: "B" },
    House3: { Speaker: "Gamma", Topic: "Health", Country: "Germany", Time: "1PM", Hall: "C" },
    House4: { Speaker: "Delta", Topic: "Economics", Country: "Japan", Time: "3PM", Hall: "D" },
    House5: { Speaker: "Omega", Topic: "Security", Country: "Brazil", Time: "5PM", Hall: "E" }
  }
}

];
