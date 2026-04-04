
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Smartphone, User, Phone, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const plan = location.state?.plan;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    beneficiaryPhone: ""
  });

  if (!plan) {
    navigate('/');
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ouvrir directement le lien de paiement
    window.open(plan.paymentUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/459ea112-e739-4f30-ae45-b0e438e4e451.png" 
                alt="Switchpro" 
                className="w-8 h-8 object-contain"
              />
              <h1 className="text-lg font-semibold text-gray-900">Commande</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Résumé du forfait */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.data} • {plan.validity}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-600">{plan.price}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulaire */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Informations personnelles</CardTitle>
            <CardDescription>
              Complétez vos informations pour finaliser votre commande
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">Prénom *</Label>
                  <Input
                    id="firstName"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">Nom *</Label>
                  <Input
                    id="lastName"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Votre numéro *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="6 XX XX XX XX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficiaryPhone" className="text-sm font-medium">
                  Numéro à activer *
                </Label>
                <Input
                  id="beneficiaryPhone"
                  type="tel"
                  placeholder="6 XX XX XX XX"
                  value={formData.beneficiaryPhone}
                  onChange={(e) => handleInputChange('beneficiaryPhone', e.target.value)}
                  className="h-12"
                  required
                />
                <p className="text-xs text-gray-500">
                  Le numéro sur lequel le forfait sera activé
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Bouton de paiement */}
        <Button
          onClick={handleSubmit}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold"
        >
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Payer {plan.price}</span>
          </div>
        </Button>

        <p className="text-center text-xs text-gray-500 mt-4">
          En continuant, vous acceptez nos conditions d'utilisation
        </p>
      </div>
    </div>
  );
};

export default OrderForm;
