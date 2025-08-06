-- Add next follow up date to inquiries table
ALTER TABLE public.inquiries 
ADD COLUMN next_follow_up_date TIMESTAMP WITH TIME ZONE;

-- Create inquiry_comments table for storing comments
CREATE TABLE public.inquiry_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  next_follow_up_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create inquiry_activity_log table for tracking all activities
CREATE TABLE public.inquiry_activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'status_change', 'comment_added', 'assigned', 'follow_up_scheduled'
  details JSONB,
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_settings table for configuration
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.inquiry_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for inquiry_comments
CREATE POLICY "Admins and advisors can view comments" 
ON public.inquiry_comments 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::user_role) OR has_role(auth.uid(), 'travel_advisor'::user_role));

CREATE POLICY "Admins and advisors can create comments" 
ON public.inquiry_comments 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::user_role) OR has_role(auth.uid(), 'travel_advisor'::user_role));

CREATE POLICY "Users can update their own comments" 
ON public.inquiry_comments 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS policies for inquiry_activity_log
CREATE POLICY "Admins and advisors can view activity log" 
ON public.inquiry_activity_log 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::user_role) OR has_role(auth.uid(), 'travel_advisor'::user_role));

CREATE POLICY "Admins and advisors can create activity log" 
ON public.inquiry_activity_log 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::user_role) OR has_role(auth.uid(), 'travel_advisor'::user_role));

-- RLS policies for admin_settings
CREATE POLICY "Only admins can manage settings" 
ON public.admin_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::user_role));

-- Add triggers for updated_at columns
CREATE TRIGGER update_inquiry_comments_updated_at
BEFORE UPDATE ON public.inquiry_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at
BEFORE UPDATE ON public.admin_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default admin settings
INSERT INTO public.admin_settings (setting_key, setting_value) VALUES 
('follow_up_toast_frequency_hours', '2'::jsonb),
('toast_enabled', 'true'::jsonb);

-- Update inquiry status to include new workflow states
ALTER TYPE inquiry_status ADD VALUE IF NOT EXISTS 'pending_assignment';
ALTER TYPE inquiry_status ADD VALUE IF NOT EXISTS 'needs_follow_up';

-- Function to log activity
CREATE OR REPLACE FUNCTION public.log_inquiry_activity(
  p_inquiry_id UUID,
  p_user_id UUID,
  p_activity_type TEXT,
  p_details JSONB DEFAULT NULL,
  p_old_value TEXT DEFAULT NULL,
  p_new_value TEXT DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  activity_id UUID;
BEGIN
  INSERT INTO public.inquiry_activity_log 
  (inquiry_id, user_id, activity_type, details, old_value, new_value)
  VALUES 
  (p_inquiry_id, p_user_id, p_activity_type, p_details, p_old_value, p_new_value)
  RETURNING id INTO activity_id;
  
  RETURN activity_id;
END;
$$;