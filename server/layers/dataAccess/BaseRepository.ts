import { 
  Model, 
  Document, 
  Query, 
  FilterQuery, 
  UpdateQuery, 
  QueryOptions,
} from 'mongoose';
import { generateId } from '../domain/utilities'

type ProjectionInclude = {
  [key: string]: 1 
};

type ProjectionExclude = {
  [key: string]: 0
};

type Projection =  | ProjectionInclude | ProjectionExclude;

export interface UpdateOneResult {
  n: number,
  nModified: number,
  ok: number,
}

export interface UpdateManyResult {
  n: number,
  nModified: number,
  ok: number,
}

export interface DeleteOneResult {
  n: number,
  ok: number,
  deleteCount: number,
}

export interface DeleteManyResult {
  n: number,
  ok: number,
  deleteCount: number,
}

class BaseRepository<T extends Document, U extends Record<string, unknown>> {
  private model: Model<T>
  constructor (model: Model<T>) {
    this.model = model;
  }

  async estimatedDocumentCount (): Promise<Query<number, T>> {
    return this.model.estimatedDocumentCount();
  }

  async countDocuments (filter: FilterQuery<T> = {}): Promise<Query<number, T>> {
    return this.model.countDocuments(filter);
  }

  async distinct (query: FilterQuery<T>, field: string): Promise<unknown[]> {
    return this.model.distinct(field, query);
  }

  async findOne (filter: FilterQuery<T> = {}, projection?: Projection, options?: QueryOptions): Promise<U | null> {
    const [result] = await this.find(filter, projection, { ...options, limit: 1 });
    if (result) {
      return result;
    }
    return null;
  }

  async find (filter: FilterQuery<T> = {}, projection?: Projection, options?: QueryOptions): Promise<U[]> {
    const result = await this.model.find(filter, projection, options);
    return result.map((d: T) => this.toObject(d));
  }

  async insertOne (documentToInsert: U & { _id?: string }): Promise<U> {
    const documentWithId = { ...documentToInsert };
    if (!documentWithId._id) {
      documentWithId._id = generateId();
    }
    const result = await this.model.create(documentWithId);
    return this.toObject(result);
  }

  async insertMany (documentsToInsert: T[]): Promise<U[]> {
    const documentsWithId = documentsToInsert.map((d: T) => {
      if (!d._id) {
        d._id = generateId();
      }
      return d;
    });
    const result = await this.model.insertMany(documentsWithId);
    return result.map((d: T) => this.toObject(d));
  }

  async updateOne (filter: FilterQuery<T>, updateFields: UpdateQuery<T>): Promise<UpdateOneResult> {
    return this.model.updateOne(filter, updateFields);
  }

  async updateMany (filter: FilterQuery<T>, updateFields: UpdateQuery<T>): Promise<UpdateManyResult> {
    return this.model.updateMany(filter, updateFields);
  }

  async deleteOne (filter: FilterQuery<T>): Promise<DeleteOneResult> {
    return this.model.deleteOne(filter);
  }

  async deleteMany (filter: FilterQuery<T>): Promise<DeleteManyResult> {
    return this.model.deleteMany(filter);
  }

  async aggregate (aggregations: Record<string, unknown>[]): Promise<U[]> {
    const result = await this.model.aggregate(aggregations);
    return result.map((d: T) => this.toObject(d));
  }

  private toObject (doc: T): U {
    return <U>doc.toObject();
  }
}

export default BaseRepository;
