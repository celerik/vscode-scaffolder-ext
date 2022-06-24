// Package
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';

// Scripts
import { IFolder } from '../../../utils/interfaces/remoteFolders.interface';
import { remoteList } from '../../../api/remote-list';
import ListItem from '../../molecules/row-item-template';
import styles from './styles';

const TemplateList = () => {
  const [list, setList] = React.useState<IFolder[]>([]);

  const getFolders = async () => {
    const data = await remoteList.getListOfFolders(
      'https://github.com/celerik/celerik-scaffolder-templates.git'
    );
    setList(data);
  };

  useEffect(() => {
    getFolders();
  }, []);

  return (
    <>
      <Paper sx={styles.paper} elevation={0}>
        <Typography variant="h4" sx={styles.title}>
          Remote Templates
        </Typography>
      </Paper>
      <List sx={styles.list}>
        {list.map((folder) => (
          <ListItem key={folder.name} nameFolder={folder.name} link={folder.html_url} />
        ))}
      </List>
    </>
  );
};

export default TemplateList;
