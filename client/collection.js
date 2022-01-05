let cardNameEntry = document.querySelector("#card-name-entry");

const autoComplete = (e) => {
  axios.get(`https://api.scryfall.com/cards/autocomplete?q=${cardNameEntry.value}`)
    .then((autoRes) => {
      console.log(autoRes.data)
      showResultsCard(autoRes.data.data)
    });
};

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
        //console.log(autoRes.data.data)
        let x = autoRes.data.data
        let results = []
        
        if(setNameEntry.value.length > 1){for(let i = 0; i < x.length; i++){
            let y = x[i].name
            //console.log(y)
            if(y.includes(setNameEntry.value))(
                results.push(y)
            )
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


const addToCollection = (e) =>{
    
}