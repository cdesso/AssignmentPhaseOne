var assert = require('assert');
var app = require('../server.js');
var http = require('http')

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);


describe('Server testing', function() {
    //Login Testing
    groups = [];
    before(()=>{
        chai.request(app)
            .get('/getDB')
            .end((err, res) => {
                groups.push(res.body);
                console.log(groups)
            });
        chai.request(app)
            .post('/clearDB')
            .send().end((err, res) => {})

        
        
    });
    after(()=>{
        // console.log("Hello", groups)
        // chai.request(app)
        //     .post('/restoreDB').send(groups)
        //     .end((err, res) => {
        //     });
    })
    describe('/api/auth', () => {
        it('it should return an array of the user details', (done) => {
            chai.request(app)
                .post('/api/auth').send({
                    'username': 'super',
                    'password': 'admin'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe('/api/auth', () => {
        it('it should not return anything', (done) => {
            chai.request(app)
                .post('/api/auth').send({
                    'username': 'invalid',
                    'password': 'account'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql({});
                    done();
                });
        });
    });

    //addGroup route testing
    describe('/addGroup', () => {
        it('it should return true', (done) => {
            chai.request(app)
                .post('/addGroup').send(['super'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(true);
                    done();
                });
        });
    });

    //renameGroup route testing
    describe('/renameGroup', () => {
        it('it should return an array', (done) => {
            chai.request(app)
                .post('/renameGroup').send(['Group1', 'Main'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql([true, 'Main']);
                    done();
                });
        });
    });
    describe('/renameGroup', () => {
        it('it should return false', (done) => {
            chai.request(app)
                .post('/renameGroup').send(['Main', 'grp'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(false);
                    done();
                });
        });
    });

    //addChannel route testing
    describe('/addChannel', () => {
        it('it should return true', (done) => {
            chai.request(app)
                .post('/addChannel').send(['Main'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(true);
                    done();
                });
        });
    });

    //Find groups in database testing
    describe('/findGroups', () => {
        
        it('it should return an array', (done) => {
            chai.request(app)
                .post('/findGroups').send([
                    'super',
                    'SA'
                ])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    done();
                });
        });
    });

    //Find Channels in database testing
    describe('/findChannels', () => {
        it('it should return an array', (done) => {
            chai.request(app)
                .post('/findChannels').send([
                    'bobby1',
                    'Main',
                    'U'
                ])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    done();
                });
        });
    });
    describe('/findChannels', () => {
        it('it should return an empty array', (done) => {
            chai.request(app)
                .post('/findChannels').send([
                    'bobby1',
                    'Fake Group',
                    'U'
                ])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql([])
                    done();
                });
        });
    });

    //findInvite route testing
    describe('/findInvite', () => {
        it('it should return an array', (done) => {
            chai.request(app)
                .post('/findInvite').send(['Main'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    //findChannelInvite route testing
    describe('/findChannelInvite', () => {
        it('it should return an array', (done) => {
            chai.request(app)
                .post('/findChannelInvite').send(['Main', 'General'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    //sendGroupInvite route testing
    describe('/sendGroupInvite', () => {
        it('it should return true', (done) => {
            chai.request(app)
                .post('/sendGroupInvite').send(['newUser', 'Main'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(true);
                    done();
                });
        });
    });

    //deleteFromGroup route testing
    describe('/deleteFromGroup', () => {
        it('it should return an array', (done) => {
            chai.request(app)
                .post('/deleteFromGroup').send(['Main', 'super'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    //sendDeleteFromGroup route testing
    describe('/sendDeleteFromGroup', () => {
        it('it should return true', (done) => {
            chai.request(app)
                .post('/sendDeleteFromGroup').send(['newUser', 'Main'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(true);
                    done();
                });
        });
    });

    //sendChannelInvite route testing
    describe('/sendChannelInvite', () => {
        it('it should return true', (done) => {
            chai.request(app)
                .post('/sendChannelInvite').send(['newUser', 'Main', 'General'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(true);
                    done();
                });
        });
    });

    //deleteFromChannel route testing
    describe('/deleteFromChannel', () => {
        it('it should return an Array', (done) => {
            chai.request(app)
                .post('/deleteFromChannel').send(['General', 'Main', 'super'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    //sendDeleteFromChannel route testing
    describe('/sendDeleteFromChannel', () => {
        it('it should return true', (done) => {
            chai.request(app)
                .post('/sendDeleteFromChannel').send(['General', 'Main', 'newUser'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(true);
                    done();
                });
        });
    });

    //Adding users testing
    describe('/addUser', () => {
        it('it should return username length error', (done) => {
            chai.request(app)
                .post('/addUser').send({
                    'NewUsername': '1',
                    'NewEmail': 'example@mail.com',
                    'NewPassword': 'abc123',
                    'NewPassword2': 'abc123',
                    'NewRole': 'U'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.eql('uNameLength')
                    done();
                });
        });
    });
    describe('/addUser', () => {
        it('it should return email length error', (done) => {
            chai.request(app)
                .post('/addUser').send({
                    'NewUsername': 'NewUser',
                    'NewEmail': 'mail',
                    'NewPassword': 'abc123',
                    'NewPassword2': 'abc123',
                    'NewRole': 'U'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.eql('emailLength')
                    done();
                });
        });
    });
    describe('/addUser', () => {
        it('it should return password match error', (done) => {
            chai.request(app)
                .post('/addUser').send({
                    'NewUsername': 'NewUser',
                    'NewEmail': 'example@mail.com',
                    'NewPassword': 'abc123',
                    'NewPassword2': 'abc1234',
                    'NewRole': 'U'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.eql('password')
                    done();
                });
        });
    });
    describe('/addUser', () => {
        it('it should return password length error', (done) => {
            chai.request(app)
                .post('/addUser').send({
                    'NewUsername': 'NewUser',
                    'NewEmail': 'example@mail.com',
                    'NewPassword': 'abc',
                    'NewPassword2': 'abc',
                    'NewRole': 'U'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.eql('passwordLength')
                    done();
                });
        });
    });
    describe('/addUser', () => {
        it('it should return username exist error', (done) => {
            chai.request(app)
                .post('/addUser').send({
                    'NewUsername': 'super',
                    'NewEmail': 'example@mail.com',
                    'NewPassword': 'abc123',
                    'NewPassword2': 'abc123',
                    'NewRole': 'U'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.eql('username')
                    done();
                });
        });
    });
    describe('/addUser', () => {
        it('it should not return any errors (successful db insertion)', (done) => {
            chai.request(app)
                .post('/addUser').send({
                    'NewUsername': 'newUser',
                    'NewEmail': 'example@mail.com',
                    'NewPassword': 'abc123',
                    'NewPassword2': 'abc123',
                    'NewRole': 'U'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.error.should.be.eql(false);
                    done();
                });
        });
    });

    //deleteChannel route testing
    describe('/deleteChannel', () => {
        it('it should return true', (done) => {
            chai.request(app)
                .post('/deleteChannel').send(['Main', 'Channel2'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(true);
                    done();
                });
        });
    });

    //deleteGroup route testing
    describe('/deleteGroup', () => {
        it('it should return true', (done) => {
            chai.request(app)
                .post('/deleteGroup').send(['Main'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(true);
                    done();
                });
        });
    });

    //findUsers route testing
    describe('/findUsers', () => {
        it('it should return an array', (done) => {
            chai.request(app)
                .post('/findUsers').send()
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    //upgradeUser route testing
    describe('/upgradeUser', () => {
        it('it should return true', (done) => {
            chai.request(app)
                .post('/upgradeUser').send(['newUser'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(true);
                    done();
                });
        });
    });

    //delUser route testing
    describe('/delUser', () => {
        it('it should return true', (done) => {
            chai.request(app)
                .post('/delUser').send(['newUser'])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(true);
                    done();
                });
        });
    });
});