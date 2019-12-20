import React, { useEffect, useState } from 'react';
import ApiGithub from 'services/ApiGithub';
import List from 'components/list/List';
import { Container } from './HomeStyles';

const Home = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const apiGithub = new ApiGithub();
      const res = await apiGithub.getRepos('vitorkaio');
      setRepos(res);
    };
    fetch();
  }, []);

  return (
    <Container>
      <List repos={repos} />
    </Container>
  );
};

export default Home;
