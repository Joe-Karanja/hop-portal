const DAILYTRANSACTIONS = {
    "success": true,
    "message": "transactions retrieved successfully",
    "data": {
        "successfulTransactions": [{
            "completedOn": "2021-08-12",
            "value": 6000.00,
            "count": 120,
        },
        {
            "completedOn": "2021-08-13",
            "value": 5800.00,
            "count": 115
        },
        {
            "completedOn": "2021-08-14",
            "value": 6200.00,
            "count": 119
        },
        {
            "completedOn": "2021-08-15",
            "value": 6320.00,
            "count": 118
        },
        {
            "completedOn": "2021-08-16",
            "value": 6517.00,
            "count": 121
        },
        {
            "completedOn": "2021-08-17",
            "value": 7517.00,
            "count": 130
        },
        {
            "completedOn": "2021-08-18",
            "value": 6580.00,
            "count": 121
        }],
        "unsuccessfulTransactions": [{
          "completedOn": "2021-08-12",
          "value": 600.00,
          "count": 1,
      },
      {
          "completedOn": "2021-08-13",
          "value": 580.00,
          "count": 2
      },
      {
          "completedOn": "2021-08-14",
          "value": 620.00,
          "count": 1
      },
      {
          "completedOn": "2021-08-15",
          "value": 632.00,
          "count": 1
      },
      {
          "completedOn": "2021-08-16",
          "value": 651.00,
          "count": 1
      },
      {
          "completedOn": "2021-08-17",
          "value": 751.00,
          "count": 2
      },
      {
          "completedOn": "2021-08-18",
          "value": 658.00,
          "count": 1
      }]
    }
}

const MONTHLYTRANSACTIONS = {
    "success": true,
    "message": "transactions retrieved successfully",
    "data": {
        "successfulTransactions": [{
            "completedOn": "Jan-2021",
            "value": 36000.00,
            "count": 120,
        },
        {
            "completedOn": "Feb-2021",
            "value": 35800.00,
            "count": 115
        },
        {
            "completedOn": "Mar-2021",
            "value": 36200.00,
            "count": 119
        },
        {
            "completedOn": "Apr-2021",
            "value": 36320.00,
            "count": 118
        },
        {
            "completedOn": "May-2021",
            "value": 36517.00,
            "count": 121
        },
        {
            "completedOn": "Jun-2021",
            "value": 37517.00,
            "count": 130
        },
        {
            "completedOn": "Jul-2021",
            "value": 36580.00,
            "count": 121
        }],
        "unsuccessfulTransactions": [{
          "completedOn": "Jan-2021",
          "value": 3600.00,
          "count": 1,
      },
      {
          "completedOn": "Feb-2021",
          "value": 3580.00,
          "count": 2
      },
      {
          "completedOn": "Mar-2021",
          "value": 3620.00,
          "count": 1
      },
      {
          "completedOn": "Apr-2021",
          "value": 3632.00,
          "count": 1
      },
      {
          "completedOn": "May-2021",
          "value": 3651.00,
          "count": 1
      },
      {
          "completedOn": "Jun-2021",
          "value": 3751.00,
          "count": 2
      },
      {
          "completedOn": "Jul-2021",
          "value": 3658.00,
          "count": 1
      }]
    }
}

const DAILYTYPETRANSACTIONS = {
    "success": true,
    "message": "transactions retrieved successfully",
    "data": {
        "teller": [
            {
            "completedOn": "2021-08-12",
            "value": 6000.00,
            "count": 120,
        },
        {
            "completedOn": "2021-08-13",
            "value": 5800.00,
            "count": 115
        },
        {
            "completedOn": "2021-08-14",
            "value": 6200.00,
            "count": 119
        },
        {
            "completedOn": "2021-08-15",
            "value": 6320.00,
            "count": 118
        },
        {
            "completedOn": "2021-08-16",
            "value": 6517.00,
            "count": 121
        },
        {
            "completedOn": "2021-08-17",
            "value": 7517.00,
            "count": 130
        },
        {
            "completedOn": "2021-08-18",
            "value": 6580.00,
            "count": 121
        }],
        "mobile": [{
            "completedOn": "2021-08-12",
            "value": 7000.00,
            "count": 120,
        },
        {
            "completedOn": "2021-08-13",
            "value": 7800.00,
            "count": 115
        },
        {
            "completedOn": "2021-08-14",
            "value": 7200.00,
            "count": 119
        },
        {
            "completedOn": "2021-08-15",
            "value": 7320.00,
            "count": 118
        },
        {
            "completedOn": "2021-08-16",
            "value": 7517.00,
            "count": 121
        },
        {
            "completedOn": "2021-08-17",
            "value": 7517.00,
            "count": 130
        },
        {
            "completedOn": "2021-08-18",
            "value": 7580.00,
            "count": 121
        }],
        "agencyBanking": [{
            "completedOn": "2021-08-12",
            "value": 8000.00,
            "count": 120,
        },
        {
            "completedOn": "2021-08-13",
            "value": 8800.00,
            "count": 115
        },
        {
            "completedOn": "2021-08-14",
            "value": 8200.00,
            "count": 119
        },
        {
            "completedOn": "2021-08-15",
            "value": 8320.00,
            "count": 118
        },
        {
            "completedOn": "2021-08-16",
            "value": 8517.00,
            "count": 121
        },
        {
            "completedOn": "2021-08-17",
            "value": 8517.00,
            "count": 130
        },
        {
            "completedOn": "2021-08-18",
            "value": 8580.00,
            "count": 121
        }],
        "ussd": [{
          "completedOn": "2021-08-12",
          "value": 600.00,
          "count": 1,
      },
      {
          "completedOn": "2021-08-13",
          "value": 580.00,
          "count": 2
      },
      {
          "completedOn": "2021-08-14",
          "value": 620.00,
          "count": 1
      },
      {
          "completedOn": "2021-08-15",
          "value": 632.00,
          "count": 1
      },
      {
          "completedOn": "2021-08-16",
          "value": 651.00,
          "count": 1
      },
      {
          "completedOn": "2021-08-17",
          "value": 751.00,
          "count": 2
      },
      {
          "completedOn": "2021-08-18",
          "value": 658.00,
          "count": 1
      }]
    }
}

const MONTHLYTYPETRANSACTIONS = {
    "success": true,
    "message": "transactions retrieved successfully",
    "data": {
        "teller": [
            {
            "completedOn": "Jan-2021",
            "value": 36000.00,
            "count": 120,
        },
        {
            "completedOn": "Feb-2021",
            "value": 35800.00,
            "count": 115
        },
        {
            "completedOn": "Mar-2021",
            "value": 36200.00,
            "count": 119
        },
        {
            "completedOn": "Apr-2021",
            "value": 36320.00,
            "count": 118
        },
        {
            "completedOn": "May-2021",
            "value": 36517.00,
            "count": 121
        },
        {
            "completedOn": "Jun-2021",
            "value": 37517.00,
            "count": 130
        },
        {
            "completedOn": "Jul-2021",
            "value": 36580.00,
            "count": 121
        }],
        "mobile": [{
            "completedOn": "Jan-2021",
            "value": 37000.00,
            "count": 120,
        },
        {
            "completedOn": "Feb-2021",
            "value": 37800.00,
            "count": 115
        },
        {
            "completedOn": "Mar-2021",
            "value": 37200.00,
            "count": 119
        },
        {
            "completedOn": "Apr-2021",
            "value": 37320.00,
            "count": 118
        },
        {
            "completedOn": "May-2021",
            "value": 37517.00,
            "count": 121
        },
        {
            "completedOn": "Jun-2021",
            "value": 37517.00,
            "count": 130
        },
        {
            "completedOn": "Jul-2021",
            "value": 37580.00,
            "count": 121
        }],
        "agencyBanking": [{
            "completedOn": "Jan-2021",
            "value": 38000.00,
            "count": 120,
        },
        {
            "completedOn": "Feb-2021",
            "value": 38800.00,
            "count": 115
        },
        {
            "completedOn": "Mar-2021",
            "value": 38200.00,
            "count": 119
        },
        {
            "completedOn": "Apr-2021",
            "value": 38320.00,
            "count": 118
        },
        {
            "completedOn": "May-2021",
            "value": 38517.00,
            "count": 121
        },
        {
            "completedOn": "Jun-2021",
            "value": 38517.00,
            "count": 130
        },
        {
            "completedOn": "Jul-2021",
            "value": 38580.00,
            "count": 121
        }],
        "ussd": [{
          "completedOn": "Jan-2021",
          "value": 9600.00,
          "count": 1,
      },
      {
          "completedOn": "Feb-2021",
          "value": 9580.00,
          "count": 2
      },
      {
          "completedOn": "Mar-2021",
          "value": 9620.00,
          "count": 1
      },
      {
          "completedOn": "Apr-2021",
          "value": 9632.00,
          "count": 1
      },
      {
          "completedOn": "May-2021",
          "value": 9651.00,
          "count": 1
      },
      {
          "completedOn": "Jun-2021",
          "value": 9751.00,
          "count": 2
      },
      {
          "completedOn": "Jul-2021",
          "value": 9658.00,
          "count": 1
      }]
    }
}
