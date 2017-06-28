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

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name
    const favbutton = document.createElement('button')
    favbutton.textContent = "add to favorites"
    favbutton.setAttribute("class","favbutton")
    const delbutton = document.createElement('button')
    delbutton.textContent = "delete"
    delbutton.setAttribute("class","delbutton")
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
    this.flicks[flick.id - 1] = flick.name
    console.log(this.flicks)

    this.max ++
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})