const URL_POSTS = 'https://gorest.co.in/public-api/posts'
const URL_CURRENT = new URL(window.location.href)
let currentPage = new URLSearchParams(URL_CURRENT.search).get('page')

function createListItem(article) {
  const list = document.getElementsByClassName('list-group')

  const item = () => {
    const item = document.createElement('a')
    item.classList.add('list-group-item', 'list-group-item-action')
    item.style.textDecoration = 'none'
    item.href = `post.html?id${article.id}`
    item.id = article.id
    item.setAttribute('data-userId', article.user_id)
    item.textContent = article.title
    item.onclick = () => {
      item.classList.add('active')
    }
    item.onblur = () => {
      item.classList.remove('active')
    }
    return item
  }
  list[0].append(item())
}

async function loadData(url) {
  const response = await fetch(url)
  return await response.json()
}

loadData(URL_POSTS + URL_CURRENT.search)
  .then(response => {
  document.getElementsByClassName('spinner-border')[0].remove()

  response.data.forEach(element => {
    createListItem(element)
  })
  document.getElementById('page-num').textContent = response.meta.pagination.page
})


function changePage(page) {
  if (!page || page == null) page = 2

  if (page === 1) {
    return window.location.assign(URL_CURRENT.origin + URL_CURRENT.pathname)
  } else {
    return window.location.assign(URL_CURRENT.origin + URL_CURRENT.pathname + '?page=' + page)
  }
}

function prevPage() {
  if (currentPage < 1) currentPage = 1
  if (currentPage > 1) {
    currentPage--
    changePage(currentPage)
  }
}

function nextPage() {
  loadData(URL_POSTS + URL_CURRENT.search)
    .then(response => {
      const totalPages = response.meta.pagination.pages

      if (!currentPage || currentPage == null) {
        return changePage(currentPage)
      }
      if (currentPage >= totalPages) {
        return changePage(totalPages)
      }
      if (currentPage < totalPages) {
        currentPage++
        return changePage(currentPage)
      }
    })
}

async function lastPage() {
  await loadData(URL_POSTS + URL_CURRENT.search)
    .then(response => {
      const totalPages = response.meta.pagination.pages
      changePage(totalPages)
    })
}
