
export interface CropType {
  id: string;
  name: string;
  optimalConditions: {
    temperature: { min: number; max: number; ideal: number };
    humidity: { min: number; max: number; ideal: number };
    soilMoisture: { min: number; max: number; ideal: number };
    lightIntensity: { min: number; max: number; ideal: number };
  };
  growthStages: string[];
  harvestDays: number;
  tips: string[];
}

export const crops: CropType[] = [
  {
    id: "tomato",
    name: "Tomato",
    optimalConditions: {
      temperature: { min: 18, max: 30, ideal: 24 },
      humidity: { min: 40, max: 80, ideal: 65 },
      soilMoisture: { min: 60, max: 80, ideal: 70 },
      lightIntensity: { min: 60, max: 90, ideal: 75 },
    },
    growthStages: ["Seedling", "Vegetative", "Flowering", "Fruiting", "Harvest"],
    harvestDays: 80,
    tips: [
      "Ensure consistent watering to prevent blossom end rot",
      "Provide support for growing vines",
      "Pinch off suckers for larger fruit development",
    ],
  },
  {
    id: "lettuce",
    name: "Lettuce",
    optimalConditions: {
      temperature: { min: 15, max: 22, ideal: 18 },
      humidity: { min: 50, max: 70, ideal: 60 },
      soilMoisture: { min: 65, max: 85, ideal: 75 },
      lightIntensity: { min: 50, max: 70, ideal: 60 },
    },
    growthStages: ["Germination", "Baby Leaf", "Head Formation", "Mature Head", "Harvest"],
    harvestDays: 45,
    tips: [
      "Harvest in the morning for best flavor",
      "Keep soil consistently moist but not waterlogged",
      "Provide shade during hot periods to prevent bolting",
    ],
  },
  {
    id: "strawberry",
    name: "Strawberry",
    optimalConditions: {
      temperature: { min: 16, max: 26, ideal: 20 },
      humidity: { min: 65, max: 85, ideal: 75 },
      soilMoisture: { min: 60, max: 80, ideal: 70 },
      lightIntensity: { min: 70, max: 90, ideal: 80 },
    },
    growthStages: ["Runner", "Vegetative", "Flowering", "Fruiting", "Harvest"],
    harvestDays: 90,
    tips: [
      "Remove runners for better fruit production",
      "Mulch around plants to keep fruits clean",
      "Avoid overhead watering to prevent disease",
    ],
  },
];

export const getHealthStatus = (
  currentValue: number,
  min: number,
  max: number,
  ideal: number
): { status: "optimal" | "warning" | "danger"; message: string } => {
  const offset = Math.abs(currentValue - ideal) / (max - min);
  
  if (currentValue < min || currentValue > max) {
    return {
      status: "danger",
      message: currentValue < min 
        ? "Critically low - immediate action needed" 
        : "Critically high - immediate action needed",
    };
  } else if (offset > 0.25) {
    return {
      status: "warning",
      message: currentValue < ideal
        ? "Below optimal range - consider adjustment"
        : "Above optimal range - consider adjustment",
    };
  } else {
    return {
      status: "optimal",
      message: "Within optimal range - maintain current conditions",
    };
  }
};

export const getCropHealthScore = (
  temperature: number,
  humidity: number,
  soilMoisture: number,
  lightIntensity: number,
  cropId: string
): number => {
  const crop = crops.find(c => c.id === cropId) || crops[0];
  
  const getParameterScore = (value: number, min: number, max: number, ideal: number): number => {
    if (value < min || value > max) {
      // Outside viable range
      return 0;
    }
    
    // Calculate how close to ideal (0-100)
    const maxDistance = Math.max(ideal - min, max - ideal);
    const distance = Math.abs(value - ideal);
    return 100 * (1 - (distance / maxDistance));
  };
  
  const temperatureScore = getParameterScore(
    temperature,
    crop.optimalConditions.temperature.min,
    crop.optimalConditions.temperature.max,
    crop.optimalConditions.temperature.ideal
  );
  
  const humidityScore = getParameterScore(
    humidity,
    crop.optimalConditions.humidity.min,
    crop.optimalConditions.humidity.max,
    crop.optimalConditions.humidity.ideal
  );
  
  const soilMoistureScore = getParameterScore(
    soilMoisture,
    crop.optimalConditions.soilMoisture.min,
    crop.optimalConditions.soilMoisture.max,
    crop.optimalConditions.soilMoisture.ideal
  );
  
  const lightIntensityScore = getParameterScore(
    lightIntensity,
    crop.optimalConditions.lightIntensity.min,
    crop.optimalConditions.lightIntensity.max,
    crop.optimalConditions.lightIntensity.ideal
  );
  
  // Weight the parameters (could be adjusted based on crop type)
  return Math.round(
    (temperatureScore * 0.25) +
    (humidityScore * 0.25) +
    (soilMoistureScore * 0.3) +
    (lightIntensityScore * 0.2)
  );
};
