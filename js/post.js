const URL_CURRENT = new URL(window.location.href)
const POST_ID = URL_CURRENT.search.slice(3)
const URL_POSTS = 'https://gorest.co.in/public/v2/posts'
const COMMENTS = 'https://gorest.co.in/public/v2/comments'


async function loadData(url) {
  return fetch(url)
  .then(response => {
    return response.json()
  })
}

loadData(URL_POSTS + '/' + POST_ID)
  .then(response => {
    document.getElementsByClassName('title')[0].textContent = response.title
    document.getElementsByClassName('article')[0].textContent = response.body
  })

  function createComment(el) {
    const list = document.getElementById('comments')

    const item = () => {
      const card = document.createElement('li')
      card.classList.add('card', 'mb-2')

      const cardBody = document.createElement('div')
      cardBody.classList.add('card-body')
      const blockquote = document.createElement('blockquote')
      blockquote.classList.add('blockquote', 'mb-0')
      const p = document.createElement('p')
      p.textContent = el.body

      const commentator = document.createElement('p')
      commentator.classList.add('blockquote-footer')
      const cite = document.createElement('cite')
      cite.textContent = el.name

      commentator.append(cite)
      blockquote.append(p)
      blockquote.append(commentator)
      cardBody.append(blockquote)
      card.append(cardBody)
      return card
    }
    list.append(item())
  }

loadData(COMMENTS + '?post_id=' + POST_ID)
  .then(response => {

    response.forEach(element => {
      createComment(element)
    });
  })
