const ModelQuery = require('../class/model');

class User extends ModelQuery {
    constructor(name) {
        super(name);
    }
}

module.exports = User;