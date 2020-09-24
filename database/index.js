const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useMongoClient: true});


let repoSchema = mongoose.Schema({
  repoID: Number,
  repoName: String,
  owner: {login: String, id: Number},
  repoDesc: String,
  repoUrl: String,
  forkCount: Number
});