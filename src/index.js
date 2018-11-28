document.addEventListener('DOMContentLoaded', () => {

  fetchAllGifts().then(displayGifts)

  document.getElementById("new-gift-form").addEventListener("submit",submitGift)
  document.getElementsByClassName("gift-list")[0].addEventListener("click",deleteGift)
  document.getElementById("filter-input").addEventListener("keyup", filterGifts)

})

function fetchAllGifts() {
  return fetch("http://localhost:3000/gifts")
  .then(res => res.json())
}

function displayGifts(givenGifts) {
  let ul = document.querySelector("ul[class=gift-list]")
  ul.innerHTML=''
  for(gift of givenGifts){
    let eachGift = `<li>
                      <h2>${gift.name}</h2>
                      <img src="${gift.image}"></img>
                      <button data-id="${gift.id}" class="aGift">Delete</button>
                      <hr>
                    </li>`
    ul.innerHTML+=eachGift
  }
}

function submitGift(givenEvent) {
  let name = document.getElementById("gift-name-input").value
  let image = document.getElementById("gift-image-input").value
    fetch("http://localhost:3000/gifts", {method:"POST",
    headers:
    {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({name:name, image:image})
    })
}

function deleteGift(givenEvent) {
  if(givenEvent.target.className==="aGift"){
    let id = givenEvent.target.dataset.id
    fetch(`http://localhost:3000/gifts/${id}`,{method:"DELETE"}).then(fetchAllGifts).then(displayGifts)
  }
}

function filterGifts(givenEvent) {
  fetchAllGifts().then((gifts)=>{
     return gifts.filter((eachGift)=>{
      return eachGift.name.includes(givenEvent.target.value)
    })
  }).then(displayGifts)
}
