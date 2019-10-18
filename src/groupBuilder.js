const data = [
  {
    pickle: {
      tags: [
        {
          name: '@groupB',
          location: {
            line: 1,
            column: 1,
          },
        },
        {
          name: '@SW_ABC_ON',
          location: {
            line: 1,
            column: 9,
          },
        },
        {
          name: '@SW_ABC_ON',
          location: {
            line: 13,
            column: 3,
          },
        },
      ],
      name: 'First scenario related to groupB',
      language: 'en',
      locations: [Array],
      steps: [Array],
    },
    uri: 'features/groupB.feature',
  },
  {
    pickle: {
      tags: [
        {
          name: '@SW_ABC_ON',
          location: {
            line: 1,
            column: 1,
          },
        },
        {
          name: '@SW_ABC_ON',
          location: {
            line: 1,
            column: 9,
          },
        },
        {
          name: '@firstB',
          location: {
            line: 13,
            column: 3,
          },
        },
      ],
      name: 'Second scenario related to groupB',
      language: 'en',
      locations: [Array],
      steps: [Array],
    },
    uri: 'features/groupB.feature',
  },
  {
    pickle: {
      tags: [],
      name: 'Second scenario related to groupB',
      language: 'en',
      locations: [Array],
      steps: [Array],
    },
    uri: 'features/groupB.feature',
  },
];
const data1 = /SW_/;


// extract all tags from scenario
const extractAllTags = (scenarios) => {
  try {
    return scenarios.map((scenario) => {
      if (scenario.length === 0) return [];

      return scenario.pickle.tags.map((tag) => tag.name);
    });
  } catch (error) {
    throw new Error('Group Builder failed.');
  }
};


const buildUniqueGroups = (scenariosTags, tagForGrouping) => {
  // array of array of all the group-tags for each scenario
  const scenariosGroupTags = scenariosTags.map(
    (scenarioTags) => scenarioTags.filter((scenarioTag) => tagForGrouping.test(scenarioTag)),
  );

  const scenariosUniqueTags = scenariosGroupTags.map((scenarioGroupTags) => [...new Set(scenarioGroupTags)]);
  return [...new Set(scenariosUniqueTags.map((scenarioUniqueTags) => scenarioUniqueTags.join()))];
};


export default (scenarios, tagForGrouping) => {
  if (!Array.isArray(scenarios)) {
    throw new Error('Invalid data passed to group builder. Failed!');
  }

  const scenarioTags = extractAllTags(scenarios);
  return buildUniqueGroups(scenarioTags, tagForGrouping);
};
