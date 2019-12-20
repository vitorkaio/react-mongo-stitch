import React from 'react';
import { Container } from './ListStyles';

const List = ({ repos }) => (
  <>
    {
      repos.map((item) => <Container key={item.id}><span>{item.name}</span></Container>)
    }
  </>
);

export default List;
