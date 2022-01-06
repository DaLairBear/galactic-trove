let cardNameEntry = document.querySelector("#card-name-entry");

const autoComplete = (e) => {
  axios.get(`https://api.scryfall.com/cards/autocomplete?q=${cardNameEntry.value}`)
    .then((autoRes) => {
      showResultsCard(autoRes.data.data)
    })
}

cardNameEntry.addEventListener("input", autoComplete)

function showResultsCard(arr) {
  res = document.getElementById("result-card")
  res.innerHTML = ""
  let list = ""
  for (let i = 0; i < arr.length; i++) {
    list += `<li class='result-item' id='${arr[i]}'>` + arr[i] + "</li>"
  }
  
  res.innerHTML = "<ul class='result-item'>" + list + "</ul>"
  let resultItems = document.querySelectorAll('.result-item')
  for(let i = 0; i <resultItems.length; i++){
      resultItems[i].addEventListener("click", getItemInfoCard)
  }
}

const getItemInfoCard = (e) =>{
    cardNameEntry.value = e.target.id
    closeList()
}

const closeList = (e) =>{
    let x = document.getElementsByClassName('result-item')
    for(let i = 0; i < x.length; i++){
        x[i].parentNode.removeChild(x[i])
    }
}


let setNameEntry = document.querySelector("#set-name-entry")

const setfinder = (e) =>{
    axios.get(`https://api.scryfall.com/sets`)
    .then((autoRes) => {
        let x = autoRes.data.data
        let results = []
        
        if(setNameEntry.value.length > 1){
          for(let i = 0; i < x.length; i++){
            let y = x[i].name
            if(y.includes(setNameEntry.value)){
                results.push(y)
          }
        }
        showResultsSet(results)}
    })
}

setNameEntry.addEventListener("input", setfinder)

function showResultsSet(arr) {
    res = document.getElementById("result-set")
    res.innerHTML = ""
    let list = ""
    for (let i = 0; i < arr.length; i++) {
      list += `<li class='result-item' id='${arr[i]}'>` + arr[i] + "</li>"
    }
    
    res.innerHTML = "<ul class='result-item'>" + list + "</ul>"
    let resultItems = document.querySelectorAll('.result-item')
    for(let i = 0; i <resultItems.length; i++){
        resultItems[i].addEventListener("click", getItemInfoSet)
    }
  }

  const getItemInfoSet = (e) =>{
    setNameEntry.value = e.target.id
    closeList()
} 

let setQuanityEntry = document.querySelector(".quantity-input")
let qualityEntry = document.querySelector(".quality-select")
let setQualityEntry = qualityEntry.options[qualityEntry.selectedIndex]
let setBoughtValue = document.querySelector(".bought-value")
let addButton = document.querySelector(".add-card-btn")

const addToCollection = async (e) =>{
    res = document.getElementById("collection-inputs")
    res.innerHTML = `
    <tr class="collection-inputs">
      <td class="collection-inputs">
        <button id="delete-button" type="button"  class="collection-inputs">X</button>
      </td>
      <td  class="collection-inputs">${cardNameEntry.value}</td>
      <td  class="collection-inputs">${setNameEntry.value}</td>
      <td  class="collection-inputs">${setQuanityEntry.value}</td>
      <td  class="collection-inputs">${setQualityEntry.value}</td>
      <td  class="collection-inputs">${setBoughtValue.value}</td>
      <td id="value" class="collection-inputs"></td>
    </tr>
    `

    let deleteButton = document.querySelector("#delete-button")
    deleteButton.addEventListener("click", deleteCard)

      let cardValue = await cardValueCalc(setNameEntry.value)
      let valueUpdate = document.querySelector("#value")
      valueUpdate.innerText = cardValue
  }
  
  addButton.addEventListener("click", addToCollection)

const deleteCard = (e) =>{
  let x = document.getElementsByClassName('collection-inputs')
  for(let i = 0; i < x.length; i++){
      x[i].parentNode.removeChild(x[i])
  }
}

async function cardValueCalc(set){
  let code = await axios.get('https://api.scryfall.com/sets')
  .then((autoRes) => {
    let x = autoRes.data.data
    let setCode = []
    for(let i = 0; i < x.length; i++){
      let y = x[i].name
      if(y === set){
        setCode.push(x[i].code)
      }
    }
    return setCode[0]
  })
    let price = await axios.get(`https://api.scryfall.com/cards/named?exact=${cardNameEntry.value.split(' ').join('+')}&set=${code}`)
    .then((autoRes) => {
      return autoRes.data.prices.usd
    })
    return price;
}