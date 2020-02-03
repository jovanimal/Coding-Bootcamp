const div = document.getElementById("gifdiv")
function showGif() {
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/random?api_key=mgvUEYDfC9r7QeIRGBRYUxZYK1GZhF49&tag=&rating=G",
    method: "GET",
    success: function (result) {
      let gif = result.data.image_url;
      div.innerHTML= `<img src="${gif}"></img>`
    },
    error: function (error) {
      document.write("Something went wrong, please try again!");
    }
  });
}
showGif()
function quote1() {
  $.ajax({
    url: "https://api.chucknorris.io/jokes/random",
    method: "GET",
    success: function (result) {
      const chuck = document.getElementById("chuck")
      chuck.innerHTML = "";
      let p = document.createElement("p")
      p.innerText = result.value;
      chuck.appendChild(p);
    },
    error: function (error) {
      console.log(`Error: ${error}`);
    }
  });
}
quote1()