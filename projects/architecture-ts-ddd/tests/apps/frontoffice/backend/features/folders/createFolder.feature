Feature: Create a new folder
    In order to have folders in the frontoffice
    As a user with admin permissions
    I want to create a new folder

    Scenario: A valid non existing folder
        Given I send a PUT request to "/folders/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
            """
            {
                "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
                "name": "Asia"
            }
            """
        Then the response status code should be 201
        And the response should be empty

    Scenario: An invalid non existing folder with an invalid uuid and name type
        Given I send a PUT request to "/folders/123" with body:
            """
            {
                "id": "123",
                "name": 234
            }
            """
        Then the response status code should be 422
