
import { Coffee, Users, TrendingUp, Shield, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Coffee,
      title: "Premium Coffee Marketplace",
      description: "Connect artisan roasters with coffee enthusiasts worldwide"
    },
    {
      icon: Users,
      title: "Multi-Role Ecosystem",
      description: "Seamless experience for roasters, buyers, and administrators"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Real-time insights and performance tracking for all users"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "End-to-end security with professional-grade infrastructure"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Artisan Roaster",
      content: "This platform has transformed how I connect with customers. The analytics help me understand what they love most.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Coffee Enthusiast",
      content: "I've discovered amazing roasters I never would have found otherwise. The quality and variety are incredible.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Cafe Owner",
      content: "The ordering system is so smooth, and the tracking keeps me informed every step of the way.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-coffee-100">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-float mb-8">
            <Coffee className="h-16 w-16 mx-auto text-coffee-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 coffee-text-gradient">
            The Digital Roastery Ecosystem
          </h1>
          
          <p className="text-xl text-coffee-700 mb-8 max-w-3xl mx-auto">
            Connecting artisan roasters, passionate buyers, and smart administrators 
            in the world's most comprehensive coffee marketplace platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/catalog">
              <Button size="lg" className="coffee-gradient hover:opacity-90 text-lg px-8 py-3">
                Explore Coffee Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/roaster">
              <Button size="lg" variant="outline" className="border-coffee-600 text-coffee-700 hover:bg-coffee-50 text-lg px-8 py-3">
                Join as Roaster
              </Button>
            </Link>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Link to="/roaster">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-coffee-200">
                <CardHeader>
                  <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Coffee className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-coffee-900">Roaster</CardTitle>
                  <CardDescription className="text-coffee-600">
                    The Artisan of Flavor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-coffee-700 space-y-2">
                    <li>• Add & manage coffee products</li>
                    <li>• Real-time order notifications</li>
                    <li>• Performance analytics dashboard</li>
                    <li>• Customer review management</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link to="/buyer">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-coffee-200">
                <CardHeader>
                  <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-coffee-900">Buyer</CardTitle>
                  <CardDescription className="text-coffee-600">
                    The Quality Coffee Enthusiast
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-coffee-700 space-y-2">
                    <li>• Browse premium coffee catalog</li>
                    <li>• Seamless ordering experience</li>
                    <li>• Real-time order tracking</li>
                    <li>• Review & rating system</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-coffee-200">
                <CardHeader>
                  <div className="w-16 h-16 coffee-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-coffee-900">Admin</CardTitle>
                  <CardDescription className="text-coffee-600">
                    The System Guardian
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-coffee-700 space-y-2">
                    <li>• Monitor all transactions</li>
                    <li>• User & review management</li>
                    <li>• Customer support system</li>
                    <li>• System analytics & insights</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 coffee-text-gradient">
            Why Choose Our Platform?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-coffee-200">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mx-auto text-coffee-600 mb-4" />
                  <CardTitle className="text-xl text-coffee-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-coffee-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-coffee-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 coffee-text-gradient">
            What Our Users Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-coffee-200">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-coffee-500 text-coffee-500" />
                    ))}
                  </div>
                  <CardTitle className="text-lg text-coffee-900">{testimonial.name}</CardTitle>
                  <Badge variant="secondary" className="bg-coffee-100 text-coffee-700 w-fit">
                    {testimonial.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-coffee-700 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 coffee-gradient text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join the Coffee Revolution?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're a roaster, buyer, or looking to manage the ecosystem, 
            we have the perfect solution for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button size="lg" variant="secondary" className="bg-white text-coffee-700 hover:bg-coffee-50 text-lg px-8 py-3">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-coffee-900 text-coffee-100">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Coffee className="h-8 w-8" />
            <span className="text-2xl font-bold">Bean Brew Bytes</span>
          </div>
          <p className="text-coffee-300">
            Connecting the world through exceptional coffee experiences.
          </p>
          <p className="text-coffee-400 text-sm mt-4">
            © 2024 Bean Brew Bytes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
