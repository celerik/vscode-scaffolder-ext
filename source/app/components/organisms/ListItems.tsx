// Package
import * as React from 'react';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// Scripts
import { IFolder } from '../../utils/interfaces/remoteFolders.interface';
import { remoteList } from '../../api/remote-list';
import ListItem from '../molecules/ListItem';

const styles = {
  list: {
    bgcolor: 'background.paper',
  },
  paper: {
    bgcolor: 'background.paper',
    padding: '7px 0px 7px 15px',
    margin: '5px 0px',
  },
  title: {
    color: 'white',
  },
};
const ListItems = function () {
  const [list, setList] = React.useState<IFolder[]>([]);
  const getFolders = async () => {
    const data = await remoteList.getListOfFolders(
      'https://github.com/celerik/celerik-scaffolder-templates.git'
    );
    setList(data);
  };
  React.useEffect(() => {
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
        {list.map(folder => (
          <ListItem nameFolder={folder.name} link={folder.html_url} />
        ))}
      </List>
    </>
  );
};

export default ListItems;
