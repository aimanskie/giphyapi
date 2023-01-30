const gifForm = document.querySelector('#gif-form')
const seeMore = document.querySelector('#see-more')
const searchRes = document.querySelector('.search-results')
const moreDisplay = document.querySelector('.show-more')
const trendAside = document.querySelector('.trending-aside')
const randomAside = document.querySelector('.random-aside')
const searchInput = document.querySelector('.search')
let startShow = 0

function fetchSearchGif(event) {
  event.preventDefault()
  searchWord = searchInput.value
  fetch(`https://api.giphy.com/v1/gifs/search?api_key=6kBTI39gbdUoJYBAcx3riCYyPsHeCud7&q=${searchWord}&limit=22&offset=${startShow}&rating=g&lang=en`)
    .then(response => {
      return response.json()
    })
    .then(res => {
      let dataArray = res.data
      console.log(dataArray)
      showSearchGif(dataArray)
    })
    .catch(err => {
      console.log(err)
      searchRes.innerHTML = '<h4>We are extremely sorry for the inconvenience, thank you for waiting, the site will be back up again real soon</h4>'
    })
  startShow += 22
}

function showSearchGif(dataArray) {
  let outputSearch = '<div class="search-results">'

  dataArray.forEach(imgData => {
    outputSearch += `<a href='${imgData.images.original.url}' alt='${imgData.title}' target='_blank'><img src='${imgData.images.original.url}'></a>`
  })
  searchRes.innerHTML = outputSearch
}

function fetchTrendingGif() {
  fetch(`https://api.giphy.com/v1/gifs/trending?api_key=6kBTI39gbdUoJYBAcx3riCYyPsHeCud7&limit=10&rating=g`)
    .then(response => {
      return response.json()
    })
    .then(res => {
      let dataArray = res.data
      showTrendingGif(dataArray)
    })
    .catch(err => {
      console.log(err)
      searchRes.innerHTML = '<h4>We are extremely sorry the gifs are not showing up at the moment</h4>'
    })
}

function showTrendingGif(dataArray) {
  let outputTrending = '<div class="trending-aside">'
  dataArray.forEach(imgData => {
    outputTrending += `<a href='${imgData.images.original.url}' alt='${imgData.title}' target='_blank'><img src='${imgData.images.original.url}'></a>`
  })
  trendAside.innerHTML = outputTrending
}

function fetchRandomGif() {
  fetch(`https://api.giphy.com/v1/gifs/random?api_key=6kBTI39gbdUoJYBAcx3riCYyPsHeCud7&tag=&rating=g`)
    .then(response => {
      return response.json()
    })
    .then(res => {
      let dataRandom = res.data
      showRandomGif(dataRandom)
    })
    .catch(err => {
      console.log(err)
      searchRes.innerHTML = '<h4>We are extremely sorry the gifs are not showing up at the moment</h4>'
    })
}

function showRandomGif(dataRandom) {
  let outputRandom = '<div class="random-aside">'
  outputRandom += `<a href='${dataRandom.images.original.url}' alt='${dataRandom.title}' target='_blank'><img src='${dataRandom.images.original.url}'></a>`
  randomAside.innerHTML = outputRandom
}

gifForm.addEventListener('submit', fetchSearchGif)
seeMore.addEventListener('submit', fetchSearchGif)
fetchTrendingGif()
fetchRandomGif()
setInterval(fetchRandomGif, 5000)