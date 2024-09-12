Feature: Obtain the total number of folders
  In order to have a folders counter
  As a user
  I want to see the folders counter

  Scenario: With one folder
    Given I have sent an event to the event bus:
    """
    {
      "data": {
        "id": "c77fa036-cbc7-4414-996b-c6a7a93cae09",
        "type": "folder.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
        "attributes": {
          "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
          "name": "Europe"
        },
        "meta" : {
          "host": "127.0.0.1"
        }
      }
    }
    """
    When I send a GET request to "/folders-counter"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "total": 1
    }
    """


  Scenario: With more than one folder having duplicates
    Given I have sent an event to the event bus:
    """
    {
      "data": {
        "id": "c77fa036-cbc7-4414-996b-c6a7a93cae09",
        "type": "folder.created",
        "occurredOn": "2019-08-08T08:36:32+00:00",
        "aggregateId": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
        "attributes": {
          "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
          "name": "Europe"
        },
        "meta" : {
          "host": "127.0.0.1"
        }
      }
    }
    """
    And I have sent an event to the event bus:
    """
    {
      "data": {
        "id": "53676a4b-22c0-427c-b8f2-a040e84fad0d",
        "type": "folder.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "9d4ac669-6903-4a48-aad1-edfe84cf3d56",
        "attributes": {
          "id": "9d4ac669-6903-4a48-aad1-edfe84cf3d56",
          "name": "America"
        },
        "meta" : {
          "host": "127.0.0.1"
        }
      }
    }
    """
    And I have sent an event to the event bus:
    """
    {
      "data": {
        "id": "53676a4b-22c0-427c-b8f2-a040e84fad0d",
        "type": "folder.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "9d4ac669-6903-4a48-aad1-edfe84cf3d56",
        "attributes": {
          "id": "9d4ac669-6903-4a48-aad1-edfe84cf3d56",
          "name": "America"
        },
        "meta" : {
          "host": "127.0.0.1"
        }
      }
    }
    """
    When I send a GET request to "/folders-counter"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "total": 2
    }
    """
