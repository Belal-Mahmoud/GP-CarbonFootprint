const Data = require('../models/dataModel');
const factory = require('./handlerFactory');

// Create New Data.
exports.createData = factory.createOne(Data);

// Get ALL Data.
exports.getAllDatas = factory.getAll(Data);

// Get A Specific Data.
exports.getData = factory.getOne(Data);

// Create New Data.
exports.updateData = factory.updateOne(Data);

// Delete Exist Data.
exports.deleteData = factory.deleteOne(Data);
