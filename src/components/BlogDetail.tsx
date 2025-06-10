// src/components/BlogDetail.tsx
import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Person as PersonIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { clearSelectedBlog } from '../features/blogs/blogSlice';
import { useGetBlogByIdQuery } from '../features/blogs/blogApi';

const BlogDetail: React.FC = () => {
  const dispatch = useDispatch();
  const blogId = useSelector((state: RootState) => state.blog.selectedBlogId);
  const theme = useTheme();

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useGetBlogByIdQuery(blogId!, { skip: blogId === null });

  const isDark = theme.palette.mode === 'dark';
  const neutralBackground = theme.palette.background.paper;
  const sectionBackground = isDark ? '#1e1e1e' : '#fafafa';
  const borderColor = theme.palette.divider;
  const headingColor = theme.palette.text.primary;
  const subHeadingColor = theme.palette.text.secondary;

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (isError || !blog) {
    const errMsg = (error as { message?: string })?.message ?? 'Failed to load blog details';
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => dispatch(clearSelectedBlog())} sx={{ mb: 3 }}>
          Back to Blog List
        </Button>
        <Alert severity="error">{errMsg}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => dispatch(clearSelectedBlog())}
        sx={{
          mb: 3,
          '&:hover': {
            backgroundColor: isDark ? '#333' : '#f0f7ff',
          },
        }}
      >
        Back to Blog List
      </Button>

      <Paper
        elevation={0}
        sx={{
          border: `1px solid ${borderColor}`,
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: neutralBackground,
        }}
      >
        <Box
          sx={{
            backgroundColor: sectionBackground,
            p: 3,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Chip
              icon={<PersonIcon />}
              label={`User ID: ${blog.userId}`}
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: isDark ? '#2a3f54' : '#e3f2fd',
                color: isDark ? '#90caf9' : '#1976d2',
                border: `1px solid ${isDark ? '#456' : '#bbdefb'}`,
              }}
            />
            <Chip
              label={`Blog ID: ${blog.id}`}
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: isDark ? '#45224a' : '#f3e5f5',
                color: isDark ? '#ce93d8' : '#7b1fa2',
                border: `1px solid ${isDark ? '#b39ddb' : '#ce93d8'}`,
              }}
            />
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 'bold', color: headingColor, textTransform: 'capitalize' }}>
            {blog.title}
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ color: subHeadingColor, textTransform: 'uppercase', mb: 2 }}>
            Blog Content
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" sx={{ color: headingColor, lineHeight: 1.8, textAlign: 'justify' }}>
            {blog.body}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogDetail;
