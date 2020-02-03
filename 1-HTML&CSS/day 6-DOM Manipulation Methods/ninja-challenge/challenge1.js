// Challenge 1: Write your answers here'

document.body.style.backgroundColor = "blue"

document.querySelector("header").style.backgroundImage = "url(https://www.w3schools.com/w3css/img_lights.jpg)";

let x = document.querySelectorAll("h2");

for (let i = 0; i < x.length; i++) {
  x[i].style.color = "purple";
}

document.getElementById("name").innerHTML = "Jovan Goh"

let info = document.querySelectorAll(".descriptions")
info[0].innerHTML = "I love writing code."
info[1].innerHTML = "The fire within myself ignite while I am writing code."

let myFace = document.getElementById("my-face");
myFace.setAttribute("src", "data:image/png;base64,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")

let mySkill = document.querySelector("#skill-images img");
// mySkill.setAttribute("src", "data:image/png;base64,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")
mySkill.src = "https://i.ytimg.com/vi/bNUo5bepYoM/hqdefault.jpg"
