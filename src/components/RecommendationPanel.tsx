
import React from 'react';
import { AlertTriangle, Check, Lightbulb, Heart, BarChart, ThumbsUp } from 'lucide-react';

interface RecommendationPanelProps {
  recommendations: string[];
  healthScore: number;
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({ 
  recommendations,
  healthScore
}) => {
  const getHealthStatusMessage = () => {
    if (healthScore >= 80) {
      return {
        icon: <Check className="h-5 w-5 text-green-500" />,
        message: "Optimal Growth Conditions",
        description: "Current environment is ideal for your crop."
      };
    } else if (healthScore >= 60) {
      return {
        icon: <Check className="h-5 w-5 text-green-400" />,
        message: "Good Growing Conditions",
        description: "Minor adjustments recommended for optimal growth."
      };
    } else if (healthScore >= 40) {
      return {
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        message: "Moderate Stress Detected",
        description: "Adjust environmental parameters to improve conditions."
      };
    } else {
      return {
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        message: "Critical Conditions",
        description: "Immediate action required to prevent crop damage."
      };
    }
  };
  
  const status = getHealthStatusMessage();
  
  return (
    <div className="bg-card rounded-xl shadow-sm border p-4 animate-slide-up">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-full bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-medium">Smart Recommendations</h2>
        </div>
        <div className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
          AI Powered
        </div>
      </div>
      
      <div className="mb-4 p-4 rounded-lg border bg-background">
        <div className="flex items-center space-x-2 mb-2">
          <div className={`p-1 rounded-full ${
            healthScore >= 80 ? 'bg-green-100' : 
            healthScore >= 60 ? 'bg-green-50' : 
            healthScore >= 40 ? 'bg-amber-50' : 
            'bg-red-50'
          }`}>
            {status.icon}
          </div>
          <h3 className="font-medium">{status.message}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{status.description}</p>
        
        {/* Health Score Visualization */}
        <div className="mt-3 mb-1">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-medium">Plant Health Score</span>
            <span className={`font-bold ${
              healthScore >= 80 ? 'text-green-600' : 
              healthScore >= 60 ? 'text-green-500' : 
              healthScore >= 40 ? 'text-amber-500' : 
              'text-red-500'
            }`}>{healthScore}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                healthScore >= 80 ? 'bg-green-500' : 
                healthScore >= 60 ? 'bg-green-400' : 
                healthScore >= 40 ? 'bg-amber-500' : 
                'bg-red-500'
              }`}
              style={{ width: `${healthScore}%`, transition: 'width 1s ease-out' }}
            ></div>
          </div>
        </div>
      </div>
      
      {recommendations.length > 0 ? (
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li 
              key={index}
              className="p-3 rounded-md text-sm border-l-2 border-primary bg-background hover:bg-primary/5 transition-colors flex items-start space-x-2"
            >
              <div className="mt-0.5">
                {index % 3 === 0 ? <ThumbsUp size={14} className="text-blue-500" /> : 
                 index % 3 === 1 ? <BarChart size={14} className="text-purple-500" /> : 
                 <Heart size={14} className="text-pink-500" />}
              </div>
              <div>{rec}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          No recommendations at this time
        </div>
      )}
    </div>
  );
};

export default RecommendationPanel;
