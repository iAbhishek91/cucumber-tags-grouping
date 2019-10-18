# Cucumber Tag Grouping

A simple module helps to group BDD scenario based on a tags defined in feature file.

## Why it is required

Mostly we define multiple feature file and execute them in parallel. Cucumber execute feature file in parallel using the tag [--parallel](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#parallel-experimental)

Grouping scenario help them to execute scenarios in group in parallel. Lets say you need **cleanup some test data** or **make some database operation** or **any server config operation** between your parallel execution, then one can smartly group BDD scenarios based on tags.

## Install

```sh
npm install cucumber-tags-grouping --save
```

Those who use yarn

```sh
yarn add cucumber-tags-grouping --save
```

## How to use

In es5

```js
var cucumberTagGroups = require('cucumber-tags-grouping');

var scenarioGroups = cucumberTagGroups({
    featuresGlobPattern: 'features/**/*.feature,
    tagExpression: '@tagName',
    names: 'featureFileName,
    tagForGrouping: /GRP/,
});
```

In es6

```js
import cucumberTagGroups from 'scenarioGroups';

const scenarioGroups = cucumberTagGroups({
    featuresGlobPattern: 'features/**/*.feature,
    tagExpression: '@tagName',
    names: 'featureFileName,
    tagForGrouping: /GRP/,
});
```

### cucumberTagGroups param

* featuresGlobPattern:

Required.

This parameter is exactly same as [cucumber](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#running-specific-features). Use any valid [glob](https://github.com/isaacs/node-glob#glob) pattern.

* tagForGrouping

Required.

This is a regular expression. The regular expression that can match multiple tags and create groups out it. **Note**: *while using this module we need to tag all feature file with at least one grouping tag. Its suggested to use a default tags where none of the grouping tags are applicable.

**Example** of group tags

One may create tags as below. And assign every scenario or feature with at least one tag.
@GROUP_A
@GROUP_B
@GROUP_C
@GROUP_D
@GROUP_DEFAULT

Note: tags can be define tags for feature, scenario, scenario-outline and example keywords. Exactly same as cucumber.

* tagExpression

Optional. If not provided all the feature files will be considered for evaluation.

Tag expression parameter is also same as [cucumber](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#tags). Use any valid [cucumber-tag-expression](https://docs.cucumber.io/cucumber/api/#tag-expressions)

* name

Optional.

Same as [cucumber](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#running-specific-features) name parameter.

## Contacts

Please contact author of the module.

In case of any suggestion, change or fix please raise an [issue](https://github.com/iAbhishek91/cucumber-tags-grouping/issues) before raise a PR.
