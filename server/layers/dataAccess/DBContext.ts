import mongoose, { Connection } from 'mongoose';
// @ts-ignore
import { config } from 'dotenv-yaml';

config();

class DBContext {
  private isConnected = false
  private connection: Connection | null = null

  async connect (uri: string) {
    if (!this.isConnected) {
      mongoose.Promise = global.Promise;
      this.connection = mongoose.connection;
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
      });
    }
  }

  getConnection () {
    return new Promise((resolve, reject) => {
      if (!this.connection) {
        reject('connect method not called yet');  
      } else if (this.connection.readyState === 1) {
        resolve(this.connection);
      } else {
        this.connection.once('connected', () => {
          resolve(this.connection);
        });
        this.connection.once('error', (err) => {
          reject(err);
        });
      }
    });
  }
}

export default new DBContext;
