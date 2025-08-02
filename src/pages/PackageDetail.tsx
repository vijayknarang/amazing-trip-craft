import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InquiryBox from '@/components/InquiryBox';
import { holidayPackages } from '@/data/packages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Plane, 
  Hotel, 
  Car, 
  Camera, 
  IndianRupee,
  Users,
  Check,
  X,
  Phone,
  Mail
} from 'lucide-react';

const PackageDetail = () => {
  const { id } = useParams();
  const packageData = holidayPackages.find(pkg => pkg.id === id);

  if (!packageData) {
    return <div>Package not found</div>;
  }

  const handleBookNow = () => {
    alert('Booking functionality would be implemented here. Please contact us for booking.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <InquiryBox />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src={packageData.image}
          alt={packageData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{packageData.title}</h1>
            <p className="text-xl mb-4">{packageData.shortDescription}</p>
            <div className="flex items-center justify-center space-x-6 text-lg">
              <div className="flex items-center space-x-2">
                <IndianRupee size={20} />
                <span className="font-bold">₹{packageData.price.toLocaleString()}</span>
                {packageData.originalPrice && (
                  <span className="line-through opacity-75">₹{packageData.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={20} />
                <span>{packageData.nights} Nights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Details */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Package Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Package Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Calendar className="text-primary mx-auto mb-2" size={24} />
                      <div className="font-semibold">{packageData.nights}</div>
                      <div className="text-sm text-muted-foreground">Nights</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Users className="text-primary mx-auto mb-2" size={24} />
                      <div className="font-semibold">2+</div>
                      <div className="text-sm text-muted-foreground">Persons</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <MapPin className="text-primary mx-auto mb-2" size={24} />
                      <div className="font-semibold">Multiple</div>
                      <div className="text-sm text-muted-foreground">Cities</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Star className="text-primary mx-auto mb-2" size={24} />
                      <div className="font-semibold">5.0</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`flex items-center space-x-2 p-3 rounded-lg ${packageData.inclusions.flight ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                      <Plane size={20} />
                      <span className="text-sm font-medium">Flight</span>
                    </div>
                    <div className={`flex items-center space-x-2 p-3 rounded-lg ${packageData.inclusions.hotel ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                      <Hotel size={20} />
                      <span className="text-sm font-medium">Hotel</span>
                    </div>
                    <div className={`flex items-center space-x-2 p-3 rounded-lg ${packageData.inclusions.transfer ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                      <Car size={20} />
                      <span className="text-sm font-medium">Transfer</span>
                    </div>
                    <div className={`flex items-center space-x-2 p-3 rounded-lg ${packageData.inclusions.sightseeing ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                      <Camera size={20} />
                      <span className="text-sm font-medium">Sightseeing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hotels */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Hotels Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {packageData.hotels.map((hotel, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{hotel.name}</h3>
                          <p className="text-muted-foreground text-sm">{hotel.location}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(hotel.rating)].map((_, i) => (
                              <Star key={i} size={14} className="text-yellow-400 fill-current" />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">{hotel.rating} Star Hotel</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Day-wise Itinerary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Day-wise Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {packageData.itinerary.map((day, index) => (
                      <div key={index} className="relative">
                        {index < packageData.itinerary.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border"></div>
                        )}
                        <div className="flex space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                            {day.day}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{day.title}</h3>
                            <p className="text-muted-foreground mb-3">{day.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {day.activities.map((activity, actIndex) => (
                                <Badge key={actIndex} variant="outline" className="text-xs">
                                  {activity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-700">Inclusions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(packageData.inclusions).map(([key, value]) => (
                        value && (
                          <div key={key} className="flex items-center space-x-2">
                            <Check size={16} className="text-green-600" />
                            <span className="text-sm capitalize">
                              {key === 'meals' ? `Meals: ${value}` : key.replace(/([A-Z])/g, ' $1')}
                            </span>
                          </div>
                        )
                      ))}
                      {packageData.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check size={16} className="text-green-600" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-red-700">Exclusions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {packageData.exclusions.map((exclusion, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <X size={16} className="text-red-600" />
                          <span className="text-sm">{exclusion}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-xl">Book This Package</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      ₹{packageData.price.toLocaleString()}
                    </div>
                    {packageData.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        ₹{packageData.originalPrice.toLocaleString()}
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground">Per Person</div>
                  </div>

                  <Separator />

                  <Button 
                    onClick={handleBookNow}
                    className="w-full bg-secondary hover:bg-secondary-hover text-white shadow-glow"
                    size="lg"
                  >
                    Book Now
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Or call us for instant booking
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone size={16} className="text-primary" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail size={16} className="text-primary" />
                      <span>info@amazingtripmaker.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Package Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle>Package Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {packageData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="text-secondary" size={14} />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
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

export default PackageDetail;