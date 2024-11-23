export type City = {
  country: string;
  id: number;
  name: string;
  region: string;
  url: string;
  lat: number;
  lon: number;
};

type SearchCity = {
  id: number;
  displayName: string;
  city: string;
  lat: number;
  lon: number;
};
