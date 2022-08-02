// package
import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

// scripts
import styles from './styles';

export interface Props {
  nameFolder: string;
  functionSelect: () => void;
  link: string | undefined;
}

const RowItemTemplate = ({ nameFolder, link, functionSelect }: Props) => {
  const nameFolderFormat = () => {
    const nameFolderFormatted = nameFolder.replaceAll('-', ' ');
    return nameFolderFormatted.toLowerCase().charAt(0).toUpperCase() + nameFolderFormatted.slice(1);
  };

  return (
    <Grid md={6} sx={styles.content}>
      <ListItem divider sx={styles.listItem}>
        <Grid container>
          <Grid xs={7} md={9} item container alignItems="center">
            <Typography variant="body1" sx={styles.textFolder}>{nameFolderFormat()}</Typography>
          </Grid>
          <Grid xs={3} md={2} item container alignItems="center">
            {link && (
              <Link href={link} sx={{ fontSize: '12px' }} underline="always">
                Open in Github
              </Link>
            )}
          </Grid>
          <Grid xs={2} md={1} item>
            <Button onClick={functionSelect} variant="text" sx={styles.buttonSelect}>
              select
            </Button>
          </Grid>
        </Grid>
      </ListItem>
    </Grid>
  );
};

export default RowItemTemplate;
