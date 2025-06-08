import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Alert,
  Pagination,
  Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { selectBlog } from '../features/blogs/blogSlice';

interface BlogPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BlogList: React.FC = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const blogsPerPage = 10;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const currentBlogs = blogs.slice((page - 1) * blogsPerPage, page * blogsPerPage);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data: BlogPost[] = await response.json();
        setBlogs(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CircularProgress size={60} sx={{ display: 'block', margin: 'auto', mt: 8 }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
        Blog List
      </Typography>
      <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <List>
          {currentBlogs.map((blog) => (
            <ListItemButton
              key={blog.id}
              onClick={() => dispatch(selectBlog(blog.id))}
              sx={{
                borderBottom: '1px solid #e0e0e0',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 4px 8px rgba(25, 118, 210, 0.3)', // subtle blue shadow
                },
              }}
            >
              <ListItemText
                primary={blog.title}
                secondary={`User ID: ${blog.userId} | Blog ID: ${blog.id}`}
                primaryTypographyProps={{
                  sx: {
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    color: 'text.primary',
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: 14,
                    color: 'text.secondary',
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* Pagination Control */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default BlogList;
