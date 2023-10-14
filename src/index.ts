import "./style/styles.css";
import { CountryList, ICountry } from "./api/countryApi/model";
import { objectToString } from "./utils/utils";
import {
  fetchAllCountries,
  fetchCountriesByName,
  fetchCountryDetail
} from "./api/countryApi/countryApi";

const list = document.getElementById("list") as HTMLUListElement;
const form = document.getElementById("search-form") as HTMLFormElement;
const input = document.getElementById("search-input") as HTMLInputElement;
const card = document.getElementById("detail") as HTMLDivElement;
const errorMessage = document.getElementById("error-message") as HTMLDivElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  resetSelectedItem();

  if (input?.value == "" || input?.value == null) {
    createCountryList();

    return;
  }

  searchCountryByName(input.value);
});

createCountryList();

async function createCountryList() {
  const { data: countryList, error, isError } = await fetchAllCountries();
  if (isError) {
    displayError(error);

    return;
  }

  if (countryList !== undefined) {
    errorMessage.innerHTML;
    populateCountryList(countryList);
  }
}

async function searchCountryByName(name: string) {
  const { data: countryList, error, isError } = await fetchCountriesByName(
    name
  );
  if (isError) {
    displayError(error);

    return;
  }

  if (countryList !== undefined) {
    errorMessage.innerHTML;
    populateCountryList(countryList);
  }
}

async function selectCountry(country: ICountry, index: number) {
  const { data: countryListDetail, error, isError } = await fetchCountryDetail(
    country.name.official
  );
  resetSelectedItem();

  const itemSelected = document.getElementById(`item-${index}`);
  const cardMobile = document.getElementById(`item-detail-mobile-${index}`);

  itemSelected?.classList.add("active");

  if (isError) {
    card.innerHTML = error;

    return;
  }

  if (countryListDetail !== undefined) {
    const countryDetail = countryListDetail[0];
    card.innerHTML = `
    <div class="card">
      <img src=${countryDetail.flags.png} class="card-img-top" alt="flag">
      ${populateCardInfo(countryDetail)}
      </div>
  `;

    if (cardMobile !== null) {
      cardMobile.innerHTML = `
      <div class="card detail-country">
        <div class="d-flex culumn">
          <div class="flag-image">
            <img src="${
              countryDetail.flags.png
            }" class="img-fluid rounded-start" alt="flag">
          </div>
          <div class="info-country">
            ${populateCardInfo(countryDetail)}
          </div>
        </div>
      </div>
    `;
    }
  }
}

function populateCountryList(countryList: CountryList) {
  list.innerHTML = `
   ${countryList.map((country, index) => {
     return `<li id="item-${index}" class="list-group-item d-flex flex-column align-items-start">   
                <div>
                  Code: ${country.cca2}
                </div>
                <div>
                  Name: ${country.name.official}
                </div>
             </li>
             <div id="item-detail-mobile-${index}" class="card detail-country">
              </div>
             `;
   })}
     `;

  countryList.map((value, index) => {
    const item = document.getElementById(`item-${index}`);
    item?.addEventListener("click", () => {
      selectCountry(value, index);
    });
  });
}

function populateCardInfo(countryDetail: ICountry) {
  return `<div class="card-body">
            <h4 class="card-title">Name: ${countryDetail.name.common}</h4>
            <p class="card-text">Capital: ${countryDetail.capital}</p>
            <p class="card-text">Population: ${countryDetail.population}</p>
            <p class="card-text">Time zones: ${countryDetail.timezones.toString()}</p>
            <p class="card-text">Languages: ${objectToString(
              countryDetail.languages
            )}</p>
            <p class="card-text">Currencies: ${objectToString(
              Object.keys(countryDetail.currencies)
            )}</p>
            <p class="card-text">Border Countrie</p>
          </div>`;
}

function displayError(error: string) {
  errorMessage.innerHTML = error;
}

function resetSelectedItem() {
  card.innerText = "";
  const items = document.querySelectorAll(".list-group-item");
  const itemsMobileCard = document.querySelectorAll(".detail-country");
  items.forEach((item) => {
    item.classList.remove("active");
  });

  itemsMobileCard.forEach((item) => {
    item.innerHTML = "";
  });
}
