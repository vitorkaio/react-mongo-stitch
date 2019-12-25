import React, { useEffect, useState } from 'react';
import ApiGithub from 'services/ApiGithub';
import List from 'components/list/List';
import { Container } from './HomeStyles';
import ReposStitch from 'services/database/ReposStitch';

const Home = () => {

  const [repos, setRepos] = useState([]);
  const [loadRepos, setLoadRepos] = useState(false);
  const [errorRepos, setErrorRepos] = useState(false);

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoadRepos(true);
        const reposStitch = await ReposStitch;
        setRepositories(await reposStitch.getClient().getRepos());

        const apiGithub = new ApiGithub();
        const res = await apiGithub.getRepos('vitorkaio');
        setRepos(res.map((item) => {return {id: item.id, name: item.name}}));
      } catch (error) {
        console.log(error);        
      }
      
    };
    fetch();
  }, []);

  useEffect(() => {
    if (repos.length !== 0) {
      setLoadRepos(false);
    }
  }, [repos])

  const verifyReposSave = (listRepos) => {
    if (repositories.length !== 0) {
      return listRepos.map((item) => { 
        if (repositories.findIndex(rep => rep.id_repos === item.id) !== -1) {
          return {...item, save: true}
        }
        else {
          return {...item, save: false}
        }
       });
    }
    else {
      return repos;
    }
  };

  const saveRepo = async ({ id: id_repos, name }) => {
    try {
      const newRepo = {
        id_repos,
        name
      }
      const reposStitch = await ReposStitch;
      const res = await reposStitch.getClient().saveRepo(newRepo);
      if (res) {
        setRepositories(await reposStitch.getClient().getRepos());
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(loadRepos);

  return (
    <Container>
      {
        loadRepos
        ?
        <h4>Carregando...</h4>
        :
        <List repos={verifyReposSave(repos)} select={saveRepo} />
      }
    </Container>
  );
};

export default Home;
