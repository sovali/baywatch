const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener(
        'submit', 
        this.handleSubmit.bind(this)
      )

  },

  handleFav(ev) {
    const currbutton = ev.target
    const currflick = currbutton.parentElement

    currflick.fav = !currflick.fav

    if (currflick.fav) {
      currflick.style.color = "#d6a81d"
    } else {
      currflick.style.color = "black"
    }
  },

  handleDel(ev) {
    const currbutton = ev.target
    const currflick = currbutton.parentElement
    
    const i = this.flicks.indexOf(currflick)
    this.flicks.splice(i,1)

    currflick.parentNode.removeChild(currflick)
  },

  handleUp(ev) {
    const currbutton = ev.target
    const currflick = currbutton.parentElement // list item!
    const i = this.flicks.findIndex(function(flick) {
      return (currflick.textContent.match(flick.name))
    })
    console.log(i)
    console.log(currflick)
    if (i > 0) {
      const curr = this.flicks[i]
      const prev = this.flicks[i - 1]
      this.flicks[i-1] = curr
      this.flicks[i] = prev

      this.list.insertBefore(currflick, currflick.previousSibling)
    }

  },

  handleDown(ev) {
    const currbutton = ev.target
    const currflick = currbutton.parentElement
    const i = this.flicks.findIndex(function(flick) {
      return (currflick.textContent.match(flick.name))
    })
    if (i < this.flicks.length-1) {
      const curr = this.flicks[i]
      const next = this.flicks[i + 1]
      this.flicks[i+1] = curr
      this.flicks[i] = next

      this.list.insertBefore(currflick, currflick.nextSibling.nextSibling)
    }
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name
    item.dataset = item.id;

    const upbutton = document.createElement('a')
    upbutton.textContent = "↑"
    upbutton.setAttribute("class", "clear button")
    upbutton.setAttribute("class","up")
     upbutton.addEventListener (
        'click', this.handleUp.bind(this)
    )

    const downbutton = document.createElement('a')
    downbutton.textContent = "↓"
    downbutton.setAttribute("class", "clear button")
    downbutton.setAttribute("class","down")
    downbutton.addEventListener (
        'click', this.handleDown.bind(this)
    )


    const favbutton = document.createElement('a')
    favbutton.textContent = "add to favorites"
    favbutton.setAttribute("class","button warning")
    favbutton.addEventListener (
        'click', this.handleFav.bind(this)
    )

    const delbutton = document.createElement('a')
    delbutton.textContent = "delete"
    delbutton.setAttribute("class","button alert")
    delbutton.addEventListener (
        'click', this.handleDel.bind(this)
    )
    item.appendChild(upbutton)
    item.appendChild(downbutton)
    item.appendChild(favbutton)
    item.appendChild(delbutton)
    return item
  },



  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
      fav: false,
    }

    if (flick.name.length != 0) {
    const listItem = this.renderListItem(flick)
    this.list.appendChild(listItem)

    this.flicks.unshift(flick)
    this.list.insertBefore(listItem, this.list.firstElementChild)

    f.reset()
  }
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})