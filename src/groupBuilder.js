/**
 * @description Extract all the tags from the valid scenarios
 * @param {Object} scenarios Object returned by getValidTestCases
 * @returns Array of array of all tags for all the valid scenarios
 */
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


/**
 * @description Build unique groups based on the grouping tags
 * @param {Array} scenariosTags 2D array returned by extractAllTags function
 * @param {RegularExpression} tagForGrouping Regular expression that can identify grouping tags
 * @return Array of unique groups based on grouping tags
 */
const buildUniqueGroups = (scenariosTags, tagForGrouping) => {
  // step-1: array of array of all the group-tags for each scenario
  const scenariosGroupTags = scenariosTags.map(
    (scenarioTags) => scenarioTags.filter((scenarioTag) => tagForGrouping.test(scenarioTag)),
  );

  // step-2: array of array of all unique group-tags for each scenario
  const scenariosUniqueTags = scenariosGroupTags.map((scenarioGroupTags) => [...new Set(scenarioGroupTags)]);

  // step-3: array of unique groups of grouping tags
  return [...new Set(scenariosUniqueTags.map((scenarioUniqueTags) => scenarioUniqueTags.join()))];
};


export default (scenarios, tagForGrouping) => {
  if (!Array.isArray(scenarios)) {
    throw new Error('Invalid data passed to group builder. Failed!');
  }

  const scenarioTags = extractAllTags(scenarios);
  return buildUniqueGroups(scenarioTags, tagForGrouping);
};
