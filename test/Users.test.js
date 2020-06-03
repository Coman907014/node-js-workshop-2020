const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = 'https://node-js-workshop.herokuapp.com';

chai.use(chaiHttp);

describe('Testing REST API deployed app', () => {

    before((done) => {
        
        chai.request(server)
        .get('/tasks')
        .end((err, res) => this.tasks = res.body.data)
        done();
        
    })
    it('Should get all tasks', (done) => {
        chai.request(server)
        .get('/tasks')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            done();
        })
    
    })
    it('Should create a new task', (done) => {
        const newTask = {
            description: 'Task created during test',
            completed: true
        }
        chai.request(server)
        .post('/tasks')
        .send(newTask)
        .end((err, res) => {
            res.body.data.should.have.property('description');
            res.body.data.should.have.property('completed');
            res.body.data.description.should.be.eql(newTask.description);
            res.body.data.completed.should.be.eql(newTask.completed);
            done()

        })
    })

    it(`Should delete the first task`, (done) => {
        chai.request(server)
        .delete('/tasks/'+ this.tasks[0]._id)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.eql(this.tasks[0]._id);
            done();
        })
    })
});