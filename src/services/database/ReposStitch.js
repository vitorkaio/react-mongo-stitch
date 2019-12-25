import MongoStitch from './MongoStitch';

const mongoStichRepos = async () => {
  try {
    const mongodb = await MongoStitch();
    const reposStitch = new ReposStitch(mongodb);

    const getClient = () => reposStitch

    return {
      getClient: getClient,
      getTest: () => 'clients'
    };
  } catch (error) {
    throw(error)
  }
}

class ReposStitch {

  constructor (client) {
    this.mongodb = client;
  }

  // Get all repos.
  async getRepos () {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await this.mongodb.db('gitrepos').collection('repos').find().asArray();
        resolve(res);
      } catch (error) {
        console.log('Erro ao criar a connection!');
        reject(error);
      }
    })
  }

  // Save name repos in mongo atlas
  async saveRepo (repo) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.mongodb.db('gitrepos').collection('repos').insertOne(repo);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    })
  }

}

export default mongoStichRepos();
