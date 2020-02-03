  $.ajax({
    method: 'get',
    url: 'https://next-message-board.herokuapp.com/messages',
    success: function (result) {
      console.log(result);
      $("#board").html("");

      result.forEach(record => {
        $("#board").append(
          `<div id=${record.id} class="card text-center" style="width: 300px;">
          <div class="card-body">
            <p>${record.text}</p>
          </div>
          <div class="card-footer text-muted">
            ${moment(record.created_at).format("MMMM D, YYYY - h:mmA")}
          </div>
          <button class="delete-btn">Delete</button>
        </div>
          `
        );
      });
    },
    error: function (error) {
      console.log(error)
    }
  })

$('form').on('submit', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'post',
    url: 'https://next-message-board.herokuapp.com/messages',
    data: {
      text: $('#text-input').val()
    },
    success: function (result) {
      console.log(result)
      $('#board').prepend(
        `<div id=${result.message.id} class="card text-center" style="width: 300px;">
          <div class="card-body">
            <p>${result.message.text}</p>
          </div>
          <div class="card-footer text-muted">
            ${moment(result.message.created_at).format("MMMM D, YYYY - h:mmA")}
          </div>
          <button class="delete-btn">Delete</button>
        </div>
        `)
    },
    error: function (error) {
      console.log(error)
    }
  })
})

$('#board').on('click', '.delete-btn', function (e) {
  e.preventDefault()
  const messageId = e.target.parentNode.id;
  $.ajax({
    method: 'post',
    url: `https://next-message-board.herokuapp.com/messages/delete/${messageId}`,
    success: function (data) {
      e.target.parentNode.remove();
    },
    error: function (error) {
      console.log(error)
    }
  })
})