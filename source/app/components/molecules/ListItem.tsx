// Package
import * as React from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

const styles = {
  textFolder: {
    color: '#BEC2D1',
    paddingLeft: '16px',
  },
};
export interface Props {
  nameFolder: string;
  link: string;
}
const _ListItem = function ({ nameFolder, link }: Props) {
  return (
    <ListItem>
      <Grid container>
        <Grid xs={7} md={9} item container alignItems="center">
          <Typography sx={{ fontSize: '18px', ...styles.textFolder }}>{nameFolder}</Typography>
        </Grid>
        <Grid xs={3} md={2} item container alignItems="center">
          <Link href="https://example.com/" sx={{ fontSize: '18px' }} underline="always">
            {'Open in Github'}
          </Link>
        </Grid>
        <Grid xs={2} md={1} item>
          <Button sx={{ mt: '3px', color: '#3a78d1' }}>select</Button>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default _ListItem;
