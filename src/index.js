import getValidTestCases from './getValidTestCases';
import groupBuilder from './groupBuilder';


export default async (config) => {
  const {
    featuresGlobPattern,
    tagExpression,
    names,
    tagForGrouping,
  } = config;

  const filteredScenarios = await getValidTestCases(featuresGlobPattern, tagExpression, names);

  return groupBuilder(filteredScenarios, tagForGrouping);
};
