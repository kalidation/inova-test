import { HttClient } from "../client/httpClient";
import { CountryList, ICountry } from "./model";
import { COUNTRY_API_URLS } from "./constant";
import { IFetchResponse } from "../client/model";

export async function fetchAllCountries(): Promise<
  IFetchResponse<CountryList>
> {
  const http = new HttClient();
  let countyrListResponse: IFetchResponse<CountryList>;

  try {
    countyrListResponse = await http.get<CountryList>(
      COUNTRY_API_URLS.ALL_COUNTRY_URL
    );
  } catch (error) {
    return {
      data: undefined,
      isError: true,
      error: error as string
    };
  }

  return countyrListResponse;
}

export async function fetchCountriesByName(
  name: string
): Promise<IFetchResponse<CountryList>> {
  const http = new HttClient();
  let countyrListResponse: IFetchResponse<CountryList>;

  try {
    countyrListResponse = await http.get<CountryList>(
      COUNTRY_API_URLS.NAME_COUNTRY_URL(name)
    );
  } catch (error) {
    return {
      data: undefined,
      isError: true,
      error: error as string
    };
  }

  return countyrListResponse;
}

export async function fetchCountryDetail(
  name: string
): Promise<IFetchResponse<CountryList>> {
  const http = new HttClient();
  let countryDetailResponse: IFetchResponse<CountryList>;

  try {
    countryDetailResponse = await http.get<CountryList>(
      COUNTRY_API_URLS.DETAIL_COUNTRY_URL(name)
    );
  } catch (error) {
    return {
      data: undefined,
      isError: true,
      error: error as string
    };
  }

  return countryDetailResponse;
}
