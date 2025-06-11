
import React from 'react';
import Hero from '@/components/Hero';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Shield, TrendingUp } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <DollarSign className="h-8 w-8 text-cooperative-blue" />,
      title: t('home.features.loans.title'),
      description: t('home.features.loans.description')
    },
    {
      icon: <Shield className="h-8 w-8 text-cooperative-green" />,
      title: t('home.features.savings.title'),
      description: t('home.features.savings.description')
    },
    {
      icon: <Users className="h-8 w-8 text-cooperative-blue" />,
      title: t('home.features.benefits.title'),
      description: t('home.features.benefits.description')
    }
  ];

  const stats = [
    {
      icon: <Users className="h-6 w-6 text-cooperative-blue" />,
      value: "500+",
      label: t('home.stats.members')
    },
    {
      icon: <DollarSign className="h-6 w-6 text-cooperative-green" />,
      value: "$2M+",
      label: t('home.stats.loans')
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-cooperative-blue" />,
      value: "15+",
      label: t('home.stats.experience')
    },
    {
      icon: <Shield className="h-6 w-6 text-cooperative-green" />,
      value: "98%",
      label: t('home.stats.satisfaction')
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-cooperative-dark mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre todos los beneficios que tenemos para ti como parte de nuestra familia cooperativa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-cooperative-dark">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 cooperative-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">
              Nuestra Trayectoria en Números
            </h2>
            <p className="text-xl text-white/90 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Años de experiencia respaldando el crecimiento de nuestra comunidad
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in"
                style={{animationDelay: `${0.3 + index * 0.1}s`}}
              >
                <div className="mx-auto mb-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/90 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold text-cooperative-dark mb-6">
              ¿Listo para ser parte de nuestra cooperativa?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Únete a cientos de familias que ya confían en nosotros para alcanzar sus metas financieras
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-cooperative-blue hover:bg-cooperative-blue/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Solicitar Membresía
              </button>
              <button className="border-2 border-cooperative-blue text-cooperative-blue hover:bg-cooperative-blue hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Contactar Asesor
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
