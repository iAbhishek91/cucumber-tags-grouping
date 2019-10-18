import getValidTestCases from './getValidTestCases';

const a = async () => {
  console.log(JSON.stringify(await getValidTestCases('features/**/*.feature'), undefined, ' '));
};

a();
