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

    currflick.style.color = "#d6a81d"   
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
    const currflick = currbutton.parentElement
    const i = this.flicks.indexOf(currflick)

    const prev = this.flicks[i - 1]
    this.flicks[i-1] = currflick
    this.flicks[i] = prev
    
    
  },

  handleDown(ev) {
    const currbutton = ev.target
    const currflick = currbutton.parentElement
    const i = this.flicks.indexOf(currflick)

    const next = this.flicks[i + 1]
    this.flicks[i+1] = currflick
    this.flicks[i] = next

  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name

    const upbutton = document.createElement('a')
    upbutton.textContent = "↑"
    upbutton.setAttribute("class", "clear button")
    upbutton.setAttribute("id","up")
     upbutton.addEventListener (
        'click', this.handleUp.bind(this)
    )

    const downbutton = document.createElement('a')
    downbutton.textContent = "↓"
    downbutton.setAttribute("class", "clear button")
    downbutton.setAttribute("id","down")
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
    }

    if (flick.name.length != 0) {
    const listItem = this.renderListItem(flick)
    this.list.appendChild(listItem)
    this.flicks[flick.id - 1] = flick

    this.max ++

    f.reset()
    }
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})