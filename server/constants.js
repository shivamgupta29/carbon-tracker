const UNIT_CONVERSIONS = {
  lpg_cylinder_kg: 14.2, // 1 cylinder = 14.2 kg
};
const EMISSION_FACTORS = {
  transport: { auto_rickshaw: 0.1, metro: 0.05, bike: 0.08 },
  electricity: 0.7, // avg kgCO2/kWh
  food: { rice: 2.5, wheat: 1.2, lentils: 0.8 },
  water: 0.0003, // kgCO2/litre
  lpg: 2.9, // kgCO2/kg
};

const MONEY_FACTORS = {
  transport: {
    auto_rickshaw: 12, // avg ₹12 per km
    metro: 3, // avg ₹3 per km
    bike: 4, // avg ₹4 per km (fuel cost)
  },
  electricity: 8, // avg ₹8 per kWh
  food: { rice: 50, wheat: 30, lentils: 120 }, // avg ₹ per kg
  water: 0.02, // avg ₹0.02 per litre
  lpg: 1000, // avg ₹1000 per cylinder
};

module.exports = { EMISSION_FACTORS, MONEY_FACTORS };
