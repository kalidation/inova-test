export type CountryList = ICountry[];

export interface ICountry {
  name: Name;
  cca2: string;
  currencies: object;
  capital: string[];
  languages: Object;
  population: number;
  timezones: string[];
  flags: Flags;
}

interface Name {
  common: string;
  official: string;
  nativeName: Object;
}

interface Xpf {
  name: string;
  symbol: string;
}

export interface Flags {
  png: string;
}
