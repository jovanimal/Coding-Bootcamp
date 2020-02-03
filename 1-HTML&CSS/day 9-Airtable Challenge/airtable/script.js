$(document).ready(() => {
  // Rest of my code here

  /* Retrieve All Records */

  $.ajax({
    url: "https://api.airtable.com/v0/appDq8YmpMXWu65EJ/Products",
    method: "GET",
    headers: {
      Authorization: "Bearer keyWACSg63SRJRpi3"
    },
    success: result => {
      console.log(result);
      result.records.forEach(record => {
        let imageUrl;
        if (!record.fields.images || record.fields.images.length == 0) {
          imageUrl = "https://via.placeholder.com/300x200";
        } else {
          imageUrl = record.fields.images[0].thumbnails.large.url;
        }
        $("#product-container").append(
          `<div class="card" style="width: 18rem;">
            <h2 class="card-title">${record.fields.Book}</h2>
            <img class="card-img-top" src="${imageUrl}" alt="${record.fields.Book}" />
            <div class="card-body">
              <h5>RM${record.fields.Price}.00</h5>
              <p>${record.fields.Description}</p>
            </div>
            <button type="button" class="btn btn-primary" href="#buyNow">Buy Now</button>
           </div>
          `
        );
      });
    },
    error: error => {
      console.log("Error: ", error);
    }
  });

  /* Add new record */

  let formData = {
    fields: {
      "Product Name": "Burgers",
      "Offered Price": 1,
      Notes: "Hello"
    }
  };

  $.ajax({
    url: "https://api.airtable.com/v0/appDq8YmpMXWu65EJ/Products",
    method: "POST",
    headers: {
      Authorization: "Bearer keyWACSg63SRJRpi3",
      "Content-Type": "application/json"
    },
    data: JSON.stringify(formData),
    success: result => {
      console.log(result);
    },
    error: error => {
      console.log("Error: ", error);
    }
  });
});
