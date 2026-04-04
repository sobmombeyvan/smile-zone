
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, User, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const reviews = [
  {
    id: 1,
    name: "Marie Nguema",
    rating: 5,
    comment: "Service excellent ! Activation immédiate et connexion stable. Je recommande vivement Switchpro !",
    date: "Il y a 2 jours",
    plan: "Infinity 30J",
    helpful: 12
  },
  {
    id: 2,
    name: "Jean Baptiste",
    rating: 5,
    comment: "Très satisfait du forfait 15GB. Le rapport qualité-prix est imbattable. Support client très réactif.",
    date: "Il y a 1 semaine",
    plan: "Essential 15GB",
    helpful: 8
  },
  {
    id: 3,
    name: "Fatou Diallo",
    rating: 4,
    comment: "Bonne qualité de service. L'activation s'est faite rapidement. Petit bémol sur la couverture en zone rurale.",
    date: "Il y a 2 semaines",
    plan: "Power 35GB",
    helpful: 5
  },
  {
    id: 4,
    name: "Paul Owona",
    rating: 5,
    comment: "Interface très intuitive pour commander. Paiement sécurisé et service client au top !",
    date: "Il y a 3 semaines",
    plan: "Starter 10GB",
    helpful: 15
  },
  {
    id: 5,
    name: "Aminata Sy",
    rating: 5,
    comment: "Je suis cliente depuis 6 mois. Jamais eu de problème, toujours satisfaite. Switchpro c'est la solution !",
    date: "Il y a 1 mois",
    plan: "Infinity 14J",
    helpful: 20
  }
];

const Reviews = () => {
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

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
              <h1 className="text-lg font-semibold text-gray-900">Avis clients</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Résumé des notes */}
        <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader className="text-center pb-3">
            <div className="flex justify-center items-center space-x-4">
              <div>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </CardTitle>
                <div className="flex justify-center space-x-1 mt-1">
                  {renderStars(Math.round(averageRating))}
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">sur 5</p>
                <p className="text-xs text-gray-500">{reviews.length} avis</p>
              </div>
            </div>
            <CardDescription className="mt-2">
              Avis clients vérifiés Switchpro
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Liste des avis */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-white border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {review.name}
                      </h4>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-xs text-gray-500">• {review.plan}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {review.comment}
                </p>
                
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-xs text-gray-500 p-0 h-auto">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    Utile ({review.helpful})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="text-center py-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Rejoignez nos clients satisfaits !
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Découvrez nos forfaits et profitez d'une connexion de qualité
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Voir les forfaits
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reviews;
