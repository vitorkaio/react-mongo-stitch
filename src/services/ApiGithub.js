import axios from 'axios';

class ApiGithub {
  constructor() {
    this.url = 'https://api.github.com/users/';
  }

  // Retorna todos os repositórios do usuário passado.
  async getRepos(username) {
    try {
      const repos = await axios.get(`${this.url}${username}/repos?per_page=100&sort=pushed`);
      return repos.data;
    } catch (error) {
      const err = error;
      throw (err);
    }
  }
}// Fim da classe.

export default ApiGithub;
