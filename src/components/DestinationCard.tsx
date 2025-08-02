import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Destination } from '@/data/destinations';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Link to={`/destination/${destination.id}`}>
      <Card className="group cursor-pointer overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge 
              variant={destination.type === 'international' ? 'default' : 'secondary'}
              className="bg-white/90 text-foreground hover:bg-white"
            >
              {destination.type === 'international' ? 'International' : 'Domestic'}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-semibold text-lg mb-1">
              {destination.name}
            </h3>
            <div className="flex items-center text-white/90 text-sm">
              <MapPin size={14} className="mr-1" />
              {destination.country}
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {destination.shortDescription}
          </p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock size={12} className="mr-1" />
              {destination.duration}
            </div>
            <span className="font-medium text-primary">
              View Details →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DestinationCard;