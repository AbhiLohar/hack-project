
import React from 'react';
import { Leaf, Info } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 flex justify-between items-center animate-fade-in">
      <div className="flex items-center space-x-2">
        <Leaf className="h-6 w-6 text-secondary" />
        <h1 className="text-xl font-medium tracking-tight">GrowSim</h1>
      </div>
      
      <div className="flex items-center">
        <button 
          className="rounded-full w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          aria-label="Information"
        >
          <Info className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
