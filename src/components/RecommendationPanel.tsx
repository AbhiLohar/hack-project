
import React from 'react';
import { AlertTriangle, Check, Lightbulb } from 'lucide-react';

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
      <div className="flex items-center space-x-2 mb-3">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-medium">Smart Recommendations</h2>
      </div>
      
      <div className="mb-4 p-3 rounded-lg border bg-background">
        <div className="flex items-center space-x-2 mb-1">
          {status.icon}
          <h3 className="font-medium">{status.message}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{status.description}</p>
      </div>
      
      {recommendations.length > 0 ? (
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li 
              key={index}
              className="p-2 rounded-md text-sm border-l-2 border-primary bg-background"
            >
              {rec}
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
