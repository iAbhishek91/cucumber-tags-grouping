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
          name: '@on',
          location: {
            line: 1,
            column: 9,
          },
        },
        {
          name: '@secondB',
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
          name: '@groupB',
          location: {
            line: 1,
            column: 1,
          },
        },
        {
          name: '@on',
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
const tagForGrouping = /SW_/;


// extract all tags from scenario
const extractAllTags = (testCases) => {
  try {
    return testCases.map((testCase) => {
      if (testCase.length === 0) return [];

      return testCase.pickle.tags.map((tag) => tag.name);
    });
  } catch (error) {
    throw new Error('Group Builder failed.');
  }
};


const extractAllGroups = () => {
  
}

const groups = (testCases, tagForGrouping) => {
  if (!Array.isArray(testCases)) {
    throw new Error('Invalid data passed to group builder. Failed!');
  }

  const allTags = extractAllTags(testCases);
  return extractAllGroups(allTags, tagForGrouping);
};

console.log(groups(data, tagForGrouping));
