@ui @saucedemo
Feature: Sauce Demo Login

As a user of Sauce Demo
I want to be able to log in with valid credentials
So that I can acess the inventory page

Background: 
Given I am on the Sauce Demo login page

@smoke
Scenario: Successful login with valid credentials
  When I enter username "standard_user"
  Then I should be redirected to the inventory page

@smoke
Scenario: Login with invalid credentials
  When I enter username "invalid_user"
  Then I should see an error message "Username and password do not match"

@regression
Scenario: Login fails with locked out user 
  When I enter username "locked_out_user"
  Then I should see an error message "Sorry, this user has been locked out"

@regression
Scenario Outline: Login with multiple user types
  When I enter username "<username>"
  Then I should be redirected to the inventory page

  Examples:
      | username | 
      | standard_user  |
      | performance_glitch_user |