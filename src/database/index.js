import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Task from '../app/models/Task';

const models = [User, Task];
class Database {
  constructor() {
    this.init();
  }

  init() {
    // Start the connection of the database with the models

    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))

      // Verify and Start the model associations
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
