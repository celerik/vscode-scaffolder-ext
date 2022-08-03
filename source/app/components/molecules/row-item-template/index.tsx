/* global vscode */
// package
import * as React from 'react';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// scripts
import styles from './styles';

export interface Props {
  functionSelect: () => void;
  link: string | undefined;
  nameFolder: string;
  owner?: string;
}

const RowItemTemplate = ({
  functionSelect,
  link,
  nameFolder,
  owner
}: Props) => {
  const onClickGithub = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (link) {
      vscode.postMessage({
        type: 'REDIRECT',
        payload: link
      });
    }
  };

  return (
    <>
      <ListItem onClick={functionSelect} sx={styles.mainContainer}>
        <Grid container>
          <Grid xs={11} item container direction="column">
            <Typography variant="body1" sx={styles.textFolder}>{nameFolder}</Typography>
            {!!owner && (<Typography variant="body2" sx={styles.textFolder}>{`By ${owner}`}</Typography>)}
          </Grid>
          <Grid
            xs={1}
            item
            container
            alignItems="center"
          >
            {link && (
              <Tooltip title="Open in Github" arrow>
                <GitHubIcon
                  onClick={onClickGithub}
                />
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

RowItemTemplate.defaultProps = {
  owner: ''
};

export default RowItemTemplate;
