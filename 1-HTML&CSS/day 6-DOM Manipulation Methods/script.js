let paragraph = document.getElementsByTagName("p");

paragraph[0].innerHTML = " I am Jovan"
// console.log(paragraph[0])

let tag = document.getElementsByTagName('p')

// console.log(tag[0])

let className = document.getElementsByClassName("description")

// console.log(className)

// function myFunction() {
//   var btn = document.createElement("button");
//   btn.innerText = 'Click me Again?'
//   document.body.appendChild(btn);
// }

// function myFunction1() {
//   var h = document.createElement("H1");
//   var t = document.createTextNode("Hello World");
//   h.appendChild(t);
//   document.body.appendChild(h);
// }

function myFunction2() {
  var list = document.getElementById("myList");
  list.removeChild(list.childNodes[0]);
}

let parent = document.createElement("div")
let p = document.createElement("p")
parent.append("Some text", p , "Another text below p")
p.innerText = "I am a paragraph"

console.log(parent) 