let user = [
  { name: "John", email: "john@example.com", status: true },
  { name: "Kelly", email: "kelly@example.com", status: false },
  { name: "Peter", email: "peter@example.com", status: true },
];

let isFound = user.findIndex((u) => u.status === true);
console.log(isFound);
