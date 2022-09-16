import React from 'react';
import useSWR from 'swr';
import Router from 'next/router';
import axios from 'axios';
import Navigation from './Navigation';

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

const Layout = (props: any) => {
  const { data, error } = useSWR('/api/profile', fetcher);

  if (!data && !error) return null;
  if (error) {
    Router.push('/');
  }
  return (
    <React.Fragment>
      <Navigation />
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
