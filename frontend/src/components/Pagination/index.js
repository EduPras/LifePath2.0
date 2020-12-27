import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { PaginationContainer } from './styles'
import { COLORS } from '../../constants/colors';


const PaginationComponent = () =>  {
  return (
    <PaginationContainer>
      <Pagination size="large" count={10} />
    </PaginationContainer>
  );
}

export default PaginationComponent
