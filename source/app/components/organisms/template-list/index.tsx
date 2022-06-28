// Package
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Scripts
import ListItem from '../../molecules/row-item-template';
import styles from './styles';
import { IFolder } from '../../../utils/interfaces/remoteFolders.interface';

interface Props {
  title: string;
  data: IFolder[];
}

const TemplateList = ({ title, data }: Props) => (
  <Grid item sx={{ mb: 3 }}>
    <Paper sx={styles.paper} elevation={0}>
      <Typography variant="h5" sx={styles.title}>
        {title}
      </Typography>
    </Paper>
    <List sx={styles.list}>
      {data.length ? data.map((folder) => (
        <ListItem
          key={(folder.name || folder) as React.Key}
          nameFolder={(folder.name || folder) as string}
          link={folder.html_url}
        />
      )) : (
        <Typography variant="h5" sx={styles.noResourceLabel}>
          No resources found
        </Typography>
      )}
    </List>
  </Grid>
);

export default TemplateList;
