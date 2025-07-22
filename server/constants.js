const UNIT_CONVERSIONS = {
  lpg_cylinder_kg: 14.2,
};

const EMISSION_FACTORS = {
  transport: { auto_rickshaw: 0.1, metro: 0.05, bike: 0.08 },
  electricity: 0.7,
  food: {
    // Veg
    rice: 2.5,
    wheat: 1.2,
    lentils: 0.8,
    paneer: 3.5,
    // Non-Veg
    chicken: 6.9,
    mutton: 39.2,
    fish: 6.1,
  },
  lpg: 2.9,
};

const MONEY_FACTORS = {
  transport: { auto_rickshaw: 12, metro: 3, bike: 4 },
  electricity: 8,
  food: {
    // Veg
    rice: 50,
    wheat: 30,
    lentils: 120,
    paneer: 400,
    // Non-Veg
    chicken: 250,
    mutton: 700,
    fish: 500,
  },
  lpg: 80,
};

module.exports = {
  EMISSION_FACTORS,
  MONEY_FACTORS,
  UNIT_CONVERSIONS,
};
