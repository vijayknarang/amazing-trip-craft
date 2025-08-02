import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InquiryBox from '@/components/InquiryBox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Globe, Heart, Shield, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50,000+' },
    { icon: Globe, label: 'Destinations', value: '200+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Heart, label: 'Customer Rating', value: '4.9/5' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your safety and security are our top priorities. We ensure all our partners meet the highest standards.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do, creating personalized experiences that exceed expectations.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'With partnerships worldwide, we bring you authentic experiences from every corner of the globe.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our dedicated team is available round the clock to assist you before, during, and after your journey.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <InquiryBox />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop"
          alt="About Amazing Trip Maker"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-xl md:text-2xl">
              Creating Amazing Travel Experiences Since 2009
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Amazing Trip Maker was founded with a simple vision: to make travel accessible, enjoyable, and unforgettable 
              for everyone. What started as a small travel agency in Mumbai has grown into one of India's most trusted 
              travel companies, serving thousands of happy customers every year.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop"
                alt="Our team"
                className="rounded-lg shadow-elevated w-full"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Why Choose Amazing Trip Maker?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge className="bg-primary text-white mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Expert Travel Planners</h4>
                    <p className="text-muted-foreground">Our experienced team crafts personalized itineraries based on your preferences and budget.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-primary text-white mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Best Price Guarantee</h4>
                    <p className="text-muted-foreground">We offer competitive prices with no hidden costs and transparent pricing policies.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-primary text-white mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">24/7 Customer Support</h4>
                    <p className="text-muted-foreground">Our support team is always available to help you during your journey.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-primary text-white mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Trusted Partnerships</h4>
                    <p className="text-muted-foreground">We work with verified hotels, airlines, and local operators to ensure quality service.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gradient mb-12">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-card">
                <CardContent className="p-6">
                  <stat.icon className="text-primary mx-auto mb-4" size={48} />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gradient mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <value.icon className="text-primary" size={32} />
                    <CardTitle>{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gradient mb-8">Our Mission</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              "To inspire and enable people to explore the world by providing exceptional travel experiences 
              that create lasting memories, foster cultural understanding, and contribute to sustainable tourism."
            </p>
            <div className="text-lg font-semibold text-primary">
              - Amazing Trip Maker Team
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;