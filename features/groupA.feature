@groupA @SW_A_ON
Feature: something with groupA only
  In order to value
  As a role
  I want feature

  @firstA @SW_B_OFF @SW_C_ON
  Scenario: First scenario related to groupA
    Given I have something
    When I do something
    Then I get something

  @secondA @SW_B_ON @SW_C_OFF
  Scenario: Second scenario related to groupA
    Given I have something
    When I do something
    Then I get something
  