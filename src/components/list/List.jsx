import React from 'react';
import { Container, WrapperTitle, Title } from './ListStyles';

const List = ({ repos, select }) => {
  console.log(repos);
  return (
    <>
      {
        repos.map((item, index) => {
          return (
            <Container key={item.id} onClick={() => select(item)} isSave={item.save}>
              <WrapperTitle>
                <Title>{index + 1}: {item.name}</Title>
              </WrapperTitle>
            </Container>
          )
        })
      }
    </>
  )
};

export default List;
