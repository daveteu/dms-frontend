import {
  Stack,
  Container,
  Button,
  Box,
  FormControl,
  InputLabel,
} from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';
import BootstrapButton from 'src/components/BootstrapButton/BootstrapButton';

import BootstrapTextfield from 'src/components/BootstrapTextfield/BootstrapTextfield';

const Home: NextPage = () => {
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!

    const results = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
      mode: 'cors',
    }).then((res) => res.json());

    if (results.ok) {
      Router.push('/profile');
    }
  };
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Box sx={{ mt: 20 }}>
          <Stack spacing={2}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="bootstrap-email">
                Email
              </InputLabel>
              <BootstrapTextfield name="email" id="bootstrap-email" fullWidth />
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="bootstrap-password">
                Password
              </InputLabel>
              <BootstrapTextfield
                name="password"
                type="password"
                id="bootstrap-password"
                fullWidth
              />
            </FormControl>
            <Stack direction="row" justifyContent="flex-end">
              <BootstrapButton type="submit" variant="contained">
                Sign In
              </BootstrapButton>
            </Stack>
          </Stack>
        </Box>
      </form>
    </Container>
  );
};

export default Home;
