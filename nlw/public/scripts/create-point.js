

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //função anônima que está retornando valor
    .then( states => { 

        for( const state of states ) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}<Valor</option>`
         }
    
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelected = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelected].text
    

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
        fetch(url)
        .then( res => res.json())
        .then( cities => { 

            for( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}<Valor</option>`
            }
            citySelect.disabled = false
        } )
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
//pegar todos os li`s
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")
let selectedItems = [] //let é uma variavel

function handleSelectedItem(event) {

    const itemLi = event.target

    //adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)
    
    //verificar se existem items selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso será true or false
        return itemFound
    })

    // se já estiver selecionado, tirar da selecao
    if (alreadySelected >= 0){
        // tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDiferrent = item != itemId
            return itemIsDiferrent
        })

        selectedItems = filteredItems
    } else {

    //se não estiver selecionado, adicionar á seleção
        selectedItems.push(itemId)
    }

    // console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
    
}
