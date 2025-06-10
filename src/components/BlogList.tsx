// src/components/BlogList.tsx
import React, { useState } from 'react';
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
  Divider,
  Avatar,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { selectBlog } from '../features/blogs/blogSlice';
import { BlogPost } from '../types';
import { useGetAllBlogsQuery } from '../features/blogs/blogApi';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const BlogList: React.FC = () => {
  const dispatch = useDispatch();
  const { data: blogs = [], isLoading, isError, error } = useGetAllBlogsQuery();
  const [page, setPage] = useState<number>(1);

  const blogsPerPage = 10;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const currentBlogs = blogs.slice((page - 1) * blogsPerPage, page * blogsPerPage);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CircularProgress size={60} sx={{ display: 'block', margin: 'auto', mt: 8 }} />
      </Container>
    );
  }

  if (isError) {
    const errMsg = (error as { message?: string })?.message ?? 'Failed to load blogs';
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{errMsg}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Beautiful Header */}
      <Box
        sx={{
          mb: 4,
          px: 3,
          py: 2,
          borderRadius: 2,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(to right, #1e3c72, #2a5298)'
              : 'linear-gradient(to right, #e3f2fd, #bbdefb)',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <MenuBookIcon />
        </Avatar>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : 'primary.main'),
          }}
        >
          Blog Explorer
        </Typography>
      </Box>

      {/* Blog List */}
      <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <List disablePadding>
          {currentBlogs.map((blog: BlogPost, idx: number) => (
            <React.Fragment key={blog.id}>
              <ListItemButton
                onClick={() => dispatch(selectBlog(blog.id))}
                sx={{
                  px: 3,
                  py: 2,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.1)',
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemText
                  primary={blog.title}
                  secondary={`User ID: ${blog.userId} • Blog ID: ${blog.id}`}
                  primaryTypographyProps={{
                    sx: {
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: 'text.primary',
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      fontSize: 13,
                      color: 'text.secondary',
                    },
                  }}
                />
              </ListItemButton>
              {idx < currentBlogs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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