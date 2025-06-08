// src/App.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import { RootState } from './app/store';
import { toggleDarkMode } from './features/theme/themeSlice';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const selectedBlogId = useSelector((state: RootState) => state.blog.selectedBlogId);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976d2' },
      background: {
        default: darkMode ? '#121212' : '#f8f9fa',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Navbar
          darkMode={darkMode}
          onDarkModeToggle={() => dispatch(toggleDarkMode())}
        />
        {selectedBlogId !== null ? (
          <BlogDetail />
        ) : (
          <BlogList />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
