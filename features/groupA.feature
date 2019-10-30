@groupA @GROUP_A_ON
Feature: something with groupA only
  In order to value
  As a role
  I want feature

  @firstA @GROUP_B_OFF @GROUP_C_ON
  Scenario: First scenario related to groupA
    Given I have something
    When I do something
    Then I get something

  @secondA @GROUP_B_ON @GROUP_C_OFF
  Scenario: Second scenario related to groupA
    Given I have something
    When I do something
    Then I get something
  