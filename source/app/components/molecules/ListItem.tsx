// package
import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/List';
import Typography from '@mui/material/Typography';

const styles = {
  textFolder: {
    color: 'text.third',
    paddingLeft: '16px',
  },
  buttonSelect: {
    mt: '3px',
    color: '#3a78d1',
  },
};
export interface Props {
  nameFolder: string;
  link: string;
}
const _ListItem = function ({ nameFolder, link }: Props) {
  return (
    <>
      <ListItem>
        <Grid container>
          <Grid xs={7} md={9} item container alignItems="center">
            <Typography sx={{ fontSize: '18px', ...styles.textFolder }}>{nameFolder}</Typography>
          </Grid>
          <Grid xs={3} md={2} item container alignItems="center">
            <Link href={link} sx={{ fontSize: '18px' }} underline="always">
              {'Open in Github'}
            </Link>
          </Grid>
          <Grid xs={2} md={1} item>
            <Button sx={styles.buttonSelect}>select</Button>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default _ListItem;
