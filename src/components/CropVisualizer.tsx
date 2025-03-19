
import React from 'react';
import { EnvironmentState } from '../utils/simulationLogic';
import { CropType } from '../utils/cropData';

interface CropVisualizerProps {
  state: EnvironmentState;
  cropData: CropType;
}

const CropVisualizer: React.FC<CropVisualizerProps> = ({ state, cropData }) => {
  const healthScore = state.healthScore;
  
  // Calculate plant height based on health (50-100%)
  const plantHeightPercentage = 50 + (healthScore / 2);
  
  // Calculate leaf color based on health
  const getPlantColor = () => {
    if (healthScore >= 80) {
      return '#4CAF50'; // Healthy green
    } else if (healthScore >= 60) {
      return '#8BC34A'; // Lighter green
    } else if (healthScore >= 40) {
      return '#CDDC39'; // Yellow-green
    } else if (healthScore >= 20) {
      return '#FFC107'; // Yellow-orange
    } else {
      return '#FF9800'; // Orange - unhealthy
    }
  };
  
  // Get the soil moisture visual cue
  const getSoilColor = () => {
    if (state.soilMoisture >= 80) {
      return '#5D4037'; // Very wet
    } else if (state.soilMoisture >= 60) {
      return '#795548'; // Good moisture
    } else if (state.soilMoisture >= 40) {
      return '#8D6E63'; // Drier
    } else {
      return '#A1887F'; // Very dry
    }
  };
  
  // Get the sky color based on light intensity
  const getSkyColor = () => {
    if (state.lightIntensity >= 80) {
      return '#64B5F6'; // Bright sky
    } else if (state.lightIntensity >= 60) {
      return '#90CAF9'; // Light blue
    } else if (state.lightIntensity >= 40) {
      return '#BBDEFB'; // Pale blue
    } else {
      return '#E3F2FD'; // Very pale - low light
    }
  };
  
  // Get clouds based on humidity
  const renderClouds = () => {
    if (state.humidity < 40) return null;
    
    const cloudOpacity = state.humidity / 100;
    const cloudCount = Math.ceil(state.humidity / 20); // 1-5 clouds based on humidity
    
    return Array.from({ length: cloudCount }).map((_, i) => (
      <div 
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          opacity: cloudOpacity * 0.7,
          width: `${30 + (i * 5)}px`,
          height: `${15 + (i * 2)}px`,
          left: `${10 + (i * 15)}%`,
          top: `${10 + (i * 8)}%`,
          filter: 'blur(4px)',
          animation: `float ${3 + i}s ease-in-out infinite alternate`
        }}
      />
    ));
  };
  
  return (
    <div className="bg-card rounded-xl shadow-sm border overflow-hidden h-[400px] relative animate-grow">
      {/* Sky */}
      <div 
        className="absolute inset-0 bottom-1/3 transition-colors duration-500"
        style={{ backgroundColor: getSkyColor() }}
      >
        {/* Clouds */}
        {renderClouds()}
        
        {/* Sun */}
        <div 
          className="absolute rounded-full bg-yellow-300 transition-all duration-500"
          style={{ 
            width: '40px', 
            height: '40px',
            right: '10%',
            top: '15%',
            opacity: state.lightIntensity / 100,
            filter: `blur(${state.lightIntensity > 70 ? '0' : '2'}px)`,
            boxShadow: `0 0 ${state.lightIntensity / 2}px ${state.lightIntensity / 8}px rgba(255, 236, 95, 0.8)`
          }}
        />
      </div>
      
      {/* Soil */}
      <div 
        className="absolute inset-0 top-2/3 transition-colors duration-500"
        style={{ backgroundColor: getSoilColor() }}
      />
      
      {/* Plant */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Stem */}
        <div 
          className="w-3 bg-green-800 rounded-full transition-all duration-1000 transform origin-bottom"
          style={{ 
            height: `${plantHeightPercentage}%`,
            maxHeight: '55%'
          }}
        />
        
        {/* Leaves - we'll add several at different angles */}
        {[45, -45, 100, -100, 150, -150].map((angle, i) => (
          <div 
            key={i}
            className="absolute rounded-full transition-all duration-1000"
            style={{ 
              width: i < 2 ? '50px' : i < 4 ? '40px' : '30px',
              height: i < 2 ? '20px' : i < 4 ? '16px' : '12px',
              backgroundColor: getPlantColor(),
              bottom: `${60 - (i * 8)}%`,
              transform: `translateX(${angle > 0 ? '' : '-'}${Math.abs(angle) / 10}px) rotate(${angle}deg)`,
              opacity: healthScore / 100,
              display: healthScore < 30 && i > 3 ? 'none' : 'block'
            }}
          />
        ))}
        
        {/* If it's a fruiting plant and health is good, show fruits */}
        {healthScore > 60 && (
          <div className="absolute bottom-[45%] flex space-x-6">
            <div className="w-4 h-4 rounded-full bg-red-500 opacity-80" />
            <div className="w-4 h-4 rounded-full bg-red-500 opacity-90" />
          </div>
        )}
      </div>
      
      {/* Health score display */}
      <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium border">
        Health: {healthScore}%
      </div>
      
      {/* Crop name */}
      <div className="absolute bottom-3 left-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium border text-center">
        {cropData.name}
      </div>
    </div>
  );
};

export default CropVisualizer;
