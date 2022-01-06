let cardNameEntry = document.querySelector("#card-name-entry");

const autoComplete = (e) => {
  axios.get(`https://api.scryfall.com/cards/autocomplete?q=${cardNameEntry.value}`)
    .then((autoRes) => {
      console.log(autoRes.data)
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
  console.log(resultItems)
  for(let i = 0; i <resultItems.length; i++){
      resultItems[i].addEventListener("click", getItemInfoCard)
  }
}

const getItemInfoCard = (e) =>{
    console.log(e.target.id)
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
        console.log(autoRes.data.data)
        let x = autoRes.data.data
        let results = []
        
        if(setNameEntry.value.length > 1){
          for(let i = 0; i < x.length; i++){
            let y = x[i].name
            //console.log(y)
            if(y.includes(setNameEntry.value)){
                results.push(y)
          }
        }
        console.log(results)
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
    console.log(resultItems)
    for(let i = 0; i <resultItems.length; i++){
        resultItems[i].addEventListener("click", getItemInfoSet)
    }
  }

  const getItemInfoSet = (e) =>{
    console.log(e.target.id)
    setNameEntry.value = e.target.id
    closeList()
} 

let setQuanityEntry = document.querySelector(".quantity-input")
let qualityEntry = document.querySelector(".quality-select")
let setQualityEntry = qualityEntry.options[qualityEntry.selectedIndex]
let setBoughtValue = document.querySelector(".bought-value")
let addButton = document.querySelector(".add-card-btn")
// let cardValue = cardValueCalc()

const addToCollection = (e) =>{
  console.log('add')
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
      <td id="value" class="collection-inputs">${cardValueCalc(setNameEntry.value)}</td>
    </tr>
    `

    let deleteButton = document.querySelector("#delete-button")
    deleteButton.addEventListener("click", deleteCard)
  }
  
  addButton.addEventListener("click", addToCollection)
  
  

const deleteCard = (e) =>{
  let x = document.getElementsByClassName('collection-inputs')
  for(let i = 0; i < x.length; i++){
      x[i].parentNode.removeChild(x[i])
  }
}



async function cardValueCalc(set){
  axios.get('https://api.scryfall.com/sets')
  .then((autoRes) => {
    let x = autoRes.data.data
    let setCode = []
    for(let i = 0; i < x.length; i++){
      let y = x[i].name
      //console.log(y, set)
      if(y === set){
        setCode.push(x[i].code)
      }

    }
    console.log(setCode)
    //console.log(`https://api.scryfall.com/cards/named?exact=${cardNameEntry.value.split(' ').join('+')}&set=${setCode[0]}`)
    axios.get(`https://api.scryfall.com/cards/named?exact=${cardNameEntry.value.split(' ').join('+')}&set=${setCode[0]}`)
    .then((autoRes) => {
      console.log(autoRes)
      console.log(autoRes.data)
      console.log(autoRes.data.prices)
      console.log(autoRes.data.prices.usd)
      console.log(parseFloat(autoRes.data.prices.usd))
      return parseFloat(autoRes.data.price.usd)
      
      
    })
  })
}