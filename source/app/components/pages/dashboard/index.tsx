/* global HTMLInputElement */
// packages
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import React, { useEffect, useContext, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// scripts
import SettingsButton from '../../molecules/settings-section';
import TemplateList from '../../organisms/template-list';
import styles from './styles';
import { GIT_URL } from '../../../utils/regex';
import { GlobalStateContext } from '../../../context/MessageContext';
import { IFolder } from '../../../utils/interfaces/remoteFolders.interface';
import { remoteList } from '../../../api/remote-list';

const Search = styled('div')(({ theme }) => styles.search(theme));

const SearchIconWrapper = styled('div')(({ theme }) => styles.searchIconWrapper(theme));

const StyledInputBase = styled(InputBase)(({ theme }) => styles.styledInputBase(theme));

const Dashboard = () => {
  const [search, setSearch] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [remoteData, setRemoteData] = useState<IFolder[]>([]);
  const { globalStateFromExtension, localTemplateList } = useContext(GlobalStateContext);

  const getRemoteFolders = async () => {
    if (globalStateFromExtension.templateUrl) {
      const data = await remoteList.getListOfFolders(
        globalStateFromExtension.templateUrl
      );
      const urlFragment = GIT_URL.exec(globalStateFromExtension.templateUrl);
      if (urlFragment) setOwner(urlFragment[4]);
      setRemoteData(data);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    getRemoteFolders();
  }, [globalStateFromExtension.templateUrl]);

  return (
    <Grid direction="column" alignContent="baseline" container sx={styles.gridContainer}>
      <Grid direction="row" justifyContent="space-between" alignItems="center" container item>
        <Typography variant="h2" sx={styles.textContainer}>
          Celerik Scaffolder
        </Typography>
        <Grid
          alignItems="center"
          container
          direction="row"
          item
          justifyContent="space-between"
          md={3}
          wrap="nowrap"
          xs={6}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleChange}
              value={search}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <SettingsButton />
        </Grid>
        <Divider sx={styles.divider} />
      </Grid>
      <Grid sx={styles.list} item>
        <TemplateList
          data={remoteData.filter((template) => template
            .name
            .toLowerCase()
            .includes(search.toLowerCase()))}
          owner={owner}
          title="Remote Templates"
        />
        <TemplateList
          isLocal
          data={localTemplateList.filter((template: IFolder) => template
            .name
            .toLowerCase()
            .includes(search.toLowerCase()))}
          title="Local Templates"
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
