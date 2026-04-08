
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Smartphone, Clock, Star, Menu, User, MessageCircle, Zap, Shield, CheckCircle } from "lucide-react";

interface DataPlan {
  id: string;
  name: string;
  data: string;
  validity: string;
  price: string;
  paymentUrl: string;
  popular?: boolean;
}

const dataPlans: DataPlan[] = [
  {
    id: "1",
    name: "Starter",
    data: "6GB",
    validity: "7 jours",
    price: "1.000 FCFA",
    paymentUrl: "https://donate.fapshi.com/37899105"
  },
  {
    id: "2",
    name: "Essential",
    data: "10GB",
    validity: "7 jours",
    price: "1.500 FCFA",
    paymentUrl: "https://donate.fapshi.com/63273985",
    popular: true
  },
  {
    id: "3",
    name: "Power",
    data: "35GB",
    validity: "10 jours",
    price: "2.500 FCFA",
    paymentUrl: "https://donate.fapshi.com/82638155"
  },
  {
    id: "4",
    name: "Premium 14J",
    data: "50GB",
    validity: "14 jours",
    price: "3.500 FCFA",
    paymentUrl: "https://donate.fapshi.com/51089772"
  },
  {
    id: "5",
    name: "Infinity 30J",
    data: "Illimité",
    validity: "30 jours",
    price: "5.000 FCFA",
    paymentUrl: "https://donate.fapshi.com/62602428"
  }
];

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Animation séquentielle des cartes
    dataPlans.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedCards(prev => [...prev, index]);
      }, index * 150);
    });
  }, []);

  const handleSelectPlan = (plan: DataPlan) => {
    setSelectedPlan(plan);
    navigate('/order', { state: { plan } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-yellow-100 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header glassmorphism */}
      <header className="backdrop-blur-md bg-white/30 shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Switchpro
                </h1>
                <p className="text-xs text-gray-600">Forfaits Data Premium</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with glassmorphism */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent mb-4">
            Choisissez votre forfait
          </h2>
          <p className="text-gray-600 text-sm backdrop-blur-sm bg-white/20 rounded-full px-4 py-2 inline-block border border-white/30">
            ✨ Des forfaits adaptés à tous vos besoins
          </p>
        </div>

        {/* Navigation rapide avec glassmorphism */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { icon: Smartphone, label: "Soldes", color: "yellow", path: "/balance" },
            { icon: Star, label: "Avis", color: "yellow", path: "/reviews" },
            { icon: MessageCircle, label: "Support", color: "yellow", path: "/support" },
            { icon: User, label: "Compte", color: "yellow", path: "/dashboard" }
          ].map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 flex-col space-y-2 backdrop-blur-md bg-white/20 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(item.path)}
            >
              <item.icon className={`w-5 h-5 text-${item.color}-500 group-hover:scale-110 transition-transform duration-200`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Features section */}
        <div className="backdrop-blur-md bg-white/20 rounded-2xl p-4 mb-6 border border-white/30 animate-fade-in">
          <div className="flex items-center justify-around text-center">
            <div className="flex flex-col items-center space-y-1">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-700 font-medium">Activation Instantanée</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-700 font-medium">Paiement Sécurisé</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-700 font-medium">Haut Débit</span>
            </div>
          </div>
        </div>

        {/* Forfaits Data avec glassmorphism */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 animate-fade-in">Nos forfaits</h3>

          {dataPlans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer backdrop-blur-md bg-white/40 border-white/30 hover:bg-white/50 hover:scale-105 group ${plan.popular ? 'ring-2 ring-blue-400/50 shadow-blue-100' : ''
                } ${animatedCards.includes(index) ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleSelectPlan(plan)}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {plan.popular && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs px-3 py-1 animate-pulse shadow-lg">
                    ⭐ Populaire
                  </Badge>
                </div>
              )}

              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-200">
                      {plan.name}
                    </h4>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <Clock className="w-4 h-4 mr-1 text-blue-500" />
                      <span>{plan.validity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-200">
                      {plan.data}
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {plan.price}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group-hover:animate-pulse"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan);
                  }}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Souscrire maintenant
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer info glassmorphism */}
        <div className="mt-8 text-center animate-fade-in">
          <div className="backdrop-blur-md bg-white/20 rounded-full px-6 py-3 inline-block border border-white/30">
            <p className="text-sm text-gray-700 font-medium">
              🔒 Paiement sécurisé • ⚡ Activation instantanée • 🌟 Support 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
