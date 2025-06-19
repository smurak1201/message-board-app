import React from "react";
import { Box, HStack, Icon, Text, Input, Button } from "@chakra-ui/react";
import { FaRegCommentDots, FaEdit, FaTrash } from "react-icons/fa";

interface Post {
  id: number;
  content: string;
  created_at: string;
}

interface PostItemProps {
  post: Post;
  editId: number | null;
  editContent: string;
  editLoading: boolean;
  onEditStart: (post: Post) => void;
  onEditCancel: () => void;
  onEditSave: (id: number) => void;
  onEditContentChange: (value: string) => void;
  onDelete: (id: number) => void;
}

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
          <>
            <Input
              value={editContent}
              onChange={(e) => onEditContentChange(e.target.value)}
              size="sm"
              mr={2}
              disabled={editLoading}
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
