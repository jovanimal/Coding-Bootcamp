// Challenge 2: Write your answers here

let node = document.createElement("section");
let heading = document.createElement("h3");
let paragraph = document.createElement("p")

node.appendChild(heading);
node.appendChild(paragraph);

document.querySelector("body").appendChild(node);

let section = document.querySelectorAll("body section")
section[3].className = "last-section";
// console.log(section)

headingTittle = document.querySelector("section h3")
headingTittle.innerHTML = "What do I think of JS";


paragraphText = document.querySelector(".last-section p")
paragraphText.innerHTML = "Javascript is a powerful programming language which covers front end and back end";

let addSkill = document.querySelector("#skills-list")
let newSkill = document.createElement("li");
addSkill.appendChild(newSkill);
newSkill.innerHTML = "BRAND NEW SKILL !"

