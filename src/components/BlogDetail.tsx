import React, { useState, useEffect } from 'react';
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

interface BlogPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BlogDetail: React.FC = () => {
  const dispatch = useDispatch();
  const blogId = useSelector((state: RootState) => state.blog.selectedBlogId);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (blogId === null) return;
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog details');
        }
        const data: BlogPost = await response.json();
        setBlog(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [blogId]);

  const isDark = theme.palette.mode === 'dark';

  const neutralBackground = theme.palette.background.paper;
  const sectionBackground = isDark ? '#1e1e1e' : '#fafafa';
  const borderColor = theme.palette.divider;
  const headingColor = theme.palette.text.primary;
  const subHeadingColor = theme.palette.text.secondary;

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => dispatch(clearSelectedBlog())} sx={{ mb: 3 }}>
          Back to Blog List
        </Button>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => dispatch(clearSelectedBlog())} sx={{ mb: 3 }}>
          Back to Blog List
        </Button>
        <Alert severity="info">Blog not found</Alert>
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

        <Box
          sx={{
            backgroundColor: sectionBackground,
            p: 3,
            borderTop: `1px solid ${borderColor}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Article Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Written by User {blog.userId} • Article #{blog.id}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={() => dispatch(clearSelectedBlog())}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: isDark ? '#333' : '#f0f7ff',
              },
            }}
          >
            Back to List
          </Button>
        </Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          border: `1px solid ${borderColor}`,
          borderRadius: 2,
          mt: 3,
          p: 3,
          backgroundColor: neutralBackground,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: headingColor }}>
          Blog Information
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 2,
          }}
        >
          {[
            { label: 'User ID', value: blog.userId, color: theme.palette.primary.main },
            { label: 'Blog ID', value: blog.id, color: theme.palette.secondary.main },
            { label: 'Title Length', value: `${blog.title.length} characters`, color: '#388e3c' },
            { label: 'Content Length', value: `${blog.body.length} characters`, color: '#f57c00' },
          ].map((item, idx) => (
            <Box key={idx}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: item.color }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogDetail;
