import { concactBaseUrl } from "../../utils/utils";

const BASE_URL = "https://restcountries.com/v3.1/";

const ALL_COUNTRY_URL = concactBaseUrl(BASE_URL, "all?fields=name,cca2");

const NAME_COUNTRY_URL = (name: string) =>
  concactBaseUrl(BASE_URL, `name/${name}?fields=name,cca2`);

const DETAIL_COUNTRY_URL = (name: string) =>
  concactBaseUrl(
    BASE_URL,
    `name/${name}?fields=name,cca2,capital,population,languages,currencies,timezones,flags`
  );

export const COUNTRY_API_URLS = {
  ALL_COUNTRY_URL,
  NAME_COUNTRY_URL,
  DETAIL_COUNTRY_URL
};
