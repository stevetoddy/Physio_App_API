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
    {name: "Knee Strength Rebuild", 
    exercises: [
        {name: "Calf Raise", image: 'Link', info: "3 x 30 reps"},
        {name: "Alternating Lunges", image: 'Link', info: "4 x 25 reps, alternating"},
        {name: "Air Squat", image: 'Link', info: "5 x 30 reps"}
      ], 
    metrics: {
        date: Date, 
        diff: 5.6, 
        pain: 8.3, 
        complete: 0.67
    }}

    //   {name: "Cardio", exercises: [
    //     {name: "Treadmill Jog", image: *link*, info: "5 minutes, 10km/h, 1.5 incline"},
    //     {name: "Burpees", image: *link*, info: "2 x 20 reps"},
    //     {name: "Mountain Climbers", image: *link*, info: "4 x 20 reps"}
    //   ], entries: [
    //     {date: "14/01/23", difficulty: 7.4, pain: 1.5, completion: 1},
    //     {date: "17/01/23", difficulty: 6.5, pain: 1.2, completion: 1},
    //     {date: "20/01/23", difficulty: 5.3, pain: 1, completion: 1}
    //     ], 
    //   userID: 2 }
]



const programs = await ProgramModel.insertMany(seedPrograms)
console.log('Inserted Seed Programs')

dbClose()



// 8 x Programs

    // 1s. (1)
    //   {name: "Knee Strength Rebuild", exercises: [
    //     {name: "Calf Raise", image: *link*, info: "3 x 30 reps"},
    //     {name: "Alternating Lunges", image: *link*, info: "4 x 25 reps, alternating"},
    //     {name: "Air Squat", image: *link*, info: "5 x 30 reps"}
    //   ], entries: 
    //     {date: "23/01/23", difficulty: 5.6, pain: 8.3, completion: 0.67},
    //     userId: 1}

    //   {name: "Cardio", exercises: [
    //     {name: "Treadmill Jog", image: *link*, info: "5 minutes, 10km/h, 1.5 incline"},
    //     {name: "Burpees", image: *link*, info: "2 x 20 reps"},
    //     {name: "Mountain Climbers", image: *link*, info: "4 x 20 reps"}
    //   ], entries: [
    //     {date: "14/01/23", difficulty: 7.4, pain: 1.5, completion: 1},
    //     {date: "17/01/23", difficulty: 6.5, pain: 1.2, completion: 1},
    //     {date: "20/01/23", difficulty: 5.3, pain: 1, completion: 1}
    //     ], 
    //   userID: 2 }

    // 3k. (4)
      // {name: "Back Day", exercises: [
        // {name: "Deadlift", image: *link*, info: "4 x 10 reps, 50kg"},
        // {name: "Planks", image: *link*, info: "4 x 45 seconds"},
        // {name: "Pull-ups", image: *link*, info: "3 x 10 reps"}
      // ], entries: [
        // {date: "15/01/23", difficulty: 4.1, pain: 9.5, completion: 0.67},
        // {date: "16/01/23", difficulty: 4.2, pain: 8, completion: 0.67},
        // {date: "22/01/23", difficulty: 3.9, pain: 8.5, completion: 1},
        // {date: "23/01/23", difficulty: 3.7, pain: 7.6, completion: 1}
      // ],
    //  userID: 2 }

    // 4k. (2)
      // {name: "Chest", exercises: [
        // {name: "Bench Press", image: *link*, info: "4 x 10 reps, 50kg"},
        // {name: "Push-Ups", image: *link*, info: "5 x 15 reps"},
        // {name: "Dumbbell Fly", image: *link*, info: "4 x 10 reps, 10kg each hand"}
      // ], entries: [
        // {date: "17/01/23", difficulty: 7.1, pain: 2.6, completion: 1},
        // {date: "19/01/23", difficulty: 8.2, pain: 6.5, completion: 0.67}
      // ], 
    // userID: 2 }

    // 5s. (5)
      // {name: "Office Strength", exercises: [
        // {name: "Sit-ups", image: *link*, info: "8 x 20 reps"},
        // {name: "Wall Sit", image: *link*, info: "4 x 2 minute intervals, 30 second rest"},
        // {name: "Lunges", image: *link*, info: "3 x 30 reps"}
      // ], entries: [
        // {date: "14/01/23", difficulty: 6.1, pain: 1.5, completion: 0.67},
        // {date: "17/01/23", difficulty: 5.4, pain: 1.5, completion: 0.67},
        // {date: "18/01/23", difficulty: 5.0, pain: 1.0, completion: 1},
        // {date: "19/01/23", difficulty: 4.3, pain: 0.5, completion: 1},
        // {date: "21/01/23", difficulty: 3.1, pain: 0.5, completion: 1}
      // ], 
    // userID: 1}

    // 6k. (3)
      // {name: "Legs", exercises: [
        // {name: "Pistol Squats", image: *link*, info: "3 x 10 reps"},
        // {name: "Wall Sit", image: *link*, info: "4 x 2 minute intervals, 30 second rest"},
        // {name: "Lunges", image: *link*, info: "3 x 35 reps"}
      // ], entries: 
        // {date: "15/01/23", difficulty: 8.6, pain: 1.5, completion: 0.67},
        // {date: "19/01/23", difficulty: 8.3, pain: 1.5, completion: 0.67},
        // {date: "21/01/23", difficulty: 5.0, pain: 1.0, completion: 1}
      // ],
    //  userID: 2 } 