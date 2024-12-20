import dotenv from 'dotenv';

dotenv.config({
  path: './.env.test',
});

module.exports = async () => {
  try {
    console.log('inside globalSetup...')
    // console.dir(process.env, { depth: null })
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};