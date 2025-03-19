
import { crops, getHealthStatus, getCropHealthScore, CropType } from './cropData';

export interface EnvironmentState {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightIntensity: number;
  selectedCrop: string;
  autoAdjust: boolean;
  healthScore: number;
}

export interface DataPoint {
  timestamp: number;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightIntensity: number;
  healthScore: number;
}

const MAX_DATA_POINTS = 20;

export class SimulationEngine {
  private state: EnvironmentState;
  private historicalData: DataPoint[] = [];
  private selectedCropData: CropType;
  
  constructor(initialState: Partial<EnvironmentState> = {}) {
    // Set default values and override with any provided values
    this.state = {
      temperature: 22,
      humidity: 60,
      soilMoisture: 70,
      lightIntensity: 70,
      selectedCrop: "tomato",
      autoAdjust: false,
      healthScore: 80,
      ...initialState
    };
    
    this.selectedCropData = crops.find(c => c.id === this.state.selectedCrop) || crops[0];
    this.updateHealthScore();
    this.addDataPoint();
  }
  
  getState(): EnvironmentState {
    return { ...this.state };
  }
  
  getHistoricalData(): DataPoint[] {
    return [...this.historicalData];
  }
  
  getSelectedCrop(): CropType {
    return { ...this.selectedCropData };
  }
  
  setParameter(key: keyof Omit<EnvironmentState, 'healthScore'>, value: number | string | boolean): void {
    if (key === 'selectedCrop' && typeof value === 'string') {
      this.state.selectedCrop = value;
      this.selectedCropData = crops.find(c => c.id === value) || crops[0];
    } else if (key === 'autoAdjust' && typeof value === 'boolean') {
      this.state.autoAdjust = value;
    } else if (typeof value === 'number' && key !== 'autoAdjust' && key !== 'selectedCrop') {
      (this.state as any)[key] = value;
    }
    
    this.updateHealthScore();
    this.addDataPoint();
    
    // Apply auto-adjustment if enabled
    if (this.state.autoAdjust) {
      this.autoAdjustParameters();
    }
  }
  
  private addDataPoint(): void {
    const dataPoint: DataPoint = {
      timestamp: Date.now(),
      temperature: this.state.temperature,
      humidity: this.state.humidity,
      soilMoisture: this.state.soilMoisture,
      lightIntensity: this.state.lightIntensity,
      healthScore: this.state.healthScore
    };
    
    this.historicalData.push(dataPoint);
    
    // Limit the number of data points to prevent memory issues
    if (this.historicalData.length > MAX_DATA_POINTS) {
      this.historicalData.shift();
    }
  }
  
  private updateHealthScore(): void {
    this.state.healthScore = getCropHealthScore(
      this.state.temperature,
      this.state.humidity,
      this.state.soilMoisture,
      this.state.lightIntensity,
      this.state.selectedCrop
    );
  }
  
  private autoAdjustParameters(): void {
    // Gradually adjust parameters toward ideal values for the selected crop
    const crop = this.selectedCropData;
    const adjustmentFactor = 0.1; // How quickly to adjust (0-1)
    
    this.state.temperature = this.adjustTowardIdeal(
      this.state.temperature,
      crop.optimalConditions.temperature.ideal,
      adjustmentFactor
    );
    
    this.state.humidity = this.adjustTowardIdeal(
      this.state.humidity,
      crop.optimalConditions.humidity.ideal,
      adjustmentFactor
    );
    
    this.state.soilMoisture = this.adjustTowardIdeal(
      this.state.soilMoisture,
      crop.optimalConditions.soilMoisture.ideal,
      adjustmentFactor
    );
    
    this.state.lightIntensity = this.adjustTowardIdeal(
      this.state.lightIntensity,
      crop.optimalConditions.lightIntensity.ideal,
      adjustmentFactor
    );
    
    this.updateHealthScore();
    this.addDataPoint();
  }
  
  private adjustTowardIdeal(current: number, ideal: number, factor: number): number {
    return current + ((ideal - current) * factor);
  }
  
  getParameterStatus(key: 'temperature' | 'humidity' | 'soilMoisture' | 'lightIntensity') {
    const currentValue = this.state[key];
    const { min, max, ideal } = this.selectedCropData.optimalConditions[key];
    
    return getHealthStatus(currentValue, min, max, ideal);
  }
  
  getRecommendations(): string[] {
    const recommendations: string[] = [];
    const parameterKeys: Array<'temperature' | 'humidity' | 'soilMoisture' | 'lightIntensity'> = [
      'temperature', 'humidity', 'soilMoisture', 'lightIntensity'
    ];
    
    // Add specific recommendations based on current conditions
    parameterKeys.forEach(key => {
      const { status, message } = this.getParameterStatus(key);
      if (status !== 'optimal') {
        const currentValue = this.state[key];
        const { ideal } = this.selectedCropData.optimalConditions[key];
        const direction = currentValue < ideal ? 'increase' : 'decrease';
        
        const parameterName = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
        
        recommendations.push(`${parameterName}: ${message} - ${direction} to approach optimal value of ${ideal}`);
      }
    });
    
    // Add crop-specific tips
    if (recommendations.length < 3 && this.selectedCropData.tips.length > 0) {
      // Add a random tip if we don't have many recommendations
      const randomTip = this.selectedCropData.tips[
        Math.floor(Math.random() * this.selectedCropData.tips.length)
      ];
      recommendations.push(`Tip: ${randomTip}`);
    }
    
    return recommendations;
  }
}
