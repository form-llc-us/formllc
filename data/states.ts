export type StateInfo = {
  name: string;
  code: string;
  formationFee: number;
  slug: string;
};

export const US_STATES: StateInfo[] = [
  { name: "Alabama", code: "AL", formationFee: 200, slug: "alabama" },
  { name: "Alaska", code: "AK", formationFee: 250, slug: "alaska" },
  { name: "Arizona", code: "AZ", formationFee: 50, slug: "arizona" },
  { name: "Arkansas", code: "AR", formationFee: 45, slug: "arkansas" },
  { name: "California", code: "CA", formationFee: 70, slug: "california" },
  { name: "Colorado", code: "CO", formationFee: 50, slug: "colorado" },
  { name: "Connecticut", code: "CT", formationFee: 120, slug: "connecticut" },
  { name: "Delaware", code: "DE", formationFee: 110, slug: "delaware" },
  { name: "Florida", code: "FL", formationFee: 125, slug: "florida" },
  { name: "Georgia", code: "GA", formationFee: 100, slug: "georgia" },
  { name: "Hawaii", code: "HI", formationFee: 50, slug: "hawaii" },
  { name: "Idaho", code: "ID", formationFee: 100, slug: "idaho" },
  { name: "Illinois", code: "IL", formationFee: 150, slug: "illinois" },
  { name: "Indiana", code: "IN", formationFee: 95, slug: "indiana" },
  { name: "Iowa", code: "IA", formationFee: 50, slug: "iowa" },
  { name: "Kansas", code: "KS", formationFee: 165, slug: "kansas" },
  { name: "Kentucky", code: "KY", formationFee: 40, slug: "kentucky" },
  { name: "Louisiana", code: "LA", formationFee: 100, slug: "louisiana" },
  { name: "Maine", code: "ME", formationFee: 175, slug: "maine" },
  { name: "Maryland", code: "MD", formationFee: 100, slug: "maryland" },
  { name: "Massachusetts", code: "MA", formationFee: 500, slug: "massachusetts" },
  { name: "Michigan", code: "MI", formationFee: 50, slug: "michigan" },
  { name: "Minnesota", code: "MN", formationFee: 155, slug: "minnesota" },
  { name: "Mississippi", code: "MS", formationFee: 50, slug: "mississippi" },
  { name: "Missouri", code: "MO", formationFee: 50, slug: "missouri" },
  { name: "Montana", code: "MT", formationFee: 70, slug: "montana" },
  { name: "Nebraska", code: "NE", formationFee: 100, slug: "nebraska" },
  { name: "Nevada", code: "NV", formationFee: 75, slug: "nevada" },
  { name: "New Hampshire", code: "NH", formationFee: 100, slug: "new-hampshire" },
  { name: "New Jersey", code: "NJ", formationFee: 125, slug: "new-jersey" },
  { name: "New Mexico", code: "NM", formationFee: 50, slug: "new-mexico" },
  { name: "New York", code: "NY", formationFee: 200, slug: "new-york" },
  { name: "North Carolina", code: "NC", formationFee: 125, slug: "north-carolina" },
  { name: "North Dakota", code: "ND", formationFee: 135, slug: "north-dakota" },
  { name: "Ohio", code: "OH", formationFee: 99, slug: "ohio" },
  { name: "Oklahoma", code: "OK", formationFee: 100, slug: "oklahoma" },
  { name: "Oregon", code: "OR", formationFee: 100, slug: "oregon" },
  { name: "Pennsylvania", code: "PA", formationFee: 125, slug: "pennsylvania" },
  { name: "Rhode Island", code: "RI", formationFee: 150, slug: "rhode-island" },
  { name: "South Carolina", code: "SC", formationFee: 110, slug: "south-carolina" },
  { name: "South Dakota", code: "SD", formationFee: 150, slug: "south-dakota" },
  { name: "Tennessee", code: "TN", formationFee: 300, slug: "tennessee" },
  { name: "Texas", code: "TX", formationFee: 300, slug: "texas" },
  { name: "Utah", code: "UT", formationFee: 54, slug: "utah" },
  { name: "Vermont", code: "VT", formationFee: 125, slug: "vermont" },
  { name: "Virginia", code: "VA", formationFee: 100, slug: "virginia" },
  { name: "Washington", code: "WA", formationFee: 200, slug: "washington" },
  { name: "West Virginia", code: "WV", formationFee: 100, slug: "west-virginia" },
  { name: "Wisconsin", code: "WI", formationFee: 130, slug: "wisconsin" },
  { name: "Wyoming", code: "WY", formationFee: 100, slug: "wyoming" },
  { name: "Washington, DC", code: "DC", formationFee: 99, slug: "washington-dc" },
];

export const STATE_FEE_MAP: Record<string, number> = Object.fromEntries(
  US_STATES.map((s) => [s.name, s.formationFee])
);
