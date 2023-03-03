db = db.getSiblingDB("dockernode");
db.createCollection("users");
db.users.insert({
  username: "inituser",
  password: "inituser",
  fullName: "Initial User",
  role: "admin",
});
