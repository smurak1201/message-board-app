import React from "react";
import { Box, Textarea, Button } from "@chakra-ui/react";

interface PostFormProps {
  content: string;
  submitting: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PostForm: React.FC<PostFormProps> = ({
  content,
  submitting,
  onChange,
  onSubmit,
}) => {
  return (
    <Box as="form" onSubmit={onSubmit} mb={6}>
      <Textarea
        placeholder="投稿内容を入力..."
        value={content}
        onChange={(e) => onChange(e.target.value)}
        mb={2}
        disabled={submitting}
      />
      <Button
        colorScheme="teal"
        type="submit"
        loading={submitting}
        disabled={!content.trim() || submitting}
        w="100%"
      >
        投稿する
      </Button>
    </Box>
  );
};

export default PostForm;
