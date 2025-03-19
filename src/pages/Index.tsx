
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import EnvironmentControls from '../components/EnvironmentControls';
import CropVisualizer from '../components/CropVisualizer';
import DataChart from '../components/DataChart';
import RecommendationPanel from '../components/RecommendationPanel';
import { SimulationEngine, EnvironmentState } from '../utils/simulationLogic';

const Index = () => {
  const [simulation] = useState(() => new SimulationEngine());
  const [state, setState] = useState<EnvironmentState>(simulation.getState());
  const [historicalData, setHistoricalData] = useState(simulation.getHistoricalData());
  const [statusInfo, setStatusInfo] = useState({
    temperature: simulation.getParameterStatus('temperature'),
    humidity: simulation.getParameterStatus('humidity'),
    soilMoisture: simulation.getParameterStatus('soilMoisture'),
    lightIntensity: simulation.getParameterStatus('lightIntensity')
  });
  const [recommendations, setRecommendations] = useState(simulation.getRecommendations());
  const [selectedCropData, setSelectedCropData] = useState(simulation.getSelectedCrop());
  
  // Update UI when parameters change
  const handleParameterChange = (
    key: 'temperature' | 'humidity' | 'soilMoisture' | 'lightIntensity' | 'selectedCrop' | 'autoAdjust', 
    value: number | string | boolean
  ) => {
    simulation.setParameter(key, value);
    
    // Update all the UI state
    setState(simulation.getState());
    setHistoricalData(simulation.getHistoricalData());
    setStatusInfo({
      temperature: simulation.getParameterStatus('temperature'),
      humidity: simulation.getParameterStatus('humidity'),
      soilMoisture: simulation.getParameterStatus('soilMoisture'),
      lightIntensity: simulation.getParameterStatus('lightIntensity')
    });
    setRecommendations(simulation.getRecommendations());
    setSelectedCropData(simulation.getSelectedCrop());
  };
  
  // Auto-update for auto-adjust mode
  useEffect(() => {
    let interval: number | null = null;
    
    if (state.autoAdjust) {
      interval = window.setInterval(() => {
        // Trigger a small update to simulate the auto-adjustment
        handleParameterChange('autoAdjust', true);
      }, 2000);
    }
    
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [state.autoAdjust]);
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="main-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Header />
        
        <main className="pb-12 mt-4">
          <div className="controls-container grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <EnvironmentControls 
              state={state} 
              onParameterChange={handleParameterChange}
              statusInfo={statusInfo}
            />
            <CropVisualizer 
              state={state} 
              cropData={selectedCropData}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DataChart 
                data={historicalData} 
                parameters={['temperature', 'humidity', 'soilMoisture', 'lightIntensity']}
              />
            </div>
            <div>
              <RecommendationPanel 
                recommendations={recommendations} 
                healthScore={state.healthScore || 0}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
