import { useState } from 'react';
import { ChevronUp, ChevronDown, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const destinations = [
  'Paris, France', 'London, UK', 'New York, USA', 'Tokyo, Japan', 'Dubai, UAE',
  'Singapore', 'Bali, Indonesia', 'Thailand', 'Switzerland', 'Italy',
  'Goa, India', 'Kerala, India', 'Rajasthan, India', 'Kashmir, India', 'Himachal Pradesh, India',
  'Uttarakhand, India', 'Tamil Nadu, India', 'Karnataka, India', 'Maharashtra, India', 'Gujarat, India'
];

const InquiryBox = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: '',
    fromCity: '',
    travellers: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    if (field === 'phone' || field === 'travellers') {
      // Only allow numeric values
      if (value === '' || /^\d+$/.test(value)) {
        if (field === 'phone' && value.length <= 10) {
          setFormData(prev => ({ ...prev, [field]: value }));
        } else if (field === 'travellers') {
          setFormData(prev => ({ ...prev, [field]: value }));
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name,
          phone: formData.phone,
          destination: formData.destination,
          from_city: formData.fromCity,
          travellers: parseInt(formData.travellers)
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Inquiry Submitted",
        description: "Thank you for your inquiry! We will contact you soon.",
      });

      setFormData({
        name: '',
        phone: '',
        destination: '',
        fromCity: '',
        travellers: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-elevated gradient-card border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg gradient-hero text-white font-semibold">
              Quick Inquiry
            </CardTitle>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="bg-white/90"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="10-digit phone number"
                  maxLength={10}
                  required
                  className="bg-white/90"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="text-sm font-medium">Destination</Label>
                <Select value={formData.destination} onValueChange={(value) => handleInputChange('destination', value)}>
                  <SelectTrigger className="bg-white/90">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent className="max-h-40">
                    {destinations.map((dest) => (
                      <SelectItem key={dest} value={dest}>
                        {dest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromCity" className="text-sm font-medium">From City</Label>
                <Input
                  id="fromCity"
                  type="text"
                  value={formData.fromCity}
                  onChange={(e) => handleInputChange('fromCity', e.target.value)}
                  placeholder="Your city"
                  required
                  className="bg-white/90"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="travellers" className="text-sm font-medium">Number of Travellers</Label>
                <Input
                  id="travellers"
                  type="text"
                  value={formData.travellers}
                  onChange={(e) => handleInputChange('travellers', e.target.value)}
                  placeholder="Number of people"
                  required
                  className="bg-white/90"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-secondary hover:bg-secondary-hover text-white shadow-glow disabled:opacity-50"
              >
                <Send size={16} className="mr-2" />
                {isLoading ? 'Submitting...' : 'Send Inquiry'}
              </Button>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default InquiryBox;