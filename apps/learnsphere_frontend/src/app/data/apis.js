export const apiGroups = [
  {
    title: 'Todo',
    apis: [
      {
        name: "create todo",
        method: "POST",
        description: "create a todo adding the title .",
        image: "/createTodo.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/createTodo",
        input: `{
    "title" : "test Todo 13",
    "priority" : 4
}`,
        output: `{
    "statusCode": "Todo created successfully",
    "data": {
        "title": "test Todo 14",
        "completed": false,
        "dueDate": null,
        "priority": 2,
        "tags": [
            "personal"
        ],
        "_id": "681a6968629ef9b1ff4f2bf8",
        "createdAt": "2025-05-06T19:56:24.824Z",
        "updatedAt": "2025-05-06T19:56:24.824Z",
        "__v": 0
    },
    "message": "Success",
    "success": false
}`,
        codeSamples: {
          node: `fetch("https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/createTodo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(
            {
                "title" : "test Todo 18",
                "priority" : 2
            }
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      },
      {
        name: "get all todo",
        method: "GET",
        description: "A request to get all todos which has been created .",
        image: "/getTodo.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/getAllTodo",
        input: `{
        THIS IS A GET REQUEST SO NO NEED TO BE ANY INPUT
}`,
        output: `{
        "statusCode": "Todos retrieved successfully",
        "data": [
        {
            "_id": "6807a3775238d60ff443e25d",
            "title": "this is update version of test todod 1",
            "completed": false,
            "dueDate": null,
            "priority": 1,
            "tags": [
                "personal"
            ],
            "createdAt": "2025-04-22T14:11:03.481Z",
            "updatedAt": "2025-04-22T14:22:45.509Z",
            "__v": 0
        },
        {
            "_id": "6807a3ae5238d60ff443e25f",
            "title": "hii this is test todo 1",
            "completed": false,
            "dueDate": null,
            "priority": 1,
            "tags": [
                "personal"
            ],
            "createdAt": "2025-04-22T14:11:58.109Z",
            "updatedAt": "2025-04-22T14:11:58.109Z",
            "__v": 0
        },
      ],
    "message": "Success",
    "success": false
}`,
        codeSamples: {
          node: `fetch("https://api.learnsphere.com/youtube/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: "My Video",
              description: "This is a test upload",
              file: "base64StringHere"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      },
      {
        name: "update Todo ",
        method: "PATCH",
        description: "update a todo adding the title .",
        image: "/updateTodo.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/updateTodo/{SPECIFIC_CREATED_TODO_ID}",
        input: `{
    "title" : "test Todo 13",
    "priority" : 1,
    tags :[''urgent']
}`,
        output: `{
    "statusCode": "Todo updated successfully",
    "data": {
        "_id": "681a6968629ef9b1ff4f2bf8",
        "title": "test Todo 14",
        "completed": false,
        "dueDate": null,
        "priority": 2,
        "tags": [
            "urgent"
        ],
        "createdAt": "2025-05-06T19:56:24.824Z",
        "updatedAt": "2025-05-06T20:08:46.911Z",
        "__v": 0
    },
    "message": "Success",
    "success": false
}`,
        codeSamples: {
          node: `fetch("https://api.learnsphere.com/youtube/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: "My Video",
              description: "This is a test upload",
              file: "base64StringHere"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      },
      {
        name: "delete Todo ",
        method: "DELETE",
        description: "delete the Todo title.IMPORTANT , this is only delete the completed todo, this not going to be deleted the incomplete todos.",
        image: "/deleteTodo.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/deleteTodo/{SPECIFIC_CREATED_TODO_ID}",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": "Cannot delete an incomplete todo.",
    "errors": [],
    "data": null,
    "success": false
}`,
        codeSamples: {
          node: `fetch("https://api.learnsphere.com/youtube/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: "My Video",
              description: "This is a test upload",
              file: "base64StringHere"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      },
      {
        name: "markAsComplete Todo ",
        method: "PATCH",
        description: "delete the Todo title",
        image: "/markAsComplete.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/markAsComplete/{SPECIFIC_CREATED_TODO_ID}",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": "Todo marked as complete",
    "data": {
        "_id": "681a6d7d629ef9b1ff4f2bff",
        "title": "test Todo 18",
        "completed": true,
        "dueDate": null,
        "priority": 2,
        "tags": [
            "personal"
        ],
        "createdAt": "2025-05-06T20:13:49.173Z",
        "updatedAt": "2025-05-06T20:15:10.359Z",
        "__v": 0
    },
    "message": "Success",
    "success": false
}`,
        codeSamples: {
          node: `fetch("https://api.learnsphere.com/youtube/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: "My Video",
              description: "This is a test upload",
              file: "base64StringHere"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      },
      {
        name: "getTodoSomeMethods",
        method: "GET",
        description: "GET the todo by some methods like or priority and tags .",
        image: "/getTodoSomeMethods.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/getTodoSomeMethods?{SPECIFIC_QUERY}",
        input: `{
        "priority" : 5,
        "tag" : "urgent"
}`,
        output: `{
    "statusCode": "Todos retrieved successfully",
    "data": [
        {
            "_id": "6807a3c25238d60ff443e261",
            "title": "hii this is test todo 2",
            "completed": false,
            "dueDate": null,
            "priority": 1,
            "tags": [
                "urgent"
            ],
            "createdAt": "2025-04-22T14:12:18.258Z",
            "updatedAt": "2025-04-22T14:33:26.710Z",
            "__v": 0
        },
        {
            "_id": "6807a42c5238d60ff443e269",
            "title": "hii this is test todo 5",
            "completed": false,
            "dueDate": "2025-05-03T12:00:00.000Z",
            "priority": 1,
            "tags": [
                "urgent"
            ],
            "createdAt": "2025-04-22T14:14:04.872Z",
            "updatedAt": "2025-04-22T14:14:04.872Z",
            "__v": 0
        },
        {
            "_id": "681a6968629ef9b1ff4f2bf8",
            "title": "test Todo 14",
            "completed": false,
            "dueDate": null,
            "priority": 2,
            "tags": [
                "urgent"
            ],
            "createdAt": "2025-05-06T19:56:24.824Z",
            "updatedAt": "2025-05-06T20:08:46.911Z",
            "__v": 0
        }
    ],
    "message": "Success",
    "success": false
}`,
        codeSamples: {
          node: `fetch("https://api.learnsphere.com/youtube/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: "My Video",
              description: "This is a test upload",
              file: "base64StringHere"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      },
      {
        name: "getTodoById",
        method: "GET",
        description: "GET the todo by the id",
        image: "/getTodoById.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/getTodoById/{SPECIFIC_CREATED_TODO_ID}",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": "Todo fetched successfully",
    "data": {
        "_id": "6807b0650062722c8f3a7884",
        "title": "test Todo 13",
        "completed": false,
        "dueDate": null,
        "priority": 4,
        "tags": [
            "personal"
        ],
        "createdAt": "2025-04-22T15:06:13.743Z",
        "updatedAt": "2025-04-22T15:06:13.743Z",
        "__v": 0
    },
    "message": "Success",
    "success": false
}`,
        codeSamples: {
          node: `fetch("https://api.learnsphere.com/youtube/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: "My Video",
              description: "This is a test upload",
              file: "base64StringHere"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      },
      {
        name: "deleteAllTodo",
        method: "DELETE",
        description: "DELETE the all todo . IMPORTANT , this is only delete the completed todo, this not going to be deleted the incomplete todos.",
        image: "/deleteAllTodo.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/deleteAllTodo",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": "Cannot delete an incomplete todo.",
    "errors": [],
    "data": null,
    "success": false
}`,
        codeSamples: {
          node: `fetch("https://api.learnsphere.com/youtube/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: "My Video",
              description: "This is a test upload",
              file: "base64StringHere"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      },
      {
        name: "getTodoByDueDates",
        method: "GET",
        description: "GET the all todo stats",
        image: "/getTodoByDueDates.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/getTodoByDueDates/?query={SPECIFIC DATE}",
        input: `{
        "after" : 2025-05-01
}`,
        output: `{
    "statusCode": "Todos retrieved by due date successfully",
    "data": [
        {
            "_id": "6807a4115238d60ff443e267",
            "title": "hii this is test todo 4",
            "completed": false,
            "dueDate": "2025-05-01T12:00:00.000Z",
            "priority": 1,
            "tags": [
                "work"
            ],
            "createdAt": "2025-04-22T14:13:37.987Z",
            "updatedAt": "2025-04-22T14:13:37.987Z",
            "__v": 0
        },
        {
            "_id": "6807a42c5238d60ff443e269",
            "title": "hii this is test todo 5",
            "completed": false,
            "dueDate": "2025-05-03T12:00:00.000Z",
            "priority": 1,
            "tags": [
                "urgent"
            ],
            "createdAt": "2025-04-22T14:14:04.872Z",
            "updatedAt": "2025-04-22T14:14:04.872Z",
            "__v": 0
        },
        {
            "_id": "6807a4435238d60ff443e26b",
            "title": "hii this is test todo 6",
            "completed": false,
            "dueDate": "2025-05-05T12:00:00.000Z",
            "priority": 1,
            "tags": [
                "personal"
            ],
            "createdAt": "2025-04-22T14:14:27.244Z",
            "updatedAt": "2025-04-22T14:14:27.244Z",
            "__v": 0
        }
    ],
    "message": "Success",
    "success": false
}`,
        codeSamples: {
          node: `fetch("https://api.learnsphere.com/youtube/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: "My Video",
              description: "This is a test upload",
              file: "base64StringHere"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      },
      {
        name: "TODO STATS",
        method: "GET",
        description: "GET the all todos, analayze the data , when this completed, after duedate or not and mayny thing...",
        image: "/todoStats.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/todoStats",
        input: `{
        NOT REQUIRED
}`,
        output: `{
    "statusCode": "Todo Stats are generated successfully .",
    "data": {
        "total": 16,
        "completed": 1,
        "pending": 15,
        "overdue": 3,
        "upcoming": 0,
        "byPriority": [
            {
                "_id": 1,
                "count": 12
            },
            {
                "_id": 2,
                "count": 2
            },
            {
                "_id": 4,
                "count": 2
            }
        ],
        "byTags": [
            {
                "_id": [
                    "personal"
                ],
                "count": 12
            },
            {
                "_id": [
                    "urgent"
                ],
                "count": 3
            },
            {
                "_id": [
                    "work"
                ],
                "count": 1
            }
        ]
    },
    "message": "Success",
    "success": false
}`,
        codeSamples: {
          node: `fetch("https://api.learnsphere.com/youtube/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: "My Video",
              description: "This is a test upload",
              file: "base64StringHere"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      },
    ]
  },
  {
    title: 'YouTube',
    apis: [
      {
        name: "register user",
        method: "POST",
        description: "Registers a new user on the platform by collecting essential details like fullname, email, and password, username, . Ensures data validation and securely stores user credentials.",
        image: "/register_user.png",
        endpoint: "https://learnsphere-ln9j.onrender.com/api/v1/users/register",
        input: `{
                  "fullName": "test",
                  "email": "This is a test upload.",
                  "username": "test",
                  "password" : "123456",
                  "avatar" : "https://demoImage.url",
                  "coverImage" : "https://demoImage.url",
                  
}`,
        output:
          `{
                  "status": "success",
                  "videoId": "abc123"
}`,
        codeSamples: {
          node: `fetch("https://api.learnsphere.com/youtube/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: "My Video",
              description: "This is a test upload",
              file: "base64StringHere"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      },
      {
        name: "Upload Video",
        method: "POST",
        description: "Uploads a video to the YouTube backend.",
        image: "/demo.png",
        endpoint: "/youtube/upload",
        input: `{
            "title": "My Video",
            "description": "This is a test upload.",
            "file": "<binary>"
          }`,
        output: `{
            "status": "success",
            "videoId": "abc123"
          }`,
        codeSamples: {
          node: `fetch("https://api.learnsphere.com/youtube/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: "My Video",
              description: "This is a test upload",
              file: "base64StringHere"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data));`,
          axios: `axios.post("https://api.learnsphere.com/youtube/upload", {
            title: "My Video",
            description: "This is a test upload",
            file: "base64StringHere"
          }).then(res => {
            console.log(res.data);
          });`,
          python: `import requests
          
          data = {
            "title": "My Video",
            "description": "This is a test upload",
            "file": "base64StringHere"
          }
          
          response = requests.post("https://api.learnsphere.com/youtube/upload", json=data)
          print(response.json())`
        }
      }
    ],
  },
];