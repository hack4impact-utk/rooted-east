'use client';

import Image from 'next/image';
import RELogo from '@/assets/RE_logo.png';
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
import '../../app/global.styles.css';

const pages = [
  ['Home', '/'],
  ['Events', '/events'],
  ['Database', '/database'],
];
const settings = [
  ['Profile', '/userprofile'],
  ['Logout', '/api/auth/signout'],
];

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
    <AppBar position="sticky" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Hamburger menu for xs screens */}
          <Box className="nav-hamburger">
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className="nav-menu"
            >
              {pages.map((page, index) => (
                <MenuItem key={index}>
                  <Typography
                    component="a"
                    href={page[1]}
                    className="nav-menu-item"
                  >
                    {page[0]}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Rooted East title */}
          <Box className="logo-container">
            <Button href="/#home" className="logo-button">
              <Image
                src={RELogo}
                alt="Rooted East Logo"
                width={100}
                height={70}
                className="logo-image"
              />
            </Button>
          </Box>

          {/* Navigation Buttons */}
          <Box className="nav-buttons">
            {pages.map((page, index) => (
              <Button key={index} href={page[1]} className="nav-button">
                {page[0]}
              </Button>
            ))}
            <Button onClick={toggleHelpModal} className="nav-button">
              Help
            </Button>
          </Box>

          {/* Help Modal */}
          {isModalOpen && (
            <div>
              <div className="modal-overlay" onClick={toggleHelpModal} />
              <div className="modal">
                <IconButton onClick={toggleHelpModal} className="modal-close">
                  ✕
                </IconButton>
                <Typography variant="h6" className="modal-title">
                  Need Help?
                </Typography>
                <Typography className="modal-text">
                  TOO BAD!!!!!!!!!!
                </Typography>
              </div>
            </div>
          )}

          {/* Profile menu */}
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} className="profile-icon">
                <Avatar src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              className="profile-menu"
            >
              {settings.map((setting, index) => (
                <MenuItem key={index}>
                  <Typography
                    component="a"
                    href={setting[1]}
                    className="profile-menu-item"
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
