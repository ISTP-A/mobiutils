export interface BreakGroup {
  id: string;
  name: string;
  items: BreakItem[];
  thumbnail: string;
}

export interface BreakItem {
  id: string;
  location: string;
  named: string;
  gauge: number;
}
