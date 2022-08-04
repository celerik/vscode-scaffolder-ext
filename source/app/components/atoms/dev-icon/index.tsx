// package
import * as React from 'react';

// scripts
import styles from './styles';

export interface Props {
  iconName?: string;
  customStyle?: Record<string, any>;
}

const DevIcon = ({ iconName, customStyle }: Props) => (
  <i
    style={{ ...styles.mainContainer, ...customStyle }}
    className={`devicon-${iconName}-plain devicon-devicon-plain colored`}
  />
);

DevIcon.defaultProps = {
  customStyle: {},
  iconName: 'devicon'
};

export default DevIcon;
