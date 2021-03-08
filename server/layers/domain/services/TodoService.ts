import { FilterQuery } from 'mongoose';
import { Todo, TodoDocument } from '../../dataAccess/models/Todo';
import { TodoRepository } from '../../dataAccess/repositories';
import { 
  UpdateOneResult,
  UpdateManyResult,
  DeleteOneResult,
  DeleteManyResult,
} from '../../dataAccess/BaseRepository';

class TodoService {
  async countAllTodos (): Promise<number> {
    return TodoRepository.estimatedDocumentCount();
  }

  async countTodos (filter:FilterQuery<TodoDocument>): Promise<number> {
    return TodoRepository.countDocuments(filter);
  }

  async getTodos (): Promise<Todo[]> {
    return TodoRepository.find({}, { label: 1 });
  }

  async insertTodo (todo: Todo): Promise<Todo> {
    return TodoRepository.insertOne(todo);
  }

  async insertTodos (todos: TodoDocument[]): Promise<Todo[]> {
    return TodoRepository.insertMany(todos);
  }

  async updateTodo (todoId: string, updateFields: Todo): Promise<UpdateOneResult> {
    return TodoRepository.updateOne({ _id: todoId }, updateFields);
  }

  async updateTodos (todoIds: string[], updateFields: Todo): Promise<UpdateManyResult> {
    return TodoRepository.updateMany({ _id: { $in: todoIds } }, updateFields);
  }

  async deleteTodo (todoId: string): Promise<DeleteOneResult> {
    return TodoRepository.deleteOne({ _id: todoId });
  }

  async deleteTodos (todoIds: string[]): Promise<DeleteManyResult> {
    return TodoRepository.deleteMany({ _id: { $in: todoIds } });
  }
}

export default new TodoService;
