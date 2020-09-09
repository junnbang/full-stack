process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
var Item = require('../itemModel');
var {log} = require('../logger');

var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let {server} = require('../index');

chai.use(chaiHttp);

before(function(done, err) {
  this.timeout(30000);
  server.on("dbReady", function() {
    log("Test", "Start testing...");
    console.log();
    done();
  });

  server.on("dbFail", function() {
    log("Test", "Unable to connect to database.");
    log("Test", "Shutting down.")
    process.exit(0);
  });
});

describe('TEST for GET, POST, PUT, DELETE API Calls.', function () {
  beforeEach(function(done) {
    // empty database
    Item.deleteMany({}, (err) => { 
      done();     
    });
  });

  after(function(done) {
    // empty database
    Item.deleteMany({}, (err) => { 
      done();     
    });
  })
  
  // test cases
  describe('GET REQUEST /api/items', function () {
    it('It should return all items.', (done) => {
      chai.request(server)
          .get('/api/items')
          .end( (err, res) => {
            let items = res.body.data;

            res.should.have.status(200);
            items.should.be.a('array');
            items.length.should.be.eql(0);
            done();
          });
    });

  });

  describe('POST REQUEST /api/items', function() {
    const POST_URL = '/api/items';
    it('It should not be able to add an item without name.', (done) => {
      let itemWithoutName = {
        "quantity": 5,
        "price": 30
      }
      chai.request(server)
          .post(POST_URL)
          .send(itemWithoutName)
          .end( (err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('name');
            res.body.errors.name.should.have.property('kind').eql('required');
            done();
          });
      });
    
    it('It should be able to add an item with only required fields.', (done) => {
      let itemName = "PlayStation";
      let quantity = 5;
      let itemRequiredFields = {
        "name": itemName,
        "quantity": quantity
      }
      chai.request(server)
          .post(POST_URL)
          .send(itemRequiredFields)
          .end( (err, res) => {
            let item = res.body.data;
            res.should.have.status(200);

            item.should.be.a('object');
            item.should.have.property('name');
            item.should.have.property('quantity');
            assert.equal(item.name, itemName);
            assert.equal(item.quantity, quantity);
            done();
          })
    })
  });

  describe('PUT REQUEST /api/items/:id', function() {
    const PUT_URL = '/api/items/';
    it('It should be able to update an item given the id.', (done) => {
      let newItemName = "NEW_NAME"
      let item = new Item({name: 'OLD_NAME', quantity: 5});
      let updateToItem = new Item({name: newItemName});
      item.save( (err, data) => {
        let itemId = data._id;
        chai.request(server)
            .put(PUT_URL + itemId)
            .send(updateToItem)
            .end( (err, res) => {
              let updatedItem = res.body.data;

              res.should.have.status(200);
              updatedItem.should.have.property('name');
              assert.equal(updatedItem.name, newItemName);
              done();
            })
      })
    })
  });

  describe('DELETE REQUEST /api/items/:id', function() {
    const DELETE_URL = '/api/items/';
    it('It should be able to delete an item given the id.', (done) => {
      let itemName = 'Halibut Fish'
      let item = new Item({name: itemName, quantity: 5});
      item.save( (err, data) => {
        let itemId = data._id;
        chai.request(server)
            .delete(DELETE_URL + itemId)
            .end( (err, res) => {
              let result = res.body.data;
              res.should.have.status(200);
              result.should.have.property('ok').eql(1);
              result.should.have.property('n').eql(1);
              result.should.have.property('deletedCount').eql(1);
              done();
            })
      })
    })

    it('It should not delete anything given an incorrect id', (done) => {
      chai.request(server)
            .delete(DELETE_URL + 123456789)
            .end( (err, res) => {
              let result = res.body.data;
              res.should.have.status(200);

              result.should.have.property('ok').eql(1);
              result.should.have.property('n').eql(0);
              result.should.have.property('deletedCount').eql(0);
              done();
            })
    })
  });
});