import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'src/components/NextLink/NextLink';
import { useRouter } from 'next/router';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navigation = () => {
  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'white',
          color: 'text.primary',
          borderBottomColor: 'divider',
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              mr: 1,
              borderRadius: 2,
              backgroundColor: 'primary.main',
              color: 'white',
            }}
          >
            <MailIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Docker Mailserver Admin
          </Typography>
          <Link
            variant="body1"
            href="/mailaccount"
            noWrap
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
                paddingRight: 16,
                textDecoration: 'none',
                fontWeight: router.pathname == '/mailaccount' ? 700 : 300,
              },
            }}
          >
            Mail Accounts
          </Link>
          <Link
            variant="body1"
            noWrap
            href="/mailalias"
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
                textDecoration: 'none',
                fontWeight: router.pathname == '/mailalias' ? 700 : 300,
              },
            }}
          >
            Mail Alias
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
