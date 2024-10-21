"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Comments } from "@/app/(server)/schema/user.schema";
import { User, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { getCommentsMovie } from "../../service/movies.service";
import { client } from "../../lib/hc";

interface CommentMovieProps {
  contentId: string;
}

const CommentMovie = ({ contentId }: CommentMovieProps) => {
  const { data: session } = useSession();
  const [isLoadingPostComment, setIsLoadingPostComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["commentsMovie", contentId],
    queryFn: () => getCommentsMovie(contentId),
    enabled: !!contentId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: Infinity,
  });

  console.log(comments);

  const handlePostComment = async () => {
    setIsLoadingPostComment(true);
    try {
      const res = await client.api.comment.$post({
        json: {
          userId: session?.user?.id,
          contentId,
          type: "movie",
          text: commentText,
        },
      });

      if (res.ok) {
        refetch();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setCommentText("");
      setIsLoadingPostComment(false);
    }
  };

  return (
    <Card className="mt-8 border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary border-b border-gray-700 pb-2">
          Comments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading comments...</p>
        ) : Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src={comment.avatarUrl || ""} alt={comment.username || ""} className="object-cover" />
                    <AvatarFallback className="bg-gray-600 text-gray-300">
                      <User size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">
                      {comment.username}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center">
                      <Clock className="mr-1" size={14} />
                      {formatDistanceToNow(new Date(comment?.createdAt || ""), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-gray-300">{comment.text}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        {session ? (
          <div className="mt-6">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-3 border border-primary/20 rounded bg-primary/10 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Add a comment..."
              rows={3}
            />
            <Button
              className="mt-3 bg-primary hover:bg-primary/80 text-white"
              onClick={handlePostComment}
              disabled={isLoadingPostComment}
            >
              {isLoadingPostComment ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        ) : (
          <Card className="mt-6 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="text-center">
                <User size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Join the conversation
                </h3>
                <p className="text-gray-400 mb-4">
                  Log in to share your thoughts and interact with other fans.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Log In to Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentMovie;