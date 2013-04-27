module.exports = {
	mongo: {
		dbUrl: 'mongodb://cloudbees:d53240dd7a70deb1fffc5d604fe88a5c@alex.mongohq.com:10070/Qukz4vtg2E8drVTI28rjg'
	}
};

var SuperHero, hero, mongoose, schema, _;

mongoose = require("mongoose");

_ = require("underscore");

mongoose.connect(process.env.MONGOHQ_URL);

schema = mongoose.SuperHeroSchema({
  name: "string"
});

SuperHero = mongoose.model('SuperHero', SuperHeroSchema);

hero = new SuperHero({
  name: "Superman"
});

hero.save(function(err) {
  if (err) {
    return console.log("kryptonite");
  } else {
    return console.log("Up, up, and away!");
  }
});

SuperHero.find({}, function(err, documents) {
  return console.log(documents[0]);
});