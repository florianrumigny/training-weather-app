export type City = {
  location: Location;
  current: Current;
};

type Location = {
  name: string;
  localtime: string;
};

type Current = {
  temp_c: number;
  is_day: number; // boolean
  cloud: number;
  feelslike_c: number;
  condition: CurrentConditions;
};

type CurrentConditions = {
  text: string;
  icon: string;
};
