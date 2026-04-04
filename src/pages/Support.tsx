
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Phone, Mail, MessageCircle, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const faqs = [
  {
    question: "Comment activer mon forfait après le paiement ?",
    answer: "Votre forfait est activé automatiquement dans les 5 minutes suivant le paiement. Vous recevrez un SMS de confirmation sur le numéro bénéficiaire."
  },
  {
    question: "Que faire si mon forfait n'est pas activé ?",
    answer: "Vérifiez d'abord votre solde en composant *126#. Si le problème persiste, contactez-nous avec votre numéro de transaction."
  },
  {
    question: "Puis-je transférer mon forfait à un autre numéro ?",
    answer: "Non, les forfaits sont liés au numéro bénéficiaire spécifié lors de la commande et ne peuvent pas être transférés."
  },
  {
    question: "Comment vérifier ma consommation data ?",
    answer: "Composez *126# pour voir votre solde data restant, ou consultez l'application de votre opérateur."
  },
  {
    question: "Les forfaits sont-ils valables à l'étranger ?",
    answer: "Non, nos forfaits data sont uniquement valables sur le territoire national avec votre opérateur local."
  }
];

const Support = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFaqToggle = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simuler l'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message envoyé !",
        description: "Notre équipe vous répondra dans les 24h",
        className: "bg-green-50 border-green-200"
      });

      // Reset form
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message, veuillez réessayer",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-yellow-100">
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
            <h1 className="text-lg font-semibold text-gray-900">Service client</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Contact Options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="text-center cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <Phone className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-xs font-medium">Appeler</p>
              <p className="text-xs text-gray-500">24h/24</p>
            </CardContent>
          </Card>
          
          <Card className="text-center cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <Mail className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-xs font-medium">Email</p>
              <p className="text-xs text-gray-500">Réponse 24h</p>
            </CardContent>
          </Card>
          
          <Card className="text-center cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <MessageCircle className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <p className="text-xs font-medium">Chat</p>
              <p className="text-xs text-gray-500">En ligne</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Questions fréquentes</span>
            </CardTitle>
            <CardDescription>
              Trouvez rapidement des réponses à vos questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  onClick={() => handleFaqToggle(index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-sm">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-3 text-sm text-gray-600 border-t bg-gray-50">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Nous contacter</CardTitle>
            <CardDescription>
              Envoyez-nous un message, nous vous répondrons rapidement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  placeholder="Votre nom complet"
                  value={contactForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={contactForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="6 XX XX XX XX"
                  value={contactForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  placeholder="Problème d'activation, remboursement..."
                  value={contactForm.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Décrivez votre problème ou votre question..."
                  value={contactForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Envoi en cours...</span>
                  </div>
                ) : (
                  "Envoyer le message"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;
