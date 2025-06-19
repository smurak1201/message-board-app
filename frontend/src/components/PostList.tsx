import React from "react";
import { Flex, Text, Spinner } from "@chakra-ui/react";
import PostItem from "./PostItem";

interface Post {
  id: number;
  content: string;
  created_at: string;
}

interface PostListProps {
  posts: Post[];
  loading: boolean;
  editId: number | null;
  editContent: string;
  editLoading: boolean;
  onEditStart: (post: Post) => void;
  onEditCancel: () => void;
  onEditSave: (id: number) => void;
  onEditContentChange: (value: string) => void;
  onDelete: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  editId,
  editContent,
  editLoading,
  onEditStart,
  onEditCancel,
  onEditSave,
  onEditContentChange,
  onDelete,
}) => {
  if (loading) return <Spinner size="lg" />;
  return (
    <Flex direction="column" gap={4}>
      {posts.length === 0 ? (
        <Text color="gray.500" textAlign="center">
          投稿がありません
        </Text>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            editId={editId}
            editContent={editContent}
            editLoading={editLoading}
            onEditStart={onEditStart}
            onEditCancel={onEditCancel}
            onEditSave={onEditSave}
            onEditContentChange={onEditContentChange}
            onDelete={onDelete}
          />
        ))
      )}
    </Flex>
  );
};

export default PostList;
