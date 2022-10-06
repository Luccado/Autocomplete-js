let countries = [];
const countryListElement = document.querySelector("#country-List");

function fetchCountries() {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        countries = data.map((x) => x.name.common);
        countries.sort();
        loadData(countries, countryListElement);
    });
}

function loadData(data, element) {
  if (data) {
    element.innerHTML = "";
    let innerElement = "";
    data.forEach((item) => {
      innerElement += `
      <li>${item}</li>`;
    }
      );

    element.innerHTML = innerElement;

  }
}

function filterData(data, searchText) {
  return data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase()));
}
fetchCountries();

countryInputElement.addEventListener("input", function(){
  const filteredData = filterData(countries, countryInputElement.value);
  loadData(filteredData, countryListElement);
});