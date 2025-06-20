import React from "react";
import { Flex, Text, Spinner } from "@chakra-ui/react";
import PostItem from "./PostItem";

// 投稿データ型
interface Post {
  id: number;
  content: string;
  created_at: string;
}

// 投稿一覧表示用のprops型
interface PostListProps {
  posts: Post[]; // 投稿データ配列
  loading: boolean; // ローディング状態
  editId: number | null;
  editContent: string;
  editLoading: boolean;
  onEditStart: (post: Post) => void;
  onEditCancel: () => void;
  onEditSave: (id: number) => void;
  onEditContentChange: (value: string) => void;
  onDelete: (id: number) => void;
}

// 投稿一覧を表示するコンポーネント
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
  if (loading) return <Spinner size="lg" />; // ローディング中はスピナー表示
  return (
    <Flex direction="column" gap={4}>
      {/* 投稿がない場合の表示 */}
      {posts.length === 0 ? (
        <Text color="gray.500" textAlign="center">
          投稿がありません
        </Text>
      ) : (
        // 投稿がある場合はPostItemで1件ずつ表示
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
