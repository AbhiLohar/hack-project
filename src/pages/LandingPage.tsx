
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Cloud, Droplet, Thermometer, ChevronRight, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-farm-sky/30 to-background"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-farm-leaf/10 rounded-full animate-pulse-subtle"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/5 rounded-full animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-farm-water/10 rounded-full animate-pulse-subtle" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 animate-slide-up">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-secondary/10 text-secondary font-medium mb-4">
                <Leaf className="w-4 h-4 mr-2" />
                Smart Farming Simulator
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Grow Better <span className="text-primary">Crops</span> with Smart Monitoring
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl">
                GrowSim helps you understand optimal growing conditions for different crops
                through an interactive simulator that responds in real-time to environmental changes.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/simulator">
                    Start Simulation <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/simulator">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> View Dashboard
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="flex-1 relative min-h-[400px] animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-b from-farm-sky/30 to-farm-soil/20 rounded-2xl overflow-hidden shadow-xl border border-white/20">
                <div className="absolute bottom-0 w-full h-1/3 bg-farm-soil/40"></div>
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-40 h-64 flex flex-col items-center">
                  {/* Plant trunk */}
                  <div className="w-4 h-32 bg-farm-soil rounded-full"></div>
                  
                  {/* Branches */}
                  <div className="relative w-full h-0">
                    <div className="absolute bottom-16 left-1/2 w-20 h-3 bg-farm-soil -rotate-45 rounded-full -translate-x-full"></div>
                    <div className="absolute bottom-24 left-1/2 w-24 h-3 bg-farm-soil rotate-45 rounded-full"></div>
                    <div className="absolute bottom-32 left-1/2 w-16 h-3 bg-farm-soil -rotate-30 rounded-full -translate-x-6"></div>
                  </div>
                  
                  {/* Leaves clusters */}
                  <div className="absolute bottom-36 left-1/4 w-20 h-20 bg-farm-leaf rounded-full animate-pulse"></div>
                  <div className="absolute bottom-44 right-1/4 w-24 h-24 bg-farm-leaf rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-56 left-1/3 w-16 h-16 bg-farm-leaf rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-48 right-1/3 w-20 h-20 bg-farm-leaf rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Powerful Simulation Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn how different environmental factors affect plant growth and health
              through our interactive simulator.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
            <FeatureCard 
              icon={<Thermometer className="text-red-500" />}
              title="Temperature Control"
              description="Adjust temperature to see how it affects different crops and their growth patterns."
            />
            <FeatureCard 
              icon={<Cloud className="text-blue-400" />}
              title="Humidity Simulation"
              description="Modify humidity levels to understand moisture requirements for optimal growth."
            />
            <FeatureCard 
              icon={<Droplet className="text-blue-500" />}
              title="Soil Moisture"
              description="Control soil moisture to see how watering affects plant health and yield."
            />
            <FeatureCard 
              icon={<Leaf className="text-green-500" />}
              title="Crop Selection"
              description="Choose from various crops to learn their specific environmental requirements."
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Ready to start growing?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Jump into our simulator and start learning about optimal growing conditions
            for different crops through interactive experimentation.
          </p>
          <Button asChild size="lg">
            <Link to="/simulator">
              Launch Simulator <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-primary mb-4 md:mb-0">
              <Leaf className="h-6 w-6" />
              <div>
                <h3 className="text-xl font-semibold tracking-tight">GrowSim</h3>
                <p className="text-xs text-muted-foreground">Smart Farming Simulator</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2023 GrowSim. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="p-3 rounded-full bg-primary/10 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default LandingPage;
