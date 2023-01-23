import { UserModel, ProgramModel, dbClose } from './db.js'

await UserModel.deleteMany()

const seedUsers = [
    { username: "Steve_1000", email: "s@email.com", password: "password" },
    { username: "Oli_2000", email: "o@email.com", password: "password2" },
    { username: "TEST", email: "TEST", password: "TEST" },
    { username: "Kane_3000", email: "k@email.com", password: "password3" }
]

const users = await UserModel.insertMany(seedUsers)
console.log('Inserted Seed Users')


await ProgramModel.deleteMany()

const seedPrograms = [
    {
    name: "Knee Strength Rebuild", 
    exercises: [
        {name: "Calf Raise", image: 'Link', info: "3 x 30 reps"},
        {name: "Alternating Lunges", image: 'Link', info: "4 x 25 reps, alternating"},
        {name: "Air Squat", image: 'Link', info: "5 x 30 reps"}
      ], 
    metrics: {
        date: "21/11/22", 
        diff: 5.6, 
        pain: 8.3, 
        complete: 0.67
    },
    userID: users[0]._id.valueOf()
    }, 
    {
    name: "Cardio", 
    exercises: [
        {name: "Treadmill Jog", image: 'Link', info: "5 minutes, 10km/h, 1.5 incline"},
        {name: "Burpees", image: 'Link', info: "2 x 20 reps"},
        {name: "Mountain Climbers", image: 'Link', info: "4 x 20 reps"}
    ], 
    metrics: [
        {date: "14/01/23", diff: 7.4, pain: 1.5, complete: 1},
        {date: "17/01/23", diff: 6.5, pain: 1.2, complete: 1},
        {date: "20/01/23", diff: 5.3, pain: 1, complete: 1}
    ], 
    userID: users[0]._id.valueOf() 
    },
    {
    name: "Back Day", 
    exercises: [
        {name: "Deadlift", image: "Link", info: "4 x 10 reps, 50kg"},
        {name: "Planks", image: "Link", info: "4 x 45 seconds"},
        {name: "Pull-ups", image: "Link", info: "3 x 10 reps"}
    ], 
    metrics: [
        {date: "15/01/23", diff: 4.1, pain: 9.5, complete: 0.67},
        {date: "16/01/23", diff: 4.2, pain: 8, complete: 0.67},
        {date: "22/01/23", diff: 3.9, pain: 8.5, complete: 1},
        {date: "23/01/23", diff: 3.7, pain: 7.6, complete: 1}
    ],
    userID: users[1]._id.valueOf() 
    },
    {
    name: "Chest", 
    exercises: [
        {name: "Bench Press", image: "Link", info: "4 x 10 reps, 50kg"},
        {name: "Push-Ups", image: "Link", info: "5 x 15 reps"},
        {name: "Dumbbell Fly", image: "Link", info: "4 x 10 reps, 10kg each hand"}
    ], 
    metrics: [
        {date: "17/01/23", diff: 7.1, pain: 2.6, complete: 1},
        {date: "19/01/23", diff: 8.2, pain: 6.5, complete: 0.67}
    ], 
    userID: users[1]._id.valueOf() 
    },
    {
    name: "Office Strength", 
    exercises: [
        {name: "Sit-ups", image: "Link", info: "8 x 20 reps"},
        {name: "Wall Sit", image: "Link", info: "4 x 2 minute intervals, 30 second rest"},
        {name: "Lunges", image: "Link", info: "3 x 30 reps"}
    ], 
    metrics: [
        {date: "14/01/23", diff: 6.1, pain: 1.5, complete: 0.67},
        {date: "17/01/23", diff: 5.4, pain: 1.5, complete: 0.67},
        {date: "18/01/23", diff: 5.0, pain: 1.0, complete: 1},
        {date: "19/01/23", diff: 4.3, pain: 0.5, complete: 1},
        {date: "21/01/23", diff: 3.1, pain: 0.5, complete: 1}
    ], 
    userID: users[2]._id.valueOf() 
    },
    {
    name: "Legs", 
    exercises: [
        {name: "Pistol Squats", image: "Link", info: "3 x 10 reps"},
        {name: "Wall Sit", image: "Link", info: "4 x 2 minute intervals, 30 second rest"},
        {name: "Lunges", image: "Link", info: "3 x 35 reps"}
    ], 
    metrics: [
        {date: "15/01/23", diff: 8.6, pain: 1.5, complete: 0.67},
        {date: "19/01/23", diff: 8.3, pain: 1.5, complete: 0.67},
        {date: "21/01/23", diff: 5.0, pain: 1.0, complete: 1}
    ],
    userID: users[2]._id.valueOf() 
    }
]



const programs = await ProgramModel.insertMany(seedPrograms)
console.log('Inserted Seed Programs')

dbClose()
