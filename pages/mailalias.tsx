import React from 'react';
import {
  Stack,
  Container,
  Button,
  Box,
  FormControl,
  InputLabel,
  Table,
  TableRow,
  TableCell,
  Typography,
  Paper,
} from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';
import BootstrapButton from 'src/components/BootstrapButton/BootstrapButton';
import Layout from 'src/components/Layout/Layout';
import useSWR from 'swr';
import axios from 'axios';
import BootstrapTextfield from 'src/components/BootstrapTextfield/BootstrapTextfield';
import { grey, red } from '@mui/material/colors';
const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

const MailAlias = () => {
  const { data, error, mutate } = useSWR('/api/account', fetcher);

  const onCreateMailAccount = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!

    const results = await fetch('/api/account', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'xmlHttpRequest',
      },
    });
    if (results !== null) {
      const resetForm = e.target as HTMLFormElement;
      resetForm.reset();
      mutate();
    }
  };

  const onDeleteMailAccount = async (email: string) => {
    const results = await fetch('/api/account', {
      method: 'DELETE',
      body: JSON.stringify({ email }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'xmlHttpRequest',
      },
    });
    if (results.ok) {
      mutate();
    }
  };

  return (
    <Layout>
      <Container>
        <form onSubmit={onCreateMailAccount}>
          <Box sx={{ mt: 20 }}>
            <Paper sx={{ p: 4 }}>
              <Stack spacing={2}>
                <Typography>New Mail Account</Typography>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-email">
                    Email
                  </InputLabel>
                  <BootstrapTextfield
                    name="email"
                    id="bootstrap-email"
                    fullWidth
                  />
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
                    Create Account
                  </BootstrapButton>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </form>
        {data && !error && (
          <Paper>
            <Table>
              {Object.keys(data).map((domain: string) => {
                return (
                  <React.Fragment key={domain}>
                    <TableRow sx={{ backgroundColor: grey[200] }}>
                      <TableCell sx={{ padding: '8px 16px' }} colSpan={2}>
                        <strong>{domain}</strong>
                      </TableCell>
                    </TableRow>
                    {data[domain].map((email: string) => (
                      <TableRow key={email}>
                        <TableCell>{email}</TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          <BootstrapButton
                            onClick={() => onDeleteMailAccount(email)}
                            sx={{
                              color: 'white',
                              backgroundColor: red[600],
                              borderColor: red[700],
                              '&:hover': {
                                backgroundColor: red[700],
                                borderColor: red[800],
                              },
                            }}
                            color="error"
                          >
                            Delete
                          </BootstrapButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                );
              })}
            </Table>
          </Paper>
        )}
      </Container>
    </Layout>
  );
};

export default MailAlias;
