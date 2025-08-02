import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InquiryBox from '@/components/InquiryBox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 98765 43210', '+91 87654 32109'],
      description: 'Call us for instant booking and support'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@amazingtripmaker.com', 'bookings@amazingtripmaker.com'],
      description: 'Send us your queries anytime'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['123 Travel Street', 'Mumbai, Maharashtra 400001'],
      description: 'Visit our office for personalized service'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sun: 10:00 AM - 6:00 PM'],
      description: '24/7 emergency support available'
    }
  ];

  const offices = [
    {
      city: 'Mumbai',
      address: '123 Travel Street, Andheri West, Mumbai - 400001',
      phone: '+91 98765 43210',
      email: 'mumbai@amazingtripmaker.com'
    },
    {
      city: 'Delhi',
      address: '456 Holiday Avenue, Connaught Place, New Delhi - 110001',
      phone: '+91 87654 32109',
      email: 'delhi@amazingtripmaker.com'
    },
    {
      city: 'Bangalore',
      address: '789 Vacation Road, MG Road, Bangalore - 560001',
      phone: '+91 76543 21098',
      email: 'bangalore@amazingtripmaker.com'
    },
    {
      city: 'Chennai',
      address: '321 Journey Lane, T Nagar, Chennai - 600001',
      phone: '+91 65432 10987',
      email: 'chennai@amazingtripmaker.com'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <InquiryBox />

      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
          alt="Contact Amazing Trip Maker"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl">
              Get in touch for your next amazing journey
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're here to help you plan your perfect vacation. Reach out to us through any of the 
              following channels and our travel experts will assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elevated transition-all">
                <CardContent className="p-6">
                  <info.icon className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="font-semibold text-lg mb-3">{info.title}</h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-foreground font-medium">{detail}</p>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is this regarding?" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your travel plans or queries..."
                      rows={4}
                      required 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-hover"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Our Office Locations</h3>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <Card key={index} className="shadow-card">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg mb-2">{office.city} Office</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start space-x-2">
                          <MapPin size={16} className="text-primary mt-0.5" />
                          <span>{office.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone size={16} className="text-primary" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail size={16} className="text-primary" />
                          <span>{office.email}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Social Media */}
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
                  <div className="flex justify-center space-x-4">
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <Facebook size={24} />
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors"
                    >
                      <Instagram size={24} />
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-50 text-blue-400 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <Twitter size={24} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;