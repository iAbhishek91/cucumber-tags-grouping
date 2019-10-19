# Cucumber Tag Grouping

A simple module which helps to group BDD scenario based on tags defined in feature file. We call those tags as grouping tags.

## Why it is required

Mostly we define multiple feature file and execute them in parallel. Cucumber execute feature file in parallel using the CLI option [--parallel](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#parallel-experimental)

Grouping scenario help them to execute scenarios in group parallelly. Lets say you need to **cleanup some test data** or **make some database operation** or **any server config operation** between your parallel execution, then one can smartly group BDD scenarios based on tags.

Execute a group and then perform some operation desired and then jump to next group, then repeat.

## Install

```sh
npm install cucumber-tags-grouping --save
```

Those who use yarn

```sh
yarn add cucumber-tags-grouping --save
```

## How to use

Steps are listed below, alternatively one can look at [github boilerplate project](https://github.com/iAbhishek91/boilerblate-cucumber-tags-grouping) for quick start.

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

## How it works

As said cucumber-tags-grouping seats in between cucumber processing. When we execute cucumber there are certain stages or steps. Lets take help of an example to demonstrate.

Example:

Assume you are executing the below command

```sh
cucumber-js features/**/*.feature --require src/step-definition/**/*.js --tags "@red or @blue" --parallel 5
```

Stages(in high level):

1. Cucumber will determine all the feature files that are to be consumed in folder `features/**/*.feature`.
2. Then it will evaluate the tag-expression using cucumber-tag-expression. Cucumber will determine which scenario are in scope with tag `@red` or `@blue`.
3. Next, cucumber will spawn nodejs child process for executing the scenarios that are in scope in parallel.
4. Finally, cucumber will gather the result and send it to formatter to generate the report.

Cucumber-tags-grouping seats in between step-2 and step-3. It will perform step-1 and then step-2 based on the regular expression provided, then it will handover each groups to cucumber for processing. Cucumber will go through the above four step for each group separately.

## Contacts

Please contact author.

In case of any suggestion, change or fix please raise an [issue](https://github.com/iAbhishek91/cucumber-tags-grouping/issues) before raising a PR.
