
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataPoint } from '../utils/simulationLogic';

interface DataChartProps {
  data: DataPoint[];
  parameters: Array<'temperature' | 'humidity' | 'soilMoisture' | 'lightIntensity' | 'healthScore'>;
}

const DataChart: React.FC<DataChartProps> = ({ data, parameters }) => {
  if (!data.length) {
    return (
      <div className="bg-card rounded-xl shadow-sm border p-4 h-[300px] flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }
  
  // Format data for display
  const formattedData = data.map((point, index) => {
    // Use shorter labels for x-axis
    const timeString = new Date(point.timestamp).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return {
      name: index === 0 || index === data.length - 1 ? timeString : '',
      ...point,
    };
  });
  
  // Color scheme for the different parameters
  const colorMap = {
    temperature: '#FF5722',
    humidity: '#03A9F4',
    soilMoisture: '#795548',
    lightIntensity: '#FFC107',
    healthScore: '#4CAF50'
  };
  
  // Parameter name mapping for display
  const parameterNames = {
    temperature: 'Temperature',
    humidity: 'Humidity',
    soilMoisture: 'Soil Moisture',
    lightIntensity: 'Light',
    healthScore: 'Health'
  };
  
  // Y-axis domains for different parameters
  const domains = {
    temperature: [10, 40],
    humidity: [0, 100],
    soilMoisture: [0, 100],
    lightIntensity: [0, 100],
    healthScore: [0, 100]
  };
  
  return (
    <div className="bg-card rounded-xl shadow-sm border p-4 h-[300px] animate-slide-up">
      <h2 className="text-lg font-medium mb-2">Trends</h2>
      <ResponsiveContainer width="100%" height={230}>
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false}
          />
          <YAxis 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
            }}
            formatter={(value: number, name: keyof typeof parameterNames) => {
              // Format the value based on the parameter type
              if (name === 'temperature') {
                return [`${value.toFixed(1)}°C`, parameterNames[name]];
              } else {
                return [`${value.toFixed(0)}%`, parameterNames[name]];
              }
            }}
            labelFormatter={(time) => {
              if (typeof time === 'number') {
                return new Date(time).toLocaleTimeString();
              }
              return time;
            }}
          />
          <Legend 
            verticalAlign="top" 
            align="right"
            iconType="circle"
            iconSize={8}
            formatter={(value: keyof typeof parameterNames) => (
              <span className="text-xs text-gray-600">{parameterNames[value]}</span>
            )}
          />
          
          {parameters.map((param) => (
            <Line
              key={param}
              type="monotone"
              dataKey={param}
              stroke={colorMap[param]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              animationDuration={500}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataChart;
