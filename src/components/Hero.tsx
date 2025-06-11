
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Users } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 cooperative-gradient opacity-90"></div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            {t('home.hero.subtitle')}
          </p>
          <p className="text-lg md:text-xl mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed">
            {t('home.hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-white text-cooperative-blue hover:bg-gray-100 text-lg px-8 py-4"
            >
              {t('home.hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/about')}
              className="border-white text-white hover:bg-white hover:text-cooperative-blue text-lg px-8 py-4"
            >
              {t('home.hero.learn_more')}
            </Button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="glass-effect rounded-lg p-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-white" />
            <h3 className="text-lg font-semibold mb-2">Tasas Competitivas</h3>
            <p className="text-sm opacity-80">Ofrecemos las mejores tasas del mercado para nuestros socios</p>
          </div>
          
          <div className="glass-effect rounded-lg p-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Shield className="h-12 w-12 mx-auto mb-4 text-white" />
            <h3 className="text-lg font-semibold mb-2">Confianza y Seguridad</h3>
            <p className="text-sm opacity-80">Tu dinero está protegido con nosotros</p>
          </div>
          
          <div className="glass-effect rounded-lg p-6 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <Users className="h-12 w-12 mx-auto mb-4 text-white" />
            <h3 className="text-lg font-semibold mb-2">Comunidad Unida</h3>
            <p className="text-sm opacity-80">Más de 500 familias confían en nosotros</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
