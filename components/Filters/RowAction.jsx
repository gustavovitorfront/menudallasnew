import React from 'react';
import { MenuItem } from '@chakra-ui/react';

const RowAction = ({ title, onClick, ...rowProps }) => (
  <MenuItem onClick={onClick}>{title}</MenuItem>
);

export default RowAction;
