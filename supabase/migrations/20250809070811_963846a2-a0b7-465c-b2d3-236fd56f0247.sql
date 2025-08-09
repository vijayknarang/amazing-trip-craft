-- Drop the existing policy that allows all advisors to see all inquiries
DROP POLICY "Admins and advisors can view all inquiries" ON public.inquiries;

-- Create new policy: Admins can see all inquiries, advisors only see assigned ones
CREATE POLICY "Admins can view all inquiries, advisors only assigned ones" 
ON public.inquiries 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::user_role) OR 
  (has_role(auth.uid(), 'travel_advisor'::user_role) AND assigned_to = auth.uid())
);

-- Update the update policy to match the same logic
DROP POLICY "Admins and advisors can update inquiries" ON public.inquiries;

CREATE POLICY "Admins can update all inquiries, advisors only assigned ones" 
ON public.inquiries 
FOR UPDATE 
USING (
  has_role(auth.uid(), 'admin'::user_role) OR 
  (has_role(auth.uid(), 'travel_advisor'::user_role) AND assigned_to = auth.uid())
);