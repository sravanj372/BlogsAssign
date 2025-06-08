import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Switch,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
interface NavbarProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ darkMode, onDarkModeToggle }) => {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'black',
        borderBottom: '1px solidrgb(224, 224, 224)',
        color: 'black'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        {/* Left side - Logo and Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
              sx={{ 
                width: 8, 
                height: 8, 
                backgroundColor: 'black',
                transform: 'rotate(45deg)'
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
              Bloggr
            </Typography>
          </Box>
        </Box>

        {/* Right side - Search, Icons, Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          
          
          
          
          <Switch
            checked={darkMode}
            onChange={onDarkModeToggle}
            icon={<DarkModeIcon />}
            checkedIcon={<DarkModeIcon />}
            sx={{ ml: 1 }}
          />
          
          <Avatar
            src="/api/placeholder/32/32"
            sx={{ width: 32, height: 32 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;