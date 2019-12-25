import React, { useEffect, useState } from 'react';
import ApiGithub from 'services/ApiGithub';
import List from 'components/list/List';
import { Container } from './HomeStyles';
import ReposStitch from 'services/database/ReposStitch';

const Home = () => {
  const [repos, setRepos] = useState([]);


  useEffect(() => {
    const fetch = async () => {
      try {
        const reposStitch = await ReposStitch;
        const repositories = await reposStitch.getClient().getRepos();
        console.log(repositories);

        const apiGithub = new ApiGithub();
        const res = await apiGithub.getRepos('vitorkaio');
        setRepos(res.map((item) => {return {id: item.id, name: item.name}}));
      } catch (error) {
        console.log(error);        
      }
      
    };
    fetch();
  }, []);

  const verifyReposSave = (listRepos) => {
    return listRepos.map((item) => { return {...item, save: false} });
  };

  const saveRepo = async ({ id: id_repos, name }) => {
    try {
      const newRepo = {
        id_repos,
        name
      }
      const reposStitch = await ReposStitch;
      const res = await reposStitch.getClient().saveRepo(newRepo);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <List repos={verifyReposSave(repos)} select={saveRepo} />
    </Container>
  );
};

export default Home;
