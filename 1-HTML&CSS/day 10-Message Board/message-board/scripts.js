$.ajax({
  method: "get",
  url: "https://next-message-board.herokuapp.com/messages",
  beforeSend: function() {
    $("#loader").show();
  },
  success: function(messages) {
    $("#loader").hide();
    console.log(messages);
    $("#message-list").html("");

    messages.forEach(msg => {
      $("#message-list").append(`
        <div id=${msg.id} class="card text-center" style="width: 300px;">
          <div class="card-body">
            <p>${msg.text}</p>
          </div>
          <div class="card-footer text-muted">
            ${moment(msg.created_at).format("MMMM D, YYYY - h:mmA")}
          </div>
          <button class="delete-btn">Delete</button>
        </div>
      `);

      let messageCards = document.querySelectorAll(".card");
      messageCards.forEach(card => {
        let x = Math.floor(Math.random() * 256);
        let y = Math.floor(Math.random() * 256);
        let z = Math.floor(Math.random() * 256);
        let bgColor = "rgb(" + x + "," + y + "," + z + ")";
        card.style.backgroundColor = bgColor;
      });
    });
  }
});

$("form").submit(function(event) {
  event.preventDefault();
  const myMessage = $("input").val();
  $("input").val("");
  console.log(myMessage);
  $.ajax({
    method: "post",
    url: "https://next-message-board.herokuapp.com/messages",
    data: {
      text: myMessage
    },
    beforeSend: function() {
      $("#loader").show();
    },
    success: function(data) {
      $("#loader").hide();
      console.log(data);
      const messages = data.message;
      $("#message-list").prepend(`
      <div id=${messages.id} class="card text-center" style="width: 300px;">
        <div class="card-body">
          <p>${messages.text}</p>
        </div>
        <div class="card-footer text-muted">
          ${moment(messages.created_at).format("MMMM D, YYYY - h:mmA")}
        </div>
        <button class="delete-btn">Delete</button>
      </div>
    `);
      const cards = document.querySelectorAll(".card");
      cards.forEach(card => {
        let x = Math.floor(Math.random() * 256);
        let y = Math.floor(Math.random() * 256);
        let z = Math.floor(Math.random() * 256);
        let bgColor = "rgb(" + x + "," + y + "," + z + ")";
        card.style.backgroundColor = bgColor;
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
});

$("#message-list").on("click", ".delete-btn", function(e) {
  e.preventDefault();
  console.log(e.target);
  const message = e.target.parentNode;
  const messageId = e.target.parentNode.id;
  $.ajax({
    method: "post",
    url: `https://next-message-board.herokuapp.com/messages/delete/${messageId}`,
    success: function(data) {
      message.remove();
    }
  });
});
