
  const LIMIT = 15
  let hoverCount = 0

  const btn = document.getElementById('running-btn')
  const count = document.getElementById('count')
  const msg = document.getElementById('msg')

  btn.onclick = function() {
    document.body.innerHTML = '<img src="https://image.freepik.com/free-vector/boom_1308-2927.jpg" />'
  }

  btn.onmouseover = function() { 
    if (hoverCount < LIMIT) { // #2323232
    btn.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16);
  btn.style.top = Math.random() * (window.innerHeight - 100) + 'px'
  btn.style.left = Math.random() * (window.innerWidth - 100) + 'px'
  count.innerHTML = hoverCount
}

    if (hoverCount > 3 && hoverCount < LIMIT) {
    msg.append(' NO!')
  }

   if (hoverCount == LIMIT) {
    msg.append(" Okay la, just click me NOW!")
  }

  hoverCount++
}
