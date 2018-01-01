const iRepository = require('./iRepository');

class MongoGenericRepository extends iRepository {
	constructor(model, context) {
		super();
		this._model = model;
		this.modelName = model.modelName;
		this._context = context;
	}

	async handleCall(call) {
		return call
			.then(result => {
				if (!result) {
					return result;
				} else if (result.toObject) {
					result = result.toObject();
				} else if (result._doc) {
					result = result._doc;
				}
				return result;
			})
			.catch(err => {
				throw err;
			});
	}

	async find(query) {
		return await this.handleCall(this._model.find(query).lean());
	}
	async findOne(query) {
		return await this.handleCall(this._model.findOne(query).lean());
	}
	async findById(id) {
		return await this.handleCall(this._model.findById(id).lean());
	}
	async create(modelObj) {
		return await this.handleCall(this._model.create(modelObj));
	}
	async update(query, modelObj) {
		return await this.handleCall(this._model.update(query, { $set: modelObj }));
	}
	async updateOne(query, modelObj) {
		return await this.handleCall(
			this._model.findOneAndUpdate(query, { $set: modelObj }, { new: true })
		);
	}
	async updateById(id, modelObj) {
		return await this.handleCall(
			this._model.findByIdAndUpdate(id, { $set: modelObj }, { new: true })
		);
	}
	async delete(query) {
		return await this.handleCall(this._model.remove(query));
	}
	async deleteOne(query) {
		return await this.handleCall(this._model.findOneAndRemove(query));
	}
	async deleteById(id) {
		return await this.handleCall(this._model.findByIdAndRemove(id));
	}
	async updateOnePull(query, modelObj) {
		return this.handleCall(
			this._model.findOneAndUpdate(query, { $pull: modelObj }, { new: true })
		);
	}

	async updateOnePush(query, modelObj) {
		return this.handleCall(
			this._model.findOneAndUpdate(query, { $push: modelObj }, { new: true })
		);
	}

	async aggrenate(offset = 0, limit = 10, aggregateQueries = [], sort = {}) {
		const aggregates = aggregateQueries.concat([
			{
				$sort: sort
			},
			{
				$group: {
					_id: null,
					total: { $sum: 1 },
					docs: { $push: '$$ROOT' }
				}
			},
			{
				$project: {
					_id: 0,
					total: 1,
					limit: { $literal: limit },
					offset: { $literal: offset },
					pages: {
						$ceil: {
							$divide: ['$total', limit]
						}
					},
					isEnd: {
						$cond: [
							{
								$lte: ['$total', limit * (offset + 1)]
							},
							true,
							false
						]
					},
					docs: {
						$slice: ['$docs', offset, limit]
					}
				}
			}
		]);

		return this._model.aggregate(aggregates).then(
			obj =>
				obj.length > 0
					? obj[0]
					: {
							total: 0,
							limit,
              offset,
              pages: 1,
              isEnd: true,
							docs: []
						}
		);
	}
	async commit() {
		return true;
	}
}

module.exports = MongoGenericRepository;
