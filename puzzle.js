console.log("Puzzle JS loaded");



const PUZZLES = [
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
    "Amit does not drink Coffee.",
    "The person in Pune drinks Tea.",
    "Neha lives in Jaipur."
  ]
},

{
  id: "L1-P2",
  level: 1,
  title: "Pet Choices",
  houses: 3,
  categories: {
    Person: ["Rahul", "Sonia", "Karan"],
    Pet: ["Dog", "Cat", "Fish"],
    Color: ["Red", "Blue", "Green"]
  },
  clues: [
    "The person with the Dog lives in the Red house.",
    "Sonia does not own the Fish.",
    "Karan lives in the Blue house."
  ]
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
    "The Sharma family does not celebrate Eid.",
    "The Blue house celebrates Pongal.",
    "The Patel family lives in the Yellow house.",
    "The Green house celebrates Diwali."
  ]
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
    "Meera does not go Shopping.",
    "The person who goes Hiking does it on Sunday.",
    "Anu’s plan is on Friday.",
    "The Movie plan is not on Monday."
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
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
  ]
}
];
