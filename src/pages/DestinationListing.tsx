import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InquiryBox from '@/components/InquiryBox';
import { destinations } from '@/data/destinations';
import { holidayPackages } from '@/data/packages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Clock, Star, Plane, Hotel, Car, Camera, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

const DestinationListing = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const destination = destinations.find(d => d.id === id);
  const packages = holidayPackages.filter(pkg => pkg.destinationId === id);

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <InquiryBox />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
            <p className="text-xl mb-2">{destination.country}</p>
            <Badge variant="outline" className="text-white border-white">
              {destination.type === 'international' ? 'International' : 'Domestic'}
            </Badge>
          </div>
        </div>
      </section>

      {/* Destination Info */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">About {destination.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {destination.description}
                  </p>
                </CardContent>
              </Card>

              {/* Photo Gallery */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Photo Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <img
                        src={destination.gallery[selectedImage]}
                        alt={`${destination.name} ${selectedImage + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Thumbnail Images */}
                    <div className="grid grid-cols-4 gap-2">
                      {destination.gallery.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative h-16 rounded overflow-hidden border-2 transition-all ${
                            selectedImage === index ? 'border-primary' : 'border-transparent'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${destination.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Top Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="text-secondary" size={16} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-primary" size={20} />
                    <span>{destination.country}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-primary" size={20} />
                    <div>
                      <div className="font-medium">Best Time to Visit</div>
                      <div className="text-sm text-muted-foreground">{destination.bestTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="text-primary" size={20} />
                    <div>
                      <div className="font-medium">Recommended Duration</div>
                      <div className="text-sm text-muted-foreground">{destination.duration}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Holiday Packages */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Holiday Packages for {destination.name}</h2>
            <p className="text-muted-foreground">Choose from our carefully crafted packages for the perfect vacation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden shadow-card hover:shadow-elevated transition-all">
                <div className="relative h-48">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  {pkg.originalPrice && (
                    <Badge className="absolute top-3 left-3 bg-secondary text-white">
                      Save ₹{pkg.originalPrice - pkg.price}
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{pkg.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {pkg.shortDescription}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <IndianRupee size={16} className="text-primary" />
                      <span className="font-bold text-lg">₹{pkg.price.toLocaleString()}</span>
                      {pkg.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {pkg.nights} Nights
                    </div>
                  </div>

                  {/* Inclusions Icons */}
                  <div className="flex items-center space-x-3 mb-4">
                    {pkg.inclusions.flight && <Plane size={16} className="text-green-600" />}
                    {pkg.inclusions.hotel && <Hotel size={16} className="text-green-600" />}
                    {pkg.inclusions.transfer && <Car size={16} className="text-green-600" />}
                    {pkg.inclusions.sightseeing && <Camera size={16} className="text-green-600" />}
                  </div>

                  <Link to={`/package/${pkg.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary-hover">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinationListing;