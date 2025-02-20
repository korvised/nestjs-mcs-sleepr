import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      _id: new Types.ObjectId(),
      ...document,
    });

    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filter: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filter).lean<TDocument>(true);

    if (!document) {
      this.logger.warn(`Document not found: ${JSON.stringify(filter)}`);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filter: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filter, update, { new: true })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(`Document not found: ${JSON.stringify(filter)}`);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async find(filter: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filter).lean<TDocument[]>(true);
  }

  async findOneAndDelete(filter: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(filter)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(`Document not found: ${JSON.stringify(filter)}`);
      throw new NotFoundException('Document not found');
    }

    return document;
  }
}
