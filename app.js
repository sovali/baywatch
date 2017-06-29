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
    currflick.style.color = yellow;
  },

  handleDel(ev) {
    const currbutton = ev.target
    const currflick = currbutton.parentElement
    
    const i = this.flicks.indexOf(currflick)
    this.flicks.splice(i,1)

    currflick.parentNode.removeChild(currflick)
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name

    const favbutton = document.createElement('button')
    favbutton.textContent = "add to favorites"
    favbutton.setAttribute("class","favbutton")
    favbutton.setAttribute("id",`f${this.id}`)
    favbutton.addEventListener (
        'click', this.handleFav.bind(this)
    )

    const delbutton = document.createElement('button')
    delbutton.textContent = "delete"
    delbutton.setAttribute("class","delbutton")
    delbutton.setAttribute("id", `d${this.id}`)
    delbutton.addEventListener (
        'click', this.handleDel.bind(this)
    )
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

    const listItem = this.renderListItem(flick)
    this.list.appendChild(listItem)
    this.flicks[flick.id - 1] = flick

    this.max ++
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})