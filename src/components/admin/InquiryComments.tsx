import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@supabase/supabase-js";
import { CalendarIcon, UserIcon } from "lucide-react";

interface InquiryComment {
  id: string;
  comment: string;
  next_follow_up_date: string | null;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string;
  } | null;
}

interface InquiryCommentsProps {
  inquiryId: string;
  currentUser: User;
  onCommentAdded?: () => void;
}

export const InquiryComments = ({ inquiryId, currentUser, onCommentAdded }: InquiryCommentsProps) => {
  const [comments, setComments] = useState<InquiryComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [nextFollowUpDate, setNextFollowUpDate] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, [inquiryId]);

  const fetchComments = async () => {
    try {
      // First get comments
      const { data: comments, error: commentsError } = await supabase
        .from('inquiry_comments')
        .select('*')
        .eq('inquiry_id', inquiryId)
        .order('created_at', { ascending: false });

      if (commentsError) throw commentsError;

      // Then get user profiles for each comment
      const commentsWithProfiles = await Promise.all(
        (comments || []).map(async (comment) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', comment.user_id)
            .single();

          return {
            ...comment,
            profiles: profile
          };
        })
      );

      setComments(commentsWithProfiles);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Add comment
      const { error: commentError } = await supabase
        .from('inquiry_comments')
        .insert({
          inquiry_id: inquiryId,
          user_id: currentUser.id,
          comment: newComment,
          next_follow_up_date: nextFollowUpDate || null
        });

      if (commentError) throw commentError;

      // Update inquiry with next follow up date if provided
      if (nextFollowUpDate) {
        const { error: updateError } = await supabase
          .from('inquiries')
          .update({
            next_follow_up_date: nextFollowUpDate,
            status: 'follow_up'
          })
          .eq('id', inquiryId);

        if (updateError) throw updateError;
      }

      // Log activity
      await supabase.rpc('log_inquiry_activity', {
        p_inquiry_id: inquiryId,
        p_user_id: currentUser.id,
        p_activity_type: 'comment_added',
        p_details: { 
          comment: newComment,
          next_follow_up_date: nextFollowUpDate || null 
        }
      });

      // Reset form
      setNewComment("");
      setNextFollowUpDate("");
      
      // Refresh comments
      await fetchComments();
      
      // Notify parent component
      onCommentAdded?.();

      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Comments & Follow-ups</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="comment">Add Comment</Label>
            <Textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Enter your comment or follow-up notes..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="followUpDate">Next Follow-up Date (Optional)</Label>
            <Input
              id="followUpDate"
              type="datetime-local"
              value={nextFollowUpDate}
              onChange={(e) => setNextFollowUpDate(e.target.value)}
            />
          </div>
          
          <Button onClick={addComment} disabled={loading}>
            {loading ? "Adding..." : "Add Comment"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Comment History</h4>
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4" />
                  <CardTitle className="text-sm">
                    {comment.profiles?.full_name || 'Unknown User'}
                  </CardTitle>
                </div>
                <CardDescription className="text-xs">
                  {new Date(comment.created_at).toLocaleString()}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm mb-2">{comment.comment}</p>
              {comment.next_follow_up_date && (
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline" className="text-xs">
                    Follow-up: {new Date(comment.next_follow_up_date).toLocaleString()}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {comments.length === 0 && (
          <div className="text-center py-4 text-muted-foreground text-sm">
            No comments yet. Add the first comment above.
          </div>
        )}
      </div>
    </div>
  );
};