// Package
import * as React from 'react';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// Scripts
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
  const [list, setList] = React.useState();
  return (
    <>
      <Paper sx={styles.paper} elevation={0}>
        <Typography variant="h4" sx={styles.title}>
          Remote Templates
        </Typography>
      </Paper>
      <List sx={styles.list}>
        <ListItem nameFolder={'this is a test two'} link={'https://example.com/'} />
        <ListItem nameFolder={'this is a test two'} link={'https://example.com/'} />
        <ListItem nameFolder={'this is a test two'} link={'https://example.com/'} />
        <ListItem nameFolder={'this is a test two'} link={'https://example.com/'} />
      </List>
    </>
  );
};

export default ListItems;
