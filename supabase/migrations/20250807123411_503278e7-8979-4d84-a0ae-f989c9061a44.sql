-- Add new statuses to inquiry_status enum
ALTER TYPE inquiry_status ADD VALUE 'requirement';
ALTER TYPE inquiry_status ADD VALUE 'itinerary';

-- Make next_follow_up_date mandatory for inquiries
ALTER TABLE public.inquiries 
ALTER COLUMN next_follow_up_date SET NOT NULL;

-- Add status timing tracking
ALTER TABLE public.inquiries 
ADD COLUMN status_timestamps JSONB DEFAULT '{}';

-- Add time taken tracking for each status
ALTER TABLE public.inquiries 
ADD COLUMN status_durations JSONB DEFAULT '{}';

-- Create function to track status changes and calculate durations
CREATE OR REPLACE FUNCTION public.track_inquiry_status_change()
RETURNS TRIGGER AS $$
DECLARE
  current_time TIMESTAMP WITH TIME ZONE := now();
  previous_status_time TIMESTAMP WITH TIME ZONE;
  duration_seconds INTEGER;
BEGIN
  -- Track timestamp for new status
  NEW.status_timestamps = COALESCE(NEW.status_timestamps, '{}'::jsonb) || 
    jsonb_build_object(NEW.status::text, current_time);
  
  -- Calculate duration for previous status if this is an update
  IF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    -- Get the timestamp when previous status was set
    previous_status_time = (OLD.status_timestamps->>OLD.status::text)::timestamp with time zone;
    
    IF previous_status_time IS NOT NULL THEN
      duration_seconds = EXTRACT(EPOCH FROM (current_time - previous_status_time))::integer;
      NEW.status_durations = COALESCE(NEW.status_durations, '{}'::jsonb) || 
        jsonb_build_object(OLD.status::text, duration_seconds);
    END IF;
  END IF;
  
  -- For new inquiries, set initial timestamp
  IF TG_OP = 'INSERT' THEN
    NEW.status_timestamps = jsonb_build_object(NEW.status::text, current_time);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for status tracking
CREATE TRIGGER track_inquiry_status_changes
  BEFORE INSERT OR UPDATE ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.track_inquiry_status_change();

-- Create table for Facebook configuration
CREATE TABLE public.facebook_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  app_id TEXT NOT NULL,
  app_secret TEXT NOT NULL,
  page_access_token TEXT NOT NULL,
  page_id TEXT NOT NULL,
  webhook_verify_token TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on facebook_config
ALTER TABLE public.facebook_config ENABLE ROW LEVEL SECURITY;

-- Create policy for facebook_config
CREATE POLICY "Only admins can manage Facebook config" 
ON public.facebook_config 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::user_role));

-- Add trigger for facebook_config timestamps
CREATE TRIGGER update_facebook_config_updated_at
  BEFORE UPDATE ON public.facebook_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create table for Facebook inquiries tracking
CREATE TABLE public.facebook_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  facebook_message_id TEXT NOT NULL UNIQUE,
  inquiry_id UUID REFERENCES public.inquiries(id),
  sender_id TEXT NOT NULL,
  message_text TEXT NOT NULL,
  received_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS on facebook_inquiries
ALTER TABLE public.facebook_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy for facebook_inquiries
CREATE POLICY "Admins and advisors can view Facebook inquiries" 
ON public.facebook_inquiries 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::user_role) OR has_role(auth.uid(), 'travel_advisor'::user_role));