import React from "react";
import { Box, Textarea, Button } from "@chakra-ui/react";

// 投稿フォームのprops型
interface PostFormProps {
  content: string; // 入力中の投稿内容
  submitting: boolean; // 送信中かどうか
  onChange: (value: string) => void; // 入力内容が変わったときの処理
  onSubmit: (e: React.FormEvent) => void; // フォーム送信時の処理
}

// 新規投稿フォームコンポーネント
const PostForm: React.FC<PostFormProps> = ({
  content,
  submitting,
  onChange,
  onSubmit,
}) => {
  return (
    <Box as="form" onSubmit={onSubmit} mb={6}>
      {/* 投稿内容の入力欄 */}
      <Textarea
        placeholder="投稿内容を入力..."
        value={content}
        onChange={(e) => onChange(e.target.value)}
        mb={2}
        disabled={submitting}
        fontSize="16px" // ここで文字サイズを指定
        style={{ fontSize: "16px" }} // 念のためインラインでも指定
      />
      {/* 投稿ボタン */}
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
