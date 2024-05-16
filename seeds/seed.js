const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Define Mongoose models for User, Thought, and Reaction
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

// Seed data
const users = [
  {
    username: 'user1',
    email: 'user1@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'user3',
    email: 'user3@example.com',
    thoughts: [],
    friends: [],
  },
];

const thoughts = [
  {
    thoughtText: 'This is a thought by user1.',
    username: 'user1',
  },
  {
    thoughtText: 'Thought by user2.',
    username: 'user2',
  },
  {
    thoughtText: "User3's thought.",
    username: 'user3',
  },
];

// Insert seed data
async function seedDatabase() {
  try {
    // Create users
    const createdUsers = await User.create(users);

    // Create thoughts and update user thoughts array
    const createdThoughts = await Thought.create(thoughts);
    for (const thought of createdThoughts) {
      const user = createdUsers.find(
        (user) => user.username === thought.username
      );
      user.thoughts.push(thought._id);
      await user.save();
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Run seeder function
seedDatabase();
