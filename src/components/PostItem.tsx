import React from "react";
import { Box, HStack, Icon, Text, Input, Button } from "@chakra-ui/react";
import { FaRegCommentDots, FaEdit, FaTrash } from "react-icons/fa";

// 投稿データ型
interface Post {
  id: number;
  content: string;
  created_at: string;
}

// 投稿1件分のprops型
interface PostItemProps {
  post: Post; // 投稿データ
  editId: number | null; // 編集中の投稿ID
  editContent: string; // 編集フォームの内容
  editLoading: boolean; // 編集送信中かどうか
  onEditStart: (post: Post) => void; // 編集開始時の処理
  onEditCancel: () => void; // 編集キャンセル時の処理
  onEditSave: (id: number) => void; // 編集保存時の処理
  onEditContentChange: (value: string) => void; // 編集内容変更時の処理
  onDelete: (id: number) => void; // 削除時の処理
}

// 投稿1件分を表示・編集・削除できるコンポーネント
const PostItem: React.FC<PostItemProps> = ({
  post,
  editId,
  editContent,
  editLoading,
  onEditStart,
  onEditCancel,
  onEditSave,
  onEditContentChange,
  onDelete,
}) => {
  return (
    <Box p={4} borderWidth={1} borderRadius="md" bg="gray.50">
      <HStack>
        <Icon as={FaRegCommentDots} color="teal.400" />
        {editId === post.id ? (
          // 編集フォーム表示中
          <>
            <Input
              value={editContent}
              onChange={(e) => onEditContentChange(e.target.value)}
              size="sm"
              mr={2}
              disabled={editLoading}
              fontSize="16px" // ここで文字サイズを指定
              style={{ fontSize: "16px" }} // 念のためインラインでも指定
            />
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => onEditSave(post.id)}
              loading={editLoading}
              mr={2}
            >
              保存
            </Button>
            <Button size="sm" onClick={onEditCancel} disabled={editLoading}>
              キャンセル
            </Button>
          </>
        ) : (
          // 通常表示
          <>
            <Text flex={1}>{post.content}</Text>
            <Text fontSize="xs" color="gray.400" mr={2}>
              {new Date(post.created_at).toLocaleString()}
            </Text>
            <Button
              size="sm"
              variant="ghost"
              colorScheme="teal"
              onClick={() => onEditStart(post)}
              mr={1}
            >
              <FaEdit style={{ marginRight: 4 }} />
              編集
            </Button>
            <Button
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={() => onDelete(post.id)}
            >
              <FaTrash style={{ marginRight: 4 }} />
              削除
            </Button>
          </>
        )}
      </HStack>
    </Box>
  );
};

export default PostItem;
