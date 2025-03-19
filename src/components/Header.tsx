
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Info, Sun, Home } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 flex justify-between items-center animate-fade-in">
      <div className="flex items-center space-x-2 text-primary">
        <div className="flex items-center justify-center p-2 rounded-full bg-primary/10">
          <Leaf className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">GrowSim</h1>
          <p className="text-xs text-muted-foreground">Smart Farming Simulator</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Link to="/" className="rounded-full w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors" aria-label="Home">
          <Home className="h-5 w-5" />
        </Link>
        <button 
          className="rounded-full w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          aria-label="Information"
        >
          <Info className="h-5 w-5" />
        </button>
        <button 
          className="rounded-full w-8 h-8 flex items-center justify-center text-amber-500 hover:bg-amber-50 transition-colors"
          aria-label="Light Mode"
        >
          <Sun className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
