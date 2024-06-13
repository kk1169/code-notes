---
layout: default
title: "Introduction"
permalink: /introduction
---

# Welcome to My Introduction

## Scope
Scope defines the accessibility and lifetime of a variable in a program.

1. Global Scope
2. Local Scope
3. Block Scope

### Example:
**Global Scope**
```javascript
let a = 10; // globally variable define

function display() {
  a = 20;
  console.log(a);
}

display();
console.log(a);
```
**Local Scope**
```javascript
function display() {
  let a = 10;
  console.log(a);
}

display();
console.log(a); // a is not defined
```
**Block Scope**
```javascript
{
  let a = 20;
}
console.log(a);
```
## filter() (filtered array will return)
```javascript
let user = [
  { name: "John", email: "john@example.com" },
  { name: "Kelly", email: "kelly@example.com" },
  { name: "Peter", email: "peter@example.com" },
];

let filterUser = user.filter((u) => u.name !== "Kelly"); // filtered array will return
console.log("filterUser", filterUser);

Note:: (u) we can say iterator
```

## map() (modified array will return)
```javascript
let modifyUser = user.map((u) => {
  let item = {
    name: u.name,
    email: u.email,
    status: u.name === "John" ? true : false,
  };
  return item;
});
```
## find() (first founded object will return)
```javascript
let user = [
  { name: "John", email: "john@example.com" },
  { name: "Kelly", email: "kelly@example.com" },
  { name: "Peter", email: "peter@example.com" },
];

let isFound = user.find((u) => u.name === "Kelly");
console.log("Found", isFound);

```