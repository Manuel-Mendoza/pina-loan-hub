
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { DollarSign, Clock, Percent, FileText, ArrowLeft } from 'lucide-react';

const LoanApplication = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    term: '',
    observations: ''
  });

  const memberRate = 8.5;
  const nonMemberRate = 12.0;
  const rate = user?.isMember ? memberRate : nonMemberRate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('¡Solicitud enviada exitosamente! Te contactaremos pronto.');
    navigate('/dashboard');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(formData.amount) || 0;
    const months = parseInt(formData.term) || 1;
    const monthlyRate = rate / 100 / 12;
    
    if (principal > 0 && months > 0) {
      const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                     (Math.pow(1 + monthlyRate, months) - 1);
      return payment.toFixed(2);
    }
    return '0.00';
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-cooperative-dark mb-2">
            {t('loans.title')}
          </h1>
          <p className="text-gray-600">
            Completa el formulario para solicitar tu préstamo
          </p>
          
          <div className="flex items-center space-x-4 mt-4">
            <Badge 
              variant={user.isMember ? "default" : "secondary"}
              className={user.isMember ? "bg-cooperative-green" : ""}
            >
              {user.isMember ? t('dashboard.member') : t('dashboard.non_member')}
            </Badge>
            <Badge className="bg-cooperative-blue">
              Tasa: {rate}% anual
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <CardTitle className="text-cooperative-dark">
                  Información del Préstamo
                </CardTitle>
                <CardDescription>
                  Proporciona los detalles de tu solicitud
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-cooperative-dark font-medium">
                        {t('loans.amount')} ($)
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="amount"
                          type="number"
                          min="500"
                          max="50000"
                          step="100"
                          value={formData.amount}
                          onChange={(e) => handleChange('amount', e.target.value)}
                          className="pl-10"
                          placeholder="5,000"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Monto mínimo: $500 | Máximo: $50,000
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="term" className="text-cooperative-dark font-medium">
                        {t('loans.term')}
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Select 
                          value={formData.term} 
                          onValueChange={(value) => handleChange('term', value)}
                        >
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Seleccionar plazo" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="6">6 {t('loans.months')}</SelectItem>
                            <SelectItem value="12">12 {t('loans.months')}</SelectItem>
                            <SelectItem value="18">18 {t('loans.months')}</SelectItem>
                            <SelectItem value="24">24 {t('loans.months')}</SelectItem>
                            <SelectItem value="36">36 {t('loans.months')}</SelectItem>
                            <SelectItem value="48">48 {t('loans.months')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose" className="text-cooperative-dark font-medium">
                      {t('loans.purpose')}
                    </Label>
                    <Select 
                      value={formData.purpose} 
                      onValueChange={(value) => handleChange('purpose', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar propósito" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="personal">{t('loans.personal')}</SelectItem>
                        <SelectItem value="business">{t('loans.business')}</SelectItem>
                        <SelectItem value="education">{t('loans.education')}</SelectItem>
                        <SelectItem value="home">{t('loans.home')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observations" className="text-cooperative-dark font-medium">
                      Observaciones (Opcional)
                    </Label>
                    <Textarea
                      id="observations"
                      value={formData.observations}
                      onChange={(e) => handleChange('observations', e.target.value)}
                      placeholder="Información adicional sobre tu solicitud..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !formData.amount || !formData.term || !formData.purpose}
                    className="w-full bg-cooperative-blue hover:bg-cooperative-blue/90"
                  >
                    {isSubmitting ? t('loans.processing') : t('loans.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resumen y Calculadora */}
          <div className="space-y-6">
            <Card className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="text-cooperative-dark">
                  Resumen de Solicitud
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monto solicitado:</span>
                  <span className="font-semibold">
                    ${formData.amount ? parseFloat(formData.amount).toLocaleString() : '0'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plazo:</span>
                  <span className="font-semibold">
                    {formData.term || '0'} meses
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasa de interés:</span>
                  <span className="font-semibold text-cooperative-blue">
                    {rate}% anual
                  </span>
                </div>
                
                <hr />
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pago mensual:</span>
                  <span className="font-bold text-lg text-cooperative-dark">
                    ${calculateMonthlyPayment()}
                  </span>
                </div>
                
                {user.isMember && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>¡Ventaja de socio!</strong><br />
                      Ahorras {(nonMemberRate - memberRate).toFixed(1)}% en intereses
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <CardTitle className="text-cooperative-dark">
                  Documentos Requeridos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-cooperative-blue" />
                    <span>Identificación oficial</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-cooperative-blue" />
                    <span>Comprobante de ingresos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-cooperative-blue" />
                    <span>Comprobante de domicilio</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-cooperative-blue" />
                    <span>Referencias personales</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    Un asesor se contactará contigo para coordinar la entrega de documentos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
