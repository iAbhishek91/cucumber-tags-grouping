import { PickleFilter, getTestCasesFromFilesystem } from 'cucumber';
import glob from 'glob';
import path from 'path';
import EventEmitter from 'events';


const findFilesPath = async (featuresGlobPattern) => new Promise((resolve, reject) => {
  glob(featuresGlobPattern, (error, files) => {
    if (error) reject(error);
    resolve(files);
  });
});


/**
 * @description Evaluates all the valid feature file absolute path using Glob.
 * @return array of feature files absolute paths
 */
const getFeatureFilesPath = async (featuresGlobPattern) => {
  const featureFiles = await findFilesPath(featuresGlobPattern);

  return featureFiles.map((ffPath) => path.resolve(process.cwd(), ffPath));
};


/**
 * @description This function is consumed by cucumber internal for determining test-cases.
 * @return Pickle object
 */
const buildPickleObject = (featuresGlobPattern, tagExpression, names) => new PickleFilter({
  featurePaths: [featuresGlobPattern],
  tagExpression,
  names,
});


/**
 * @description Cucumber defined function
 *
 * @param {string} featuresGlobPattern any valid glob pattern
 * @param {string} tagExpression optional: valid cucumber tag expression
 * @param {string} names optional: name of the feature file
 *
 * @return {Object} BDD scenarios from feature file
 */
export default async (featuresGlobPattern, tagExpression, names) => {
  const eventBroadcaster = new EventEmitter();

  return getTestCasesFromFilesystem({
    cwd: process.cwd(),
    eventBroadcaster,
    featureDefaultLanguage: '',
    featurePaths: getFeatureFilesPath(featuresGlobPattern),
    order: 'defined',
    pickleFilter: buildPickleObject(featuresGlobPattern, tagExpression, names),
  });
};
