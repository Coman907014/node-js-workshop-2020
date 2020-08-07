const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = `https://node-js-workshop-iunie2020.herokuapp.com`;

chai.use(chaiHttp);

describe('Testing REST API deployed app', () => {
    before(done => {
        chai.request(server)
        .get('/tasks')
        .end((err, res) => this.tasks = res.body.data);
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
    });

    it('Should create a new task', (done) => {
        const newTask = {
            description: 'New task created in test',
            completed: false
        };

        chai.request(server)
        .post('/tasks')
        .send(newTask)
        .end((err, res) => {
            res.should.have.status(200);
            const responseBody = res.body.data;
            responseBody.description.should.be.eql(newTask.description);
            responseBody.completed.should.be.eql(newTask.completed);
            done();
        })
    });

    it('Should delete a new task', (done) => {
        chai.request(server)
        .delete('/tasks/' + this.tasks[0]._id)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.eql(this.tasks[0]._id);
            done();
        })
    });

    it('Should update task number 2', (done) => {
        const updatedTask = {
            description: 'First Updated Task',
            completed: true,
        };
        chai.request(server)
        .patch('/tasks/' + this.tasks[1]._id)
        .send(updatedTask)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.data.description.should.be.eql(updatedTask.description);
            res.body.data.completed.should.be.eql(updatedTask.completed);
            done()
        })
    });

    it('Should return 404', (done) => {
        const updatedTask = {
            description: 'qqqqqqqqqqqqqqqqqqqqqqqq',
            extraField: 'Extra field',
            completed: true,
        };
        chai.request(server)
        .patch('/tasks' + this.tasks[1]._id)
        .send(updatedTask)
        .end((err, res) => {
            res.should.have.status(404);
            console.log(res.body)
            res.body.error.should.be.eql('Not found!');
            // res.body.data.completed.should.be.eql(updatedTask.completed);
            done()
        })
    });

    it('Should return 400, task not found', (done) => {
        chai.request(server)
        .get('/tasks/' + '5ed7b82a2ece9a0017d08b0')
        .end((err, res) => {
            res.should.have.status(400);
            done()
        })
    });


})