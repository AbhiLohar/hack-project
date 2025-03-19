
import React from 'react';
import { Thermometer, Droplet, Cloud, Sun, Power } from 'lucide-react';
import { EnvironmentState } from '../utils/simulationLogic';
import { crops } from '../utils/cropData';

interface EnvironmentControlsProps {
  state: EnvironmentState;
  onParameterChange: (key: keyof EnvironmentState, value: number | string | boolean) => void;
  statusInfo: {
    temperature: { status: string; message: string };
    humidity: { status: string; message: string };
    soilMoisture: { status: string; message: string };
    lightIntensity: { status: string; message: string };
  };
}

const EnvironmentControls: React.FC<EnvironmentControlsProps> = ({ 
  state, 
  onParameterChange,
  statusInfo
}) => {
  // Helper to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-farm-optimal';
      case 'warning': return 'text-farm-warning';
      case 'danger': return 'text-farm-danger';
      default: return 'text-muted-foreground';
    }
  };

  const controlItems = [
    {
      name: 'Temperature',
      key: 'temperature' as const,
      icon: <Thermometer className="h-5 w-5" />,
      min: 10,
      max: 40,
      step: 0.5,
      unit: '°C',
      status: statusInfo.temperature.status,
      message: statusInfo.temperature.message
    },
    {
      name: 'Humidity',
      key: 'humidity' as const,
      icon: <Cloud className="h-5 w-5" />,
      min: 20,
      max: 90,
      step: 1,
      unit: '%',
      status: statusInfo.humidity.status,
      message: statusInfo.humidity.message
    },
    {
      name: 'Soil Moisture',
      key: 'soilMoisture' as const,
      icon: <Droplet className="h-5 w-5" />,
      min: 20,
      max: 90,
      step: 1,
      unit: '%',
      status: statusInfo.soilMoisture.status,
      message: statusInfo.soilMoisture.message
    },
    {
      name: 'Light Intensity',
      key: 'lightIntensity' as const,
      icon: <Sun className="h-5 w-5" />,
      min: 10,
      max: 100,
      step: 1,
      unit: '%',
      status: statusInfo.lightIntensity.status,
      message: statusInfo.lightIntensity.message
    }
  ];

  return (
    <div className="bg-card rounded-xl shadow-sm border p-4 md:p-6 animate-slide-up">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h2 className="text-lg font-medium">Environment Controls</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex items-center">
              <label htmlFor="crop-select" className="text-sm mr-2 whitespace-nowrap">Crop Type:</label>
              <select
                id="crop-select"
                value={state.selectedCrop}
                onChange={(e) => onParameterChange('selectedCrop', e.target.value)}
                className="bg-background border rounded-md px-3 py-1 text-sm h-9 min-w-[120px]"
              >
                {crops.map(crop => (
                  <option key={crop.id} value={crop.id}>
                    {crop.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-1 bg-background rounded-md px-3 py-1.5 border">
              <label htmlFor="auto-adjust" className="text-sm text-muted-foreground">
                Auto
              </label>
              <button
                onClick={() => onParameterChange('autoAdjust', !state.autoAdjust)}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none ${
                  state.autoAdjust ? 'bg-primary' : 'bg-muted'
                }`}
                role="switch"
                aria-checked={state.autoAdjust}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition-transform ${
                    state.autoAdjust ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {controlItems.map((item) => (
            <div 
              key={item.key} 
              className="border rounded-lg p-3 transition-all hover:shadow-sm"
            >
              <div className="flex items-center mb-1 justify-between">
                <div className="flex items-center space-x-2">
                  <div className={getStatusColor(item.status)}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
                <div className="text-base font-medium">
                  {state[item.key].toFixed(item.key === 'temperature' ? 1 : 0)}{item.unit}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs text-muted-foreground w-8">{item.min}{item.unit}</span>
                <input
                  type="range"
                  min={item.min}
                  max={item.max}
                  step={item.step}
                  value={state[item.key]}
                  onChange={(e) => onParameterChange(item.key, parseFloat(e.target.value))}
                  className="flex-grow"
                />
                <span className="text-xs text-muted-foreground w-8 text-right">{item.max}{item.unit}</span>
              </div>
              
              <div className={`text-xs ${getStatusColor(item.status)} mt-1`}>
                {item.message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentControls;
