
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  CreditCard, 
  Clock, 
  TrendingUp, 
  FileText, 
  Plus,
  Calendar,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Datos simulados
  const mockLoans = [
    {
      id: '001',
      amount: 5000,
      balance: 3500,
      nextPayment: '2024-01-15',
      status: 'active'
    },
    {
      id: '002',
      amount: 2000,
      balance: 500,
      nextPayment: '2024-01-20',
      status: 'active'
    }
  ];

  const recentPayments = [
    {
      id: '1',
      amount: 250,
      date: '2023-12-15',
      loanId: '001'
    },
    {
      id: '2',
      amount: 150,
      date: '2023-12-10',
      loanId: '002'
    }
  ];

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-cooperative-dark mb-2">
            {t('dashboard.welcome')}, {user.name}!
          </h1>
          <div className="flex items-center space-x-4">
            <Badge 
              variant={user.isMember ? "default" : "secondary"}
              className={user.isMember ? "bg-cooperative-green" : ""}
            >
              {user.isMember ? t('dashboard.member') : t('dashboard.non_member')}
            </Badge>
            {user.isAdmin && (
              <Badge className="bg-cooperative-blue">
                Administrador
              </Badge>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in" style={{animationDelay: '0.1s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {t('dashboard.active_loans')}
              </CardTitle>
              <CreditCard className="h-4 w-4 text-cooperative-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cooperative-dark">
                {mockLoans.length}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Balance Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-cooperative-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cooperative-dark">
                ${mockLoans.reduce((sum, loan) => sum + loan.balance, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Próximo Pago
              </CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cooperative-dark">
                $250
              </div>
              <p className="text-xs text-gray-500">15 Enero 2024</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Score Crediticio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cooperative-dark">
                850
              </div>
              <p className="text-xs text-green-600">Excelente</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Loan Summary */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in" style={{animationDelay: '0.5s'}}>
              <CardHeader>
                <CardTitle className="text-cooperative-dark">
                  {t('dashboard.loan_summary')}
                </CardTitle>
                <CardDescription>
                  Detalles de tus préstamos activos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockLoans.length > 0 ? (
                  <div className="space-y-4">
                    {mockLoans.map((loan, index) => (
                      <div 
                        key={loan.id} 
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        style={{animationDelay: `${0.6 + index * 0.1}s`}}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-cooperative-dark">
                              Préstamo #{loan.id}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Monto original: ${loan.amount.toLocaleString()}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Activo
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Balance pendiente</p>
                            <p className="font-semibold text-lg">
                              ${loan.balance.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Próximo pago</p>
                            <p className="font-semibold">
                              {new Date(loan.nextPayment).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">{t('dashboard.no_loans')}</p>
                    <Button 
                      onClick={() => navigate('/loans/apply')}
                      className="mt-4 bg-cooperative-blue hover:bg-cooperative-blue/90"
                    >
                      {t('dashboard.apply_loan')}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="animate-fade-in" style={{animationDelay: '0.6s'}}>
              <CardHeader>
                <CardTitle className="text-cooperative-dark">
                  {t('dashboard.quick_actions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate('/loans/apply')}
                  className="w-full bg-cooperative-blue hover:bg-cooperative-blue/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {t('dashboard.apply_loan')}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/payments')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Ver Estado de Cuenta
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/payments/history')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {t('dashboard.payment_history')}
                </Button>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card className="animate-fade-in" style={{animationDelay: '0.7s'}}>
              <CardHeader>
                <CardTitle className="text-cooperative-dark">
                  Pagos Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPayments.map((payment) => (
                    <div 
                      key={payment.id} 
                      className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                      <div>
                        <p className="font-medium">${payment.amount}</p>
                        <p className="text-xs text-gray-500">
                          Préstamo #{payment.loanId}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
