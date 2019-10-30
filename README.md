# Cucumber Tag Grouping

A simple module which helps to group BDD scenario based on special tags defined in feature file. We call those tags as grouping tags.

## Why it is required

Mostly we define multiple feature file and execute them in parallel. Cucumber execute feature files in parallel using the CLI option [--parallel](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#parallel-experimental). All the feature files are executed in parallel which matches `--tags`, `feature-folder`. This module helps to gain control over the parallel run.

Grouping scenarios based on tags (special grouping tags) and execute scenarios based a group, parallelly. All the scenarios of first group are executed in parallel, once it's completed, we can continues with second group.

Lets say you need to **cleanup some test data** or **make some database operation** or **any server config operation** between your parallel execution, then one can smartly group BDD scenarios based on tags.

Simple workflow:
Execute a group and then perform some operation and then jump to next group, then repeat.

## Install

```sh
npm install cucumber-tags-grouping --save
```

Those who use yarn

```sh
yarn add cucumber-tags-grouping
```

## How to use

Four simple steps:

1; First and foremost, decide a pattern for **grouping tags**. Below are few example.

  > NOTE: Grouping tags should follow a specific pattern which can be identified by a regular expression.

- Regular expression: /GROUP/ | tags example: @GROUP_A or @GROUP_B or @GROUP_RED or @GROUP_ALL.
- Regular expression: /GRP/ | tags example: @GRP_USER_TYPE_A or @GRP_USER_TYPE_B or @GRP_USER_TYPE_DEFAULT.
- Regular expression: /ENV/ | tags example: @ENV_DB_A or @ENV_DB_B or @ENV_DB_C.

2; Assign at least one grouping tag to each scenario or feature file or example. Rules for assigning tags are exactly same as cucumber-js.

3; Import the module and use the below code to generate the groups. It will return with array of string. Each string is a [cucumber-tag-expression](https://docs.cucumber.io/cucumber/api/#tag-expressions) and is uniquely groups the scenario.

```js
import cucumberTagGroups from 'cucumber-tags-grouping';

async function test() {
  const scenarioGroups = await cucumberTagGroups({
    featuresGlobPattern: 'features/**/*.feature', // required
    tagForGrouping: /GROUP/, // required
    tagExpression: undefined, // optional
    name: undefined, // optional
  });

  console.log(scenarioGroups);
}

test();
// Feature files and step definitions referred:
// https://github.com/iAbhishek91/cucumber-tags-grouping/tree/master/features
// output [ '@GROUP_A_ON and @GROUP_B_OFF and @GROUP_C_ON', '@GROUP_A_ON and @GROUP_B_ON and @GROUP_C_OFF', '@GROUP_ALL' ]
// Each element in the array are valid tag expression
```

Refer: example code in [github](https://github.com/iAbhishek91/cucumber-tags-grouping/tree/master/src/test.js). To execute the **test.js** just clone the project and execute the below commands.

- `yarn build` or `npm run build`
- `node dist/test.js`

4; Utilize these tags to invoke cucumber. Very important to keep in mind that all the parameters (`featuresGlobPattern`, `tagForGrouping` and `name`) should remain same(as passed in *cucumberTagGroups*) while invoking cucumber for each group. `tagExpression` parameter should be concatenated with the each groups.

With context to the above example:
if tagExpression is `@firstA`, and output is `[ '@GROUP_A_ON and @GROUP_B_OFF and @GROUP_C_ON', '@GROUP_A_ON and @GROUP_B_ON and @GROUP_C_OFF', '@GROUP_ALL' ]`, then tagExpression for executing the groups should be:

- (@firstA and @GROUP_A_ON and @GROUP_B_OFF and @GROUP_C_ON) - *first group*
- (@firstA and @GROUP_A_ON and @GROUP_B_ON and @GROUP_C_OFF) - *second group*
- (@firstA and @GROUP_ALL) - *third group*

### cucumberTagGroups param

This function takes one parameter, an object. The object keys are described below.

- **featuresGlobPattern** [required]

This parameter is exactly same as [cucumber](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#running-specific-features). Use any valid [glob](https://github.com/isaacs/node-glob#glob) pattern.

- **tagForGrouping** [required]

This is a regular expression. The regular expression that can match multiple tags and create groups out it. **Note**: *while using this module we need to tag all feature file with at least one grouping tag. Its suggested to use a default tags where none of the grouping tags are applicable.

**Example** of group tags

One may create tags as below. And assign every scenario or feature with at least one tag.
@GROUP_A
@GROUP_B
@GROUP_C
@GROUP_D
@GROUP_DEFAULT

Note: tags can be define tags for feature, scenario, scenario-outline and example keywords. Exactly same as cucumber.

- **tagExpression** [optional]

If not provided all the feature files under the directory of *featuresGlobPattern* will be considered for evaluation.

Tag expression parameter is also same as [cucumber](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#tags). Use any valid [cucumber-tag-expression](https://docs.cucumber.io/cucumber/api/#tag-expressions)

- **name** [optional]

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
