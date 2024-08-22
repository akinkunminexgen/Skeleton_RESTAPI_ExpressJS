//connect database
const conn = require('./db')


class ModelQuery {
    constructor(name) {
      this.name = name;
    }
  
    speak() {
      console.log(`${this.name} makes a sound.`);
    }

  // Helper method to wrap query in a promise
  queryAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
      conn.query(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  // Get all records
   getAll = async () => {
        try {
                const sql = `SELECT * FROM ${this.name}`;
                const result = await this.queryAsync(sql);
                return result;
            } catch (error) {
                throw error; // Re-throw the error to be handled by the caller
            }
        }

    getById = async (id) => {
        var sql = `SELECT * FROM ${this.name} WHERE id = ?`
        const result = await this.queryAsync(sql, [id]);
        if (result.length === 0) {
            return '404'; //the server cannot find the requested resource
        } else {
            return result; 
        }
      };

    createEntity = async (name) => {
        try {
            const sql = `INSERT INTO ${this.name} (name) VALUES (?)`;
            const result = await this.queryAsync(sql, [name]);
            return result.insertId; // Return the ID of the newly created record
          } catch (error) {
            throw error;
          }
        }
    
      
    updateEntity = async (id, name) => {
        try {
            const sql = `UPDATE ${this.name} SET name = ? WHERE id = ?`;
            const result = await this.queryAsync(sql, [name, id]);
            if (result.affectedRows === 0) {
              return '404'; // the server cannot find the requested resource
            }
            return result;
          } catch (error) {
            throw error;
          }
      };
      
    deleteEntity = async (id) => {
        try {
            const sql = `DELETE FROM ${this.name} WHERE id = ?`;
            const result = await this.queryAsync(sql, [id]);
            if (result.affectedRows === 0) {
              return '404'; //the server cannot find the requested resource
            }
            return result;
          } catch (error) {
            throw error;
          }
      };
  }
  
module.exports = ModelQuery;
  