
import React from 'react';
import { EnvironmentState } from '../utils/simulationLogic';
import { CropType } from '../utils/cropData';
import { Droplet, Thermometer, Sun } from 'lucide-react';

interface CropVisualizerProps {
  state: EnvironmentState;
  cropData: CropType;
}

const CropVisualizer: React.FC<CropVisualizerProps> = ({ state, cropData }) => {
  const healthScore = state.healthScore || 0;
  
  // Calculate plant height based on health (50-100%)
  const plantHeightPercentage = 50 + (healthScore / 2);
  
  // Calculate leaf color based on health
  const getPlantColor = () => {
    if (healthScore >= 80) {
      return '#2E7D32'; // Healthy dark green
    } else if (healthScore >= 60) {
      return '#4CAF50'; // Medium green
    } else if (healthScore >= 40) {
      return '#8BC34A'; // Light green
    } else if (healthScore >= 20) {
      return '#FFC107'; // Yellow
    } else {
      return '#FF9800'; // Orange - unhealthy
    }
  };
  
  // Get the soil moisture visual cue
  const getSoilColor = () => {
    if (state.soilMoisture >= 80) {
      return '#3E2723'; // Very wet
    } else if (state.soilMoisture >= 60) {
      return '#5D4037'; // Good moisture
    } else if (state.soilMoisture >= 40) {
      return '#795548'; // Drier
    } else {
      return '#A1887F'; // Very dry
    }
  };
  
  // Get the sky color based on light intensity
  const getSkyColor = () => {
    if (state.lightIntensity >= 80) {
      return 'linear-gradient(to bottom, #64B5F6, #90CAF9)'; // Bright sky
    } else if (state.lightIntensity >= 60) {
      return 'linear-gradient(to bottom, #90CAF9, #BBDEFB)'; // Light blue
    } else if (state.lightIntensity >= 40) {
      return 'linear-gradient(to bottom, #BBDEFB, #E3F2FD)'; // Pale blue
    } else {
      return 'linear-gradient(to bottom, #E3F2FD, #F5F5F5)'; // Very pale - low light
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
          width: `${30 + (i * 8)}px`,
          height: `${15 + (i * 4)}px`,
          left: `${10 + (i * 15)}%`,
          top: `${10 + (i * 8)}%`,
          filter: 'blur(4px)',
          animation: `float ${3 + i}s ease-in-out infinite alternate`
        }}
      />
    ));
  };

  // Render water droplets for soil moisture
  const renderMoistureDroplets = () => {
    if (state.soilMoisture < 40) return null;
    
    return Array.from({ length: Math.ceil(state.soilMoisture / 20) }).map((_, i) => (
      <div 
        key={i}
        className="absolute"
        style={{
          bottom: `${4 + (i * 6)}%`,
          left: `${15 + (i * 18)}%`,
          opacity: 0.7,
          animation: `float ${2 + i}s ease-in-out infinite alternate`
        }}
      >
        <Droplet size={12} className="text-blue-400 fill-blue-300" />
      </div>
    ));
  };

  // Render tree branches
  const renderTreeBranches = () => {
    // Only show branches if health is decent
    if (healthScore < 30) return null;
    
    return (
      <>
        {/* Main branches */}
        <div className="absolute" style={{
          width: '3px',
          height: '80px',
          backgroundColor: '#795548',
          bottom: '45%',
          left: '48%',
          transform: 'rotate(30deg)',
          transformOrigin: 'bottom',
          zIndex: 2
        }} />
        <div className="absolute" style={{
          width: '3px',
          height: '70px',
          backgroundColor: '#795548',
          bottom: '55%',
          left: '51%',
          transform: 'rotate(-25deg)',
          transformOrigin: 'bottom',
          zIndex: 2
        }} />
        <div className="absolute" style={{
          width: '2px',
          height: '40px',
          backgroundColor: '#795548',
          bottom: '65%',
          left: '47%',
          transform: 'rotate(15deg)',
          transformOrigin: 'bottom',
          zIndex: 2
        }} />
      </>
    );
  };
  
  // Render more realistic foliage
  const renderTreeFoliage = () => {
    const foliageColor = getPlantColor();
    const foliageSize = Math.max(40, Math.min(80, healthScore));
    const foliageCount = Math.max(3, Math.floor(healthScore / 10));
    
    return Array.from({ length: foliageCount }).map((_, i) => {
      const size = foliageSize - (i * 5);
      const xOffset = 10 - (i * 2) + (Math.random() * 10);
      const yOffset = 10 - (i * 8);
      
      return (
        <div 
          key={i}
          className="absolute rounded-full transition-all duration-1000"
          style={{ 
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: foliageColor,
            backgroundImage: `radial-gradient(circle at 40% 40%, ${foliageColor}, ${healthScore > 70 ? '#1B5E20' : '#BF360C'})`,
            left: `calc(50% - ${size/2}px + ${xOffset}px)`,
            bottom: `calc(50% + ${yOffset}px)`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            opacity: 0.9,
            zIndex: 3
          }}
        />
      );
    });
  };
  
  // Render tree trunk
  const renderTreeTrunk = () => {
    const trunkHeight = Math.max(100, plantHeightPercentage * 2);
    
    return (
      <div 
        className="absolute transition-all duration-1000"
        style={{ 
          width: '16px',
          height: `${trunkHeight}px`,
          background: 'linear-gradient(to top, #5D4037, #8D6E63)',
          borderRadius: '5px',
          bottom: '30%',
          left: 'calc(50% - 8px)',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          zIndex: 1
        }}
      />
    );
  };
  
  // Render ground vegetation
  const renderGroundVegetation = () => {
    return Array.from({ length: 8 }).map((_, i) => (
      <div 
        key={i}
        className="absolute"
        style={{ 
          width: '20px',
          height: '10px',
          backgroundColor: '#4CAF50',
          borderRadius: '50% 50% 0 0',
          bottom: '30%',
          left: `${10 + (i * 10)}%`,
          opacity: 0.7,
          zIndex: 2
        }}
      />
    ));
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border overflow-hidden h-[400px] relative animate-grow">
      {/* Sky */}
      <div 
        className="absolute inset-0 bottom-1/3 transition-all duration-500"
        style={{ background: getSkyColor() }}
      >
        {/* Clouds */}
        {renderClouds()}
        
        {/* Sun */}
        <div 
          className="absolute rounded-full bg-yellow-300 transition-all duration-500"
          style={{ 
            width: '50px', 
            height: '50px',
            right: '10%',
            top: '15%',
            opacity: state.lightIntensity / 100,
            filter: `blur(${state.lightIntensity > 70 ? '0' : '2'}px)`,
            boxShadow: `0 0 ${state.lightIntensity / 2}px ${state.lightIntensity / 8}px rgba(255, 236, 95, 0.8)`,
            animation: 'pulse 3s infinite ease-in-out'
          }}
        />

        {/* Temperature indicator */}
        <div className="absolute top-3 left-3 bg-white/70 backdrop-blur-sm rounded-full p-1">
          <Thermometer size={16} className={state.temperature > 30 ? 'text-red-500' : state.temperature < 15 ? 'text-blue-500' : 'text-green-500'} />
        </div>
      </div>
      
      {/* Soil */}
      <div 
        className="absolute inset-0 top-2/3 transition-colors duration-500"
        style={{ 
          backgroundColor: getSoilColor(),
          backgroundImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))'
        }}
      >
        {/* Moisture droplets */}
        {renderMoistureDroplets()}
        {/* Ground vegetation */}
        {renderGroundVegetation()}
      </div>
      
      {/* Plant/Tree */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Tree trunk */}
        {renderTreeTrunk()}
        
        {/* Tree branches */}
        {renderTreeBranches()}
        
        {/* Tree foliage */}
        {renderTreeFoliage()}
      </div>
      
      {/* Health score display */}
      <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium border flex items-center space-x-1 shadow-sm">
        <div className={`w-2 h-2 rounded-full ${
          healthScore >= 80 ? 'bg-green-500' : 
          healthScore >= 60 ? 'bg-green-400' : 
          healthScore >= 40 ? 'bg-yellow-500' : 
          'bg-red-500'
        }`}></div>
        <span>Health: {healthScore}%</span>
      </div>
      
      {/* Light indicator */}
      <div className="absolute bottom-[35%] right-4 bg-white/70 backdrop-blur-sm rounded-full p-1">
        <Sun 
          size={16} 
          className={state.lightIntensity > 70 ? 'text-amber-500' : 'text-amber-300'} 
          style={{opacity: state.lightIntensity / 100}}
        />
      </div>
      
      {/* Crop name */}
      <div className="absolute bottom-3 left-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium border text-center shadow-sm">
        {cropData.name}
      </div>
    </div>
  );
};

export default CropVisualizer;
