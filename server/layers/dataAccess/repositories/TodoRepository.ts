import BaseRepository from '../BaseRepository';
import { TodoModel, Todo, TodoDocument, } from '../models/Todo';

class TodoRepository extends BaseRepository<TodoDocument, Todo> {
  constructor () {
    super(TodoModel);
  }
}

export default new TodoRepository;
