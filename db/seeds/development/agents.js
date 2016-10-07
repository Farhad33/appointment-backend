const { commands } = require('../../../build/server/database')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('agents').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        commands.createAgent({
          firstName: 'Yaseen',
          lastName: 'Hussain',
          phoneNumber: '5109442727',
          email: 'Yaseen.uc@gmail.com',
          imageUrl: 'https://avatars2.githubusercontent.com/u/17223371?v=3&s=400',
          password: '123'
          },
          [
            {
               "day": "sunday",
               "hours": [{
                  "end": "22:00",
                  "start": "08:00"
               }]
            },
            {
               "day": "saturday",
               "hours": [{
                  "end": "22:00",
                  "start": "08:00"
               }]
            }
          ],
          [1, 2]
        ),

        commands.createAgent({
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
          [3,4,5]
        ),

        commands.createAgent({
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
                  "start": "4:00"
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
          [6,7,8]
        ),
      
    ]) // closes out line 6
  }) //closes out line 5
} // closes out line 2