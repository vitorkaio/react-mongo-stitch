import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

const mongoStitch = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = Stitch.initializeDefaultAppClient('gitrepos-lrwvu');
      await client.auth.loginWithCredential(new AnonymousCredential());
      const mongodb = client.getServiceClient(
        RemoteMongoClient.factory,
        'mongodb-atlas'
      );
      resolve(mongodb);
    } catch (error) {
      reject(error);
    }
  })
}

export default mongoStitch;
