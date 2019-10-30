import groupBuilder from '.';

async function test() {
  const scenarioGroups = await groupBuilder({
    featuresGlobPattern: 'features/**/*.feature', // required
    tagForGrouping: /GROUP/, // required
    tagExpression: undefined, // optional
    name: undefined, // optional
  });

  // eslint-disable-next-line no-console
  console.log(scenarioGroups);
}

test();
