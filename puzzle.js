
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
    type: "EQUAL",
    left: { category: "City", value: "Pune" },
    right:{ category: "Drink", value: "Tea" }
  },
  {
    type: "EQUAL",
    left: { category: "Person", value: "Neha" },
    right:{ category: "City", value: "Jaipur" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Person", value: "Amit" },
    right:{ category: "Drink", value: "Coffee" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "City", value: "Delhi" },
    right:{ category: "Drink", value: "Juice" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Person", value: "Ravi" },
    right:{ category: "City", value: "Jaipur" }
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
    left: { category: "Pet", value: "Dog" },
    right:{ category: "Color", value: "Red" }
  },
  {
    type: "EQUAL",
    left: { category: "Person", value: "Karan" },
    right:{ category: "Color", value: "Blue" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Person", value: "Sonia" },
    right:{ category: "Pet", value: "Fish" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Color", value: "Green" },
    right:{ category: "Pet", value: "Dog" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Person", value: "Rahul" },
    right:{ category: "Color", value: "Blue" }
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
    left: { category: "Family", value: "Sharma" },
    right:{ category: "Tradition", value: "Eid" }
  },
  {
    type: "EQUAL",
    left: { category: "Color", value: "Blue" },
    right:{ category: "Tradition", value: "Pongal" }
  },
  {
    type: "EQUAL",
    left: { category: "Family", value: "Patel" },
    right:{ category: "Color", value: "Yellow" }
  },
  {
    type: "EQUAL",
    left: { category: "Color", value: "Green" },
    right:{ category: "Tradition", value: "Diwali" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Family", value: "Khan" },
    right:{ category: "Color", value: "Yellow" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Tradition", value: "Navratri" },
    right:{ category: "Color", value: "Blue" }
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
    left: { category: "Person", value: "Meera" },
    right:{ category: "Activity", value: "Shopping" }
  },
  {
    type: "RELATIVE_POSITION",
    left: { category: "Activity", value: "Hiking" },
    right:{ category: "Day", value: "Sunday" },
    relation: "IMMEDIATELY_BEFORE"
  },
  {
    type: "EQUAL",
    left: { category: "Person", value: "Anu" },
    right:{ category: "Day", value: "Friday" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Activity", value: "Movie" },
    right:{ category: "Day", value: "Monday" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Person", value: "Vikram" },
    right:{ category: "Day", value: "Friday" }
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
  {
    type: "EQUAL",
    left: { category: "Role", value: "Manager" },
    right:{ category: "Desk", value: "Near Window" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Person", value: "Bhavna" },
    right:{ category: "Drink", value: "Coffee" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Role", value: "Engineer" },
    right:{ category: "Desk", value: "Corner" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Person", value: "Divya" },
    right:{ category: "Role", value: "Tester" }
  },
  {
    type: "EQUAL",
    left: { category: "Desk", value: "Entrance" },
    right:{ category: "Drink", value: "Water" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Person", value: "Ajay" },
    right:{ category: "Drink", value: "Juice" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Desk", value: "Center" },
    right:{ category: "Drink", value: "Water" }
  }
]
,

  solution: {
    House1: { Person: "Ajay", Role: "Manager", Drink: "Tea", Desk: "Near Window" },
    House2: { Person: "Bhavna", Role: "Designer", Drink: "Juice", Desk: "Center" },
    House3: { Person: "Chirag", Role: "Engineer", Drink: "Coffee", Desk: "Corner" },
    House4: { Person: "Divya", Role: "Tester", Drink: "Water", Desk: "Entrance" }
  }
}
,

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
  {
    type: "EQUAL",
    left: { category: "Club", value: "Robotics" },
    right:{ category: "Grade", value: "9" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Student", value: "Diya" },
    right:{ category: "Club", value: "Music" }
  },
  {
    type: "EQUAL",
    left: { category: "Bag", value: "Black" },
    right:{ category: "Grade", value: "7" }
  },
  {
    type: "EQUAL",
    left: { category: "Student", value: "Kabir" },
    right:{ category: "Club", value: "Sports" }
  },
  {
    type: "EQUAL",
    left: { category: "Grade", value: "6" },
    right:{ category: "Bag", value: "Red" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Student", value: "Riya" },
    right:{ category: "Bag", value: "Red" }
  },
  {
    type: "NOT_EQUAL",
    left: { category: "Club", value: "Drama" },
    right:{ category: "Grade", value: "9" }
  }
]
,

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
  { type:"NOT_EQUAL", left:{category:"Traveler",value:"Ankit"}, right:{category:"Month",value:"Mar"} },
  { type:"EQUAL", left:{category:"Country",value:"Japan"}, right:{category:"Transport",value:"Plane"} },
  { type:"NOT_EQUAL", left:{category:"Traveler",value:"Deepa"}, right:{category:"Month",value:"Mar"} },
  { type:"EQUAL", left:{category:"Transport",value:"Bus"}, right:{category:"Country",value:"Brazil"} },
  { type:"NOT_EQUAL", left:{category:"Traveler",value:"Chetan"}, right:{category:"Transport",value:"Train"} },
  { type:"EQUAL", left:{category:"Country",value:"Italy"}, right:{category:"Month",value:"Feb"} },
  { type:"NOT_EQUAL", left:{category:"Country",value:"Japan"}, right:{category:"Month",value:"Jan"} },
  { type:"NOT_EQUAL", left:{category:"Transport",value:"Car"}, right:{category:"Month",value:"May"} },
  { type:"NOT_EQUAL", left:{category:"Traveler",value:"Bhavya"}, right:{category:"Country",value:"Brazil"} }
]
,

  solution: {
    House1: { Traveler: "Ankit", Country: "France", Transport: "Train", Month: "Jan" },
    House2: { Traveler: "Bhavya", Country: "Italy", Transport: "Car", Month: "Feb" },
    House3: { Traveler: "Chetan", Country: "Spain", Transport: "Ship", Month: "Mar" },
    House4: { Traveler: "Deepa", Country: "Brazil", Transport: "Bus", Month: "Apr" },
    House5: { Traveler: "Esha", Country: "Japan", Transport: "Plane", Month: "May" }
  }
}
,

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
  { type:"EQUAL", left:{category:"Startup",value:"AI"}, right:{category:"City",value:"Bangalore"} },
  { type:"NOT_EQUAL", left:{category:"Founder",value:"Pooja"}, right:{category:"Startup",value:"FinTech"} },
  { type:"EQUAL", left:{category:"City",value:"Mumbai"}, right:{category:"Funding",value:"Bootstrapped"} },
  { type:"NOT_EQUAL", left:{category:"Founder",value:"Sameer"}, right:{category:"Startup",value:"FinTech"} },
  { type:"EQUAL", left:{category:"Funding",value:"Series B"}, right:{category:"City",value:"Delhi"} },
  { type:"NOT_EQUAL", left:{category:"Founder",value:"Neel"}, right:{category:"Startup",value:"Ecommerce"} },
  { type:"NOT_EQUAL", left:{category:"City",value:"Bangalore"}, right:{category:"Startup",value:"FinTech"} },
  { type:"NOT_EQUAL", left:{category:"Funding",value:"IPO"}, right:{category:"City",value:"Mumbai"} },
  { type:"NOT_EQUAL", left:{category:"Founder",value:"Tara"}, right:{category:"City",value:"Delhi"} }
]
,

  solution: {
    House1: { Founder: "Arjun", Startup: "FinTech", City: "Pune", Funding: "Seed" },
    House2: { Founder: "Neel", Startup: "EdTech", City: "Hyderabad", Funding: "IPO" },
    House3: { Founder: "Pooja", Startup: "Health", City: "Mumbai", Funding: "Bootstrapped" },
    House4: { Founder: "Sameer", Startup: "Ecommerce", City: "Delhi", Funding: "Series B" },
    House5: { Founder: "Tara", Startup: "AI", City: "Bangalore", Funding: "Series A" }
  }
}
,

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
  { type:"RELATIVE_POSITION", left:{category:"Pet",value:"Dog"}, right:{category:"Car",value:"Audi"}, relation:"RIGHT_OF" },
  { type:"NOT_EQUAL", left:{category:"Car",value:"Tesla"}, right:{category:"Floor",value:"1"} },
  { type:"NOT_EQUAL", left:{category:"Car",value:"Tesla"}, right:{category:"Floor",value:"2"} },
  { type:"NOT_EQUAL", left:{category:"Owner",value:"C"}, right:{category:"Drink",value:"Coffee"} },
  { type:"NOT_EQUAL", left:{category:"Floor",value:"1"}, right:{category:"Pet",value:"Dog"} },
  { type:"NOT_EQUAL", left:{category:"Owner",value:"A"}, right:{category:"Floor",value:"3"} },
  { type:"NOT_EQUAL", left:{category:"Owner",value:"A"}, right:{category:"Floor",value:"4"} },
  { type:"NOT_EQUAL", left:{category:"Car",value:"Mercedes"}, right:{category:"Drink",value:"Water"} },
  { type:"NOT_EQUAL", left:{category:"Pet",value:"Bird"}, right:{category:"Floor",value:"4"} },
  { type:"NOT_EQUAL", left:{category:"Drink",value:"Wine"}, right:{category:"Floor",value:"2"} },
  { type:"NOT_EQUAL", left:{category:"Car",value:"Volvo"}, right:{category:"Pet",value:"Cat"} }
]
,

  solution: {
    House1: { Owner: "B", Floor: "1", Car: "BMW", Pet: "None", Drink: "Tea" },
    House2: { Owner: "A", Floor: "2", Car: "Audi", Pet: "Cat", Drink: "Water" },
    House3: { Owner: "C", Floor: "3", Car: "Volvo", Pet: "Bird", Drink: "Wine" },
    House4: { Owner: "D", Floor: "4", Car: "Mercedes", Pet: "Dog", Drink: "Coffee" },
    House5: { Owner: "E", Floor: "5", Car: "Tesla", Pet: "Fish", Drink: "Juice" }
  }
}
,

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
  { type:"NOT_EQUAL", left:{category:"Topic",value:"AI"}, right:{category:"Time",value:"11AM"} },
  { type:"NOT_EQUAL", left:{category:"Topic",value:"AI"}, right:{category:"Time",value:"1PM"} },
  { type:"NOT_EQUAL", left:{category:"Speaker",value:"Gamma"}, right:{category:"Hall",value:"A"} },
  { type:"NOT_EQUAL", left:{category:"Speaker",value:"Gamma"}, right:{category:"Hall",value:"E"} },
  { type:"NOT_EQUAL", left:{category:"Country",value:"Japan"}, right:{category:"Time",value:"9AM"} },
  { type:"NOT_EQUAL", left:{category:"Country",value:"Japan"}, right:{category:"Time",value:"5PM"} },
  { type:"NOT_EQUAL", left:{category:"Topic",value:"Economics"}, right:{category:"Hall",value:"A"} },
  { type:"NOT_EQUAL", left:{category:"Country",value:"Brazil"}, right:{category:"Time",value:"9AM"} },
  { type:"NOT_EQUAL", left:{category:"Country",value:"Brazil"}, right:{category:"Time",value:"11AM"} },
  { type:"NOT_EQUAL", left:{category:"Speaker",value:"Delta"}, right:{category:"Country",value:"USA"} },
  { type:"NOT_EQUAL", left:{category:"Speaker",value:"Beta"}, right:{category:"Topic",value:"Security"} }
]
,

  solution: {
    House1: { Speaker: "Alpha", Topic: "AI", Country: "USA", Time: "9AM", Hall: "A" },
    House2: { Speaker: "Beta", Topic: "Climate", Country: "India", Time: "11AM", Hall: "B" },
    House3: { Speaker: "Gamma", Topic: "Health", Country: "Germany", Time: "1PM", Hall: "C" },
    House4: { Speaker: "Delta", Topic: "Economics", Country: "Japan", Time: "3PM", Hall: "D" },
    House5: { Speaker: "Omega", Topic: "Security", Country: "Brazil", Time: "5PM", Hall: "E" }
  }
}


];
