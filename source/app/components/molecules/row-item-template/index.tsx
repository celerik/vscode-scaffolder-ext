/* global vscode */
// package
import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/List';
import Typography from '@mui/material/Typography';

// scripts
import styles from './styles';

export interface Props {
  nameFolder: string;
  link: string | undefined;
}

const RowItemTemplate = ({ nameFolder, link }: Props) => {
  const onTestMessage = () => {
    vscode.postMessage({
      type: 'SCAFFOLDING',
      payload: { folder: nameFolder }
    });
  };

  return (
    <>
      <ListItem>
        <Grid container>
          <Grid xs={7} md={9} item container alignItems="center">
            <Typography variant="body1" sx={styles.textFolder}>{nameFolder}</Typography>
          </Grid>
          <Grid xs={3} md={2} item container alignItems="center">
            {link && (
              <Link href={link} sx={{ fontSize: '12px' }} underline="always">
                Open in Github
              </Link>
            )}
          </Grid>
          <Grid xs={2} md={1} item>
            <Button variant="text" onClick={onTestMessage} sx={styles.buttonSelect}>
              select
            </Button>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default RowItemTemplate;
