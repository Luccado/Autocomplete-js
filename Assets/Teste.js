let countries = [];

let input = document.getElementById("country-input");
let ul = document.getElementById("country-list");

// Apenas para pegar os dados
// É bom fazer funções com funções unicas, essa apenas pegar os dados e retorna
async function fetchCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
}

//  Adicionar o evento de input ao input
input.addEventListener("input", async (e) => {
  let inputedWord = e.target.value;

  // Se o input estiver vazio, limpa a lista
  if(inputedWord.length <= 0) {
    ul.innerHTML = "";
    return;
  }

  // Se o input estiver vazio, não faz nada
  if (inputedWord.length > 0) { 
    // Se o array de países estiver vazio, pega os dados
    if (countries.length === 0) {
      countries = await fetchCountries();
    }

    // Filtra os dados por nome do país
    // Assim é bom pois retorna todos os dados, alem do nome, caso for utilizar
    // ATENÇÃO: Ele filtro pode filtrar por mais campos (AO MESMO TEMPO)
    let filteredCountries = countries.filter((countrie) => {
      // Alem de filtrar por nomes, vou filtrar por altSpellings, capital e nome mais comum
      // Destructing
      const { altSpellings, capital, name: { common }} = countrie;
      let lowerCaseInputedWorld = inputedWord.toLowerCase();
      
      if(altSpellings?.includes(lowerCaseInputedWorld)) {
        return countrie;
      }
      if(capital?.includes(lowerCaseInputedWorld)) {
        return countrie;
      }
      if(common.toLowerCase()?.includes(lowerCaseInputedWorld)) {
        return countrie;
      }
    })

    let ListHTML = "";

    if(filteredCountries.length > 0) {
      filteredCountries.forEach((item) => {
        console.log(`item`, item);
        ListHTML += `
        <li>${item.name.common}</li>`;
      })
    }
    
    // Adiciona os dados filtrados na lista
    ul.innerHTML = ListHTML;
  }

})