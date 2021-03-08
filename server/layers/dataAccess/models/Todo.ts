import { Schema, model, Model, Document } from 'mongoose';

const TodoSchema = new Schema({
  _id: { type: String, required: true },
  label: { type: String, required: true }
}, {
  versionKey: false,
});

export interface Todo extends Record<string, unknown>{
  label: string
}

export interface TodoDocument extends Todo, Document {}

// eslint-disable-next-line
export interface ITodoModel extends Model<TodoDocument> {}

export const TodoModel: ITodoModel = model('Todo', TodoSchema);
