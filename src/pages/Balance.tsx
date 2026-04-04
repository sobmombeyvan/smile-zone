
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Smartphone, Wifi, Signal, RefreshCw, Eye, EyeOff } from "lucide-react";

interface NetworkBalance {
  id: string;
  network: string;
  logo: string;
  color: string;
  balance: string;
  data: string;
  validity: string;
  status: 'active' | 'expired' | 'low';
}

const networkBalances: NetworkBalance[] = [
  {
    id: "1",
    network: "Orange",
    logo: "🟠",
    color: "orange",
    balance: "0 FCFA",
    data: "0 GB",
    validity: "Aucun forfait actif",
    status: "expired"
  },
  {
    id: "2",
    network: "MTN",
    logo: "🟡",
    color: "yellow",
    balance: "0 FCFA",
    data: "0 GB",
    validity: "Aucun forfait actif",
    status: "expired"
  },
  {
    id: "3",
    network: "Camtel",
    logo: "🔵",
    color: "blue",
    balance: "0 FCFA",
    data: "0 GB",
    validity: "Aucun forfait actif",
    status: "expired"
  }
];

const Balance = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [animateCard, setAnimateCard] = useState("");

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    // Animation de succès
    setAnimateCard("refresh");
    setTimeout(() => setAnimateCard(""), 600);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white animate-pulse">Actif</Badge>;
      case 'low':
        return <Badge className="bg-orange-500 text-white animate-bounce">Faible</Badge>;
      case 'expired':
        return <Badge className="bg-red-500 text-white">Inactif</Badge>;
      default:
        return null;
    }
  };

  const getNetworkColor = (network: string) => {
    switch (network.toLowerCase()) {
      case 'orange':
        return 'from-orange-400 to-orange-600';
      case 'mtn':
        return 'from-yellow-400 to-yellow-600';
      case 'camtel':
        return 'from-blue-400 to-blue-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-yellow-100 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header glassmorphism */}
      <header className="backdrop-blur-md bg-white/30 shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="p-2 backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">Mes Soldes</h1>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="backdrop-blur-sm bg-white/20 hover:bg-white/30 border-white/30 transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Résumé total avec glassmorphism */}
        <Card className={`mb-6 backdrop-blur-md bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 text-black border-0 shadow-xl transform transition-all duration-500 hover:scale-105 ${animateCard === 'refresh' ? 'animate-bounce' : ''}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Solde Total</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-black hover:bg-black/20 transition-colors duration-200"
              >
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-black/80">Crédit:</span>
                <span className="text-2xl font-bold animate-pulse">
                  {showBalance ? "0 FCFA" : "****"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black/80">Data:</span>
                <span className="text-2xl font-bold animate-pulse">
                  {showBalance ? "0 GB" : "****"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des réseaux */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 animate-fade-in">
            Par Réseau
          </h3>
          
          {networkBalances.map((network, index) => (
            <Card 
              key={network.id}
              className={`relative overflow-hidden transition-all duration-500 hover:shadow-xl cursor-pointer backdrop-blur-md bg-white/40 border-white/30 shadow-lg transform hover:scale-102 ${
                network.status === 'expired' ? 'opacity-90' : ''
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fade-in 0.6s ease-out forwards'
              }}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getNetworkColor(network.network)}`} />
              
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getNetworkColor(network.network)} flex items-center justify-center text-white text-xl font-bold shadow-lg animate-pulse`}>
                      {network.logo}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{network.network}</h4>
                      <p className="text-sm text-gray-500">{network.validity}</p>
                    </div>
                  </div>
                  {getStatusBadge(network.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-sm bg-white/30 rounded-lg p-3 hover:bg-white/40 transition-colors duration-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Smartphone className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-600 font-medium">Crédit</span>
                    </div>
                    <p className="font-bold text-green-600 text-lg">
                      {showBalance ? network.balance : "****"}
                    </p>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-white/30 rounded-lg p-3 hover:bg-white/40 transition-colors duration-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Wifi className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-600 font-medium">Data</span>
                    </div>
                    <p className="font-bold text-blue-600 text-lg">
                      {showBalance ? network.data : "****"}
                    </p>
                  </div>
                </div>
                
                <Button 
                  className={`w-full mt-4 bg-gradient-to-r ${getNetworkColor(network.network)} hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg`}
                >
                  <Signal className="w-4 h-4 mr-2" />
                  Recharger
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions rapides glassmorphism */}
        <Card className="mt-6 backdrop-blur-md bg-gradient-to-r from-green-50/80 to-blue-50/80 border-white/30 animate-fade-in">
          <CardContent className="text-center py-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Besoin d'un nouveau forfait ?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Découvrez nos offres spéciales
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Voir les forfaits
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Balance;
