'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const pages = [
  ['Home', '/'],
  ['Events', '/events'],
  ['Database', '/database'],
];
const settings = [
  ['Profile', '/userprofile'],
  ['Logout', '/api/auth/signout'],
];

const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: 400,
  zIndex: 1000,
  color: 'black',
};

const overlayStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleHelpModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#459863' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Hamburger menu for xs screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index}>
                  <Typography
                    component="a"
                    href={page[1]}
                    sx={{ textAlign: 'center' }}
                  >
                    {page[0]}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Rooted East title for xs screens */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/#home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#D5C7BC',
              textDecoration: 'none',
            }}
          >
            Rooted East
          </Typography>
          {/* Rooted East title for md screens */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/#home"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#D5C7BC',
              textDecoration: 'none',
            }}
          >
            ROOTED EAST
          </Typography>
          {/* Nav Buttons for md screens */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto', mr: 3 }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                href={page[1]}
                sx={{ my: 2, color: '#D5C7BC', display: 'block', ml: 3 }}
              >
                {page[0]}
              </Button>
            ))}
            <Button
              onClick={toggleHelpModal}
              sx={{ my: 2, color: '#D5C7BC', display: 'block', ml: 3 }}
            >
              Help
            </Button>
          </Box>
          {isModalOpen && (
            <div>
              {/* Overlay */}
              <div style={overlayStyles} onClick={toggleHelpModal} />
              {/* Modal Content */}
              <div style={modalStyles}>
                <IconButton
                  onClick={toggleHelpModal}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'black',
                  }}
                  aria-label="close"
                >
                  ✕
                </IconButton>
                <Typography id="help-modal-title" variant="h6" component="h2">
                  Need Help?
                </Typography>
                <Typography id="help-modal-description" sx={{ mt: 2 }}>
                  TOO BAD!!!!!!!!!!
                </Typography>
              </div>
            </div>
          )}
          {/* Profile menu for all screens */}
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index}>
                  <Typography
                    component="a"
                    href={setting[1]}
                    sx={{ textAlign: 'center' }}
                  >
                    {setting[0]}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
