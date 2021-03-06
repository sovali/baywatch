const app = {
  init(selectors) {
    var data = localStorage.getItem("flicks")
    if (data) {
    this.flicks = JSON.parse(data)
    } else {
      this.flicks = []
    }
    this.list = document.querySelector(selectors.listSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener(
        'submit', 
        this.handleSubmit.bind(this)
      )

    document
      .querySelector('#clearall')
      .addEventListener(
        'click',
        this.handleClearList.bind(this)
      )

    document
      .querySelector('#saveall')
      .addEventListener(
        'click', this.handleSave.bind(this)
        )
      
    document
      .querySelector('#searchall')
      .addEventListener(
        'click', 
        this.handleSearch.bind(this)
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

  handleSearch(ev) {
    console.log("search works")
  },

  handleUp(ev) {
    const currbutton = ev.target
    const currflick = currbutton.parentElement // list item!
    const i = this.flicks.findIndex(function(flick) {
      return (currflick.textContent.match(flick.name))
    })
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

  handleEdit(ev) {
    const currspan = ev.target
    if (currspan.getAttribute("contenteditable") == 'false') {
      const i = this.flicks.findIndex(function(flick) {
      return (currspan.textContent.match(flick.name))
    })
      this.currEdit = i;
      currspan.setAttribute("contenteditable", 'true')
    } else if(currspan.getAttribute("contenteditable") == 'true') {
      
      const newName = currspan.textContent
      this.flicks[this.currEdit].name = `${newName}`
      console.log(this.flicks[this.currEdit].name)
      currspan.setAttribute("contenteditable", 'false')
    }
  },


  handleSave(ev) {
   localStorage.setItem('list', JSON.stringify(document.querySelector('#flick-list').innerHTML))
   localStorage.setItem('flicks',JSON.stringify(this.flicks))
},

  handleClearList(ev) {
    document.getElementById('flick-list').innerHTML = ""
    this.flicks = []
  },


  renderListItem(flick) {
    const item = document.createElement('li')
    const sp = document.createElement('span')
    sp.textContent = `${flick.name}`
    sp.setAttribute("contenteditable",false)
    sp.addEventListener(
      'dblclick',this.handleEdit.bind(this)
    )
    item.appendChild(sp)
    item.dataset = item.id;
    


    const upbutton = document.createElement('a')
    upbutton.textContent = "↑"
    upbutton.setAttribute("class", "button primary")
    upbutton.setAttribute("class","up")
     upbutton.addEventListener (
        'click', this.handleUp.bind(this)
    )

    const downbutton = document.createElement('a')
    downbutton.textContent = "↓"
    downbutton.setAttribute("class","button primary")
    downbutton.setAttribute("class","down")
    downbutton.addEventListener (
        'click', this.handleDown.bind(this)
    )


    const favbutton = document.createElement('a')
    favbutton.textContent = "add to favorites"
    favbutton.setAttribute("class","button warning fav")
    favbutton.addEventListener (
        'click', this.handleFav.bind(this)
    )

    const delbutton = document.createElement('a')
    delbutton.textContent = "delete"
    delbutton.setAttribute("class","button alert del")
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