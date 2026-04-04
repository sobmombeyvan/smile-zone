
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BarChart3, Users, Smartphone, TrendingUp, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Données simulées
const dashboardData = {
  totalOrders: 1247,
  totalRevenue: 3890000,
  activeUsers: 892,
  conversionRate: 68.5
};

const recentOrders = [
  {
    id: "ORD-001",
    customerName: "Marie Nguema",
    plan: "Infinity 30J",
    amount: "12.000 FCFA",
    status: "Activé",
    date: "2024-01-15 14:30",
    phone: "677123456"
  },
  {
    id: "ORD-002",
    customerName: "Jean Baptiste",
    plan: "Essential 15GB",
    amount: "3.500 FCFA",
    status: "En cours",
    date: "2024-01-15 13:45",
    phone: "655987654"
  },
  {
    id: "ORD-003",
    customerName: "Fatou Diallo",
    plan: "Power 35GB",
    amount: "5.000 FCFA",
    status: "Activé",
    date: "2024-01-15 12:20",
    phone: "694456789"
  },
  {
    id: "ORD-004",
    customerName: "Paul Owona",
    plan: "Starter 10GB",
    amount: "2.500 FCFA",
    status: "Échec",
    date: "2024-01-15 11:15",
    phone: "682345678"
  },
  {
    id: "ORD-005",
    customerName: "Aminata Sy",
    plan: "Infinity 14J",
    amount: "7.500 FCFA",
    status: "Activé",
    date: "2024-01-15 10:30",
    phone: "671234567"
  }
];

const planStats = [
  { name: "Starter 10GB", orders: 234, revenue: 234000, percentage: 18.8 },
  { name: "Essential 15GB", orders: 345, revenue: 517500, percentage: 27.7 },
  { name: "Power 35GB", orders: 198, revenue: 495000, percentage: 15.9 },
  { name: "Infinity 14J", orders: 287, revenue: 1004500, percentage: 23.0 },
  { name: "Infinity 30J", orders: 183, revenue: 915000, percentage: 14.7 }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activé':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Échec':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  const maskPhone = (phone: string) => {
    if (!showSensitiveData) {
      return phone.replace(/(\d{3})\d{4}(\d{2})/, '$1****$2');
    }
    return phone;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-yellow-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">Tableau de bord</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSensitiveData(!showSensitiveData)}
              className="flex items-center space-x-2"
            >
              {showSensitiveData ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>Masquer</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Afficher</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Commandes</p>
                  <p className="text-lg font-bold">{formatNumber(dashboardData.totalOrders)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Revenus</p>
                  <p className="text-lg font-bold">{formatNumber(dashboardData.totalRevenue)} F</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Users className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Utilisateurs</p>
                  <p className="text-lg font-bold">{formatNumber(dashboardData.activeUsers)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Smartphone className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Conversion</p>
                  <p className="text-lg font-bold">{dashboardData.conversionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>
              Les 5 dernières commandes passées sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium text-sm">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{maskPhone(order.phone)}</p>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-xs text-gray-600">{order.plan} • {order.amount}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Statistiques par forfait</CardTitle>
            <CardDescription>
              Performance des différents forfaits proposés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {planStats.map((plan, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{plan.name}</span>
                      <span className="text-sm text-gray-500">{plan.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full"
                        style={{ width: `${plan.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{plan.orders} commandes</span>
                      <span className="text-xs font-medium">{formatNumber(plan.revenue)} FCFA</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
