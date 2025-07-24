
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password);
      toast.success('¡Bienvenido a la Cooperativa Doña Pina!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cooperative-blue via-cooperative-green to-cooperative-blue p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl animate-fade-in">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cooperative-blue to-cooperative-green rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-2xl">DP</span>
            </div>
            <CardTitle className="text-2xl font-bold text-cooperative-dark">
              {t('auth.login.title')}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {t('auth.login.subtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cooperative-dark font-medium">
                  {t('auth.login.email')}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-cooperative-dark font-medium">
                  {t('auth.login.password')}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onCheckedChange={(checked) =>
                      setFormData(prev => ({ ...prev, remember: !!checked }))
                    }
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    {t('auth.login.remember')}
                  </Label>
                </div>
                <Button variant="link" className="text-cooperative-blue p-0 h-auto">
                  {t('auth.login.forgot')}
                </Button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cooperative-blue hover:bg-cooperative-blue/90 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('common.loading')}
                  </>
                ) : (
                  t('auth.login.submit')
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                {t('auth.login.no_account')}{' '}
                <Button variant="link" className="text-cooperative-blue p-0 h-auto">
                  {t('auth.login.register')}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
