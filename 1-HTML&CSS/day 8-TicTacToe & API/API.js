// Vanilla Javascript fetch function
// fetch("https://api.tronalddump.io/random/quote")
//   .then(response => {
//     return response.json();
//   })
//   .then(result => {
//     document.write(`<h1>${result.value}</h1>`);
//   });
//   document.write('Hello World')
const clickGiphy = () => {
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/random?api_key=Bl4TCIf3LWaVF8dgTrFE2PBlwfbuvAbY&tag=&rating=G",
    method: "GET",
    success: result => {
      let image = document.createElement('img');
      image.src = result.data.image_url;
      document.body.append(image);
      console.log(result);
      // document.write(result.value)
    },
    error: error => {
      document.write("Something went wrong, please refresh and try again!");
    }
  });
};

const chuckNorris= () => {
  $.ajax({
    url: "https://api.chucknorris.io/jokes/random",
    method: "GET",
    success: result => {
      let chuck = document.createElement('p');
      chuck.innerHTML = result.value;
      document.body.append(chuck);
      
    },
    error: error => {
      document.write("Something went wrong, please refresh and try again!");
    }
  });
};

const donaldTrump = () => {
  $.ajax({
    url: "https://api.tronalddump.io/random/quote",
    method: "GET",
    success: result => {
      let donald = document.createElement('p');
      donald.innerHTML = result.value;
      document.body.append(donald);
    },
    error: error => {
      document.write("Something went wrong, please refresh and try again!");
    }
  });
}