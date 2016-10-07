const { chai, expect, request, server, commands } = require('./setup')


describe('API', () => {

  describe('/api/users', () => {

    describe('POST /user', () => {
      it('should create a user', () => {
        const userAttributes = {
          firstName: 'Mark',
          lastName: 'Zuckerburg',
          email: 'mark@zuckerburg.io',
          phoneNumber: '4151231234',
          address: 'Learners Guild, 9th Street, Oakland, CA',
          password: '123'
        }
        return request('post', '/user', userAttributes).then(response => {
          const user = response.body
          expect(response).to.have.status(200);
          expect(response).to.be.json; // jshint ignore:line
          expect(user).to.be.a('object')
          expect(user.id).to.be.a('number')
          expect(user.firstName).to.eql('Mark')
          expect(user.lastName).to.eql('Zuckerburg')
          expect(user.email).to.eql('mark@zuckerburg.io')
          expect(user.address).to.eql('Learners Guild, 9th Street, Oakland, CA')
          expect(user.password).to.eql('123')
          expect(user.phoneNumber).to.eql('4151231234')
        })
      })
    })

    context('when there are users in the database', () => {
      beforeEach(() => {
        return Promise.all([
          commands.createUser({
            id: 1455,
            firstName: 'Mark',
            lastName: 'Zuckerburg',
            email: 'mark@zuckerburg.io',
            phoneNumber: '4151231234',
            address: 'Learners Guild, 9th Street, Oakland, CA',
            password: '123'
          }),
          commands.createUser({
            id: 6672,
            firstName: 'Larry',
            lastName: 'Harvey',
            email: 'larry@harvey.to',
            phoneNumber: '8151231234',
            address: '9th Street, Oakland, CA',
            password: '456'
          })
        ])
      })

      describe('GET /api/users', () => {

        it('should render a json array of all users', () => {
          return request('get', '/user').then(response => {
            expect(response).to.have.status(200)
            expect(response).to.be.json
            expect(response.body).to.be.an('array')
            expect(response.body.length).to.equal(2)
            const users = response.body
            users.forEach(user => {
              if (user.id === 1455){
                expect(user).to.be.a('object')
                expect(user.id).to.eql(1455)
                expect(user.firstName).to.eql('Mark')
                expect(user.lastName).to.eql('Zuckerburg')
                expect(user.email).to.eql('mark@zuckerburg.io')
                expect(user.address).to.eql('Learners Guild, 9th Street, Oakland, CA')
                expect(user.password).to.eql('123')
                expect(user.phoneNumber).to.eql('4151231234')
              }else if (user.id === 6672){
                expect(user).to.be.a('object')
                expect(user.id).to.eql(6672)
                expect(user.firstName).to.eql('Larry')
                expect(user.lastName).to.eql('Harvey')
                expect(user.email).to.eql('larry@harvey.to')
                expect(user.address).to.eql('9th Street, Oakland, CA')
                expect(user.password).to.eql('456')
                expect(user.phoneNumber).to.eql('8151231234')
              }else{
                throw new Error('unexpected user record')
              }
            })
          })
        })

      })

      describe('GET /user/:id', () => {
        context('when requesting a user that exists', () => {
          it('should render that user as json', () => {
            return request('get','/user/6672').then(response => {
              const user = response.body
              expect(response).to.have.status(200);
              expect(response).to.be.json
              expect(user).to.be.an('object');
              expect(user.id).to.eql(6672)
              expect(user.firstName).to.eql('Larry')
              expect(user.lastName).to.eql('Harvey')
              expect(user.email).to.eql('larry@harvey.to')
              expect(user.address).to.eql('9th Street, Oakland, CA')
              expect(user.password).to.eql('456')
              expect(user.phoneNumber).to.eql('8151231234')
            })
          })
        })
        context('when requesting a user that doesnt exist', () => {
          it('should render nothing status 404', () => {
            return request('get','/user/55').then(response => {
              expect(response).to.have.status(404);
              expect(response).to.be.json
              expect(response.body).to.eql(null)
            })
          })
        })
      })

    }) // dummy data users
  })

  describe('/services', () => {

    context('when there are services in the database', () => {
      beforeEach( () => {
        return Promise.all([
          commands.createService({
            id: 15,
            title: 'Android Screens',
            logoUrl: 'https://avatars0.githubusercontent.com/u/7544733?v=3&s=466',
            description: 'fix androids'
          }),
          commands.createService({
            id: 366,
            title: 'Mac Screens',
            logoUrl: 'https://avatars0.githubusercontent.com/u/7544733?v=3&s=466',
            description: 'fix apples'
          })
        ])
      })

      describe('GET /services', () => {
        it('should render a json array of all services', () => {
          return request('get', '/services').then(response => {
            const services = response.body
            expect(services).to.be.an('array')
            expect(services.length).to.eql(2)
            services.forEach(service => {
              if (service.id === 15){
                expect(service).to.be.a('object')
                expect(service.id).to.eql(15)
                expect(service.title).to.eql('Android Screens')
                expect(service.logoUrl).to.eql('https://avatars0.githubusercontent.com/u/7544733?v=3&s=466')
                expect(service.description).to.eql('fix androids')
              }
              else if (service.id === 366){
                expect(service).to.be.a('object')
                expect(service.id).to.eql(366)
                expect(service.title).to.eql('Mac Screens')
                expect(service.logoUrl).to.eql('https://avatars0.githubusercontent.com/u/7544733?v=3&s=466')
                expect(service.description).to.eql('fix apples')
              }
            })
          })
        })

      })

    context('when there are agents in the database', () => {
    beforeEach( () => {
      return Promise.all([
        commands.createAgent({
          id: 16,
          firstName: 'Mike',
          lastName: 'Abelson',
          phoneNumber: '4157077256',
          email: 'mikeadelson@yahoo.com',
          imageUrl: 'http://vignette2.wikia.nocookie.net/spongebob/images/3/33/Patrick_Star.svg/revision/latest?cb=20100724183918',
          password: '777'
        },
          [
            {
               "day": "tuesday",
               "hours": [{
                  "end": "11:00",
                  "start": "04:00"
               }]
            },
            {
               "day": "thursday",
               "hours": [{
                  "end": "18:00",
                  "start": "06:00"
               }]
            }
          ],
          [1 ,2]
        ),
        commands.createAgent({
          id: 15,
          firstName: 'Majid',
          lastName: 'Rahimi',
          phoneNumber: '4152655659',
          email: 'majid88rahimi@gmail.com',
          imageUrl: 'https://avatars0.githubusercontent.com/u/7544733?v=3&s=466',
          password: '333'
          },
          [
            {
               "day": "monday",
               "hours": [{
                  "end": "17:00",
                  "start": "11:00"
               }]
            },
            {
               "day": "friday",
               "hours": [{
                  "end": "20:00",
                  "start": "08:00"
               }]
            }
          ],
          [366, 15]
        )
      ])
    })
  
      describe('GET /freeSlots/:serviceId', () => {
        it('should render a json array of all freeSlots', () => {
          return request('get', '/freeSlots/366').then(response => {
            const freeSlots = response.body
            expect(freeSlots).to.be.a('object')
            expect(freeSlots.monday).to.be.a('array')
            console.log("freeSlots+++++ ", freeSlots )

          })
        })

      })

    }) // dummy data agents
    }) // dummy data services

  })

})
