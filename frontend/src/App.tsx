import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  HStack,
  Icon,
  Spinner,
  Textarea,
  Button,
  Input,
} from "@chakra-ui/react";
import { Toaster, toast } from "react-hot-toast";
import { FaRegCommentDots, FaEdit, FaTrash } from "react-icons/fa";

// 投稿データ型
interface Post {
  id: number;
  content: string;
  created_at: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  // 投稿一覧取得
  const fetchPosts = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 投稿送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast("投稿内容を入力してください", { icon: "⚠️" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setContent("");
        fetchPosts();
        toast.success("投稿しました");
      } else {
        toast.error("投稿に失敗しました");
      }
    } catch {
      toast.error("通信エラー");
    } finally {
      setSubmitting(false);
    }
  };

  // 編集開始
  const handleEditStart = (post: Post) => {
    setEditId(post.id);
    setEditContent(post.content);
  };

  // 編集キャンセル
  const handleEditCancel = () => {
    setEditId(null);
    setEditContent("");
  };

  // 編集保存
  const handleEditSave = async (id: number) => {
    if (!editContent.trim()) {
      toast("内容を入力してください", { icon: "⚠️" });
      return;
    }
    setEditLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });
      if (res.ok) {
        toast.success("編集しました");
        setEditId(null);
        setEditContent("");
        fetchPosts();
      } else {
        toast.error("編集に失敗しました");
      }
    } catch {
      toast.error("通信エラー");
    } finally {
      setEditLoading(false);
    }
  };

  // 削除
  const handleDelete = async (id: number) => {
    if (!window.confirm("本当に削除しますか？")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("削除しました");
        fetchPosts();
      } else {
        toast.error("削除に失敗しました");
      }
    } catch {
      toast.error("通信エラー");
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={10}
      p={6}
      boxShadow="md"
      borderRadius="md"
      bg="white"
    >
      <Toaster position="top-right" />
      <Heading mb={6} textAlign="center" color="teal.600">
        <Icon as={FaRegCommentDots} boxSize={8} mr={2} />
        掲示板
      </Heading>
      {/* 投稿フォーム */}
      <Box as="form" onSubmit={handleSubmit} mb={6}>
        <Textarea
          placeholder="投稿内容を入力..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
      {/* 投稿一覧 */}
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <Flex direction="column" gap={4}>
          {posts.length === 0 ? (
            <Text color="gray.500" textAlign="center">
              投稿がありません
            </Text>
          ) : (
            posts.map((post) => (
              <Box
                key={post.id}
                p={4}
                borderWidth={1}
                borderRadius="md"
                bg="gray.50"
              >
                <HStack>
                  <Icon as={FaRegCommentDots} color="teal.400" />
                  {editId === post.id ? (
                    <>
                      <Input
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        size="sm"
                        mr={2}
                        disabled={editLoading}
                      />
                      <Button
                        colorScheme="teal"
                        size="sm"
                        onClick={() => handleEditSave(post.id)}
                        loading={editLoading}
                        mr={2}
                      >
                        保存
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleEditCancel}
                        disabled={editLoading}
                      >
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
                        onClick={() => handleEditStart(post)}
                        mr={1}
                      >
                        <FaEdit style={{ marginRight: 4 }} />
                        編集
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDelete(post.id)}
                      >
                        <FaTrash style={{ marginRight: 4 }} />
                        削除
                      </Button>
                    </>
                  )}
                </HStack>
              </Box>
            ))
          )}
        </Flex>
      )}
    </Box>
  );
};

export default App;
