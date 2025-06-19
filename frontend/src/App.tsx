import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  HStack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { FaRegCommentDots } from "react-icons/fa";

// 投稿データ型
interface Post {
  id: number;
  content: string;
  created_at: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
      <Heading mb={6} textAlign="center" color="teal.600">
        <Icon as={FaRegCommentDots} boxSize={8} mr={2} />
        掲示板
      </Heading>
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
                  <Text flex={1}>{post.content}</Text>
                  <Text fontSize="xs" color="gray.400">
                    {new Date(post.created_at).toLocaleString()}
                  </Text>
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
