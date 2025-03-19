
import React from 'react';
import { Thermometer, Droplet, Cloud, Sun, Leaf } from 'lucide-react';
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
      case 'optimal': return 'text-green-500';
      case 'warning': return 'text-amber-500';
      case 'danger': return 'text-red-500';
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
      message: statusInfo.temperature.message,
      color: 'from-blue-500 to-red-500'
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
      message: statusInfo.humidity.message,
      color: 'from-blue-300 to-blue-600'
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
      message: statusInfo.soilMoisture.message,
      color: 'from-blue-400 to-blue-700'
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
      message: statusInfo.lightIntensity.message,
      color: 'from-amber-300 to-amber-600'
    }
  ];

  return (
    <div className="bg-card rounded-xl shadow-sm border overflow-hidden p-4 md:p-6 animate-slide-up">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b pb-4">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            Environment Controls
          </h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex items-center">
              <label htmlFor="crop-select" className="text-sm mr-2 whitespace-nowrap font-medium">Crop:</label>
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
                Auto Optimize
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
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-container">
          {controlItems.map((item) => (
            <div 
              key={item.key} 
              className="control-card rounded-lg border p-4 transition-all hover:shadow-md bg-white/95"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center justify-center rounded-full bg-opacity-10 p-1.5 ${
                    item.status === 'optimal' ? 'bg-green-100' : 
                    item.status === 'warning' ? 'bg-amber-100' : 
                    item.status === 'danger' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <div className={getStatusColor(item.status)}>
                      {item.icon}
                    </div>
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="parameter-value font-semibold">
                  {state[item.key].toFixed(item.key === 'temperature' ? 1 : 0)}{item.unit}
                </div>
              </div>
              
              <div className="flex items-center mb-3 relative">
                <span className="text-xs text-muted-foreground w-8">{item.min}{item.unit}</span>
                <div className="relative flex-grow mx-2">
                  <div className={`h-2 w-full rounded-full bg-gradient-to-r ${item.color} opacity-20`}></div>
                  <input
                    type="range"
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    value={state[item.key]}
                    onChange={(e) => onParameterChange(item.key, parseFloat(e.target.value))}
                    className="w-full absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 shadow-md transition-all duration-200 hover:scale-110"
                    style={{ 
                      left: `${((state[item.key] - item.min) / (item.max - item.min)) * 100}%`,
                      marginLeft: "-8px", // Center the thumb
                      borderColor: item.status === 'optimal' ? '#22c55e' : 
                                   item.status === 'warning' ? '#f59e0b' : 
                                   item.status === 'danger' ? '#ef4444' : '#94a3b8'
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{item.max}{item.unit}</span>
              </div>
              
              <div className={`text-sm ${getStatusColor(item.status)} mt-1 truncate rounded-md py-1 px-2 ${
                item.status === 'optimal' ? 'bg-green-50' : 
                item.status === 'warning' ? 'bg-amber-50' : 
                item.status === 'danger' ? 'bg-red-50' : 'bg-gray-50'
              }`}>
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
