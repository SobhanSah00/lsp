const generateCodeSamples = (method, endpoint, input) => {
  const hasBody = method === 'POST' || method === 'PATCH' || method === 'PUT';
  const inputData = input && input !== 'NOT REQUIRED' && !input.includes('GET REQUEST') ? input : null;

  return {
    node: hasBody && inputData
      ? `fetch("${endpoint}", {
  method: "${method}",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(${inputData})
})
.then(res => res.json())
.then(data => console.log(data));`
      : `fetch("${endpoint}", {
  method: "${method}"
})
.then(res => res.json())
.then(data => console.log(data));`,

    axios: hasBody && inputData
      ? `axios.${method.toLowerCase()}("${endpoint}", ${inputData})
.then(res => {
  console.log(res.data);
});`
      : `axios.${method.toLowerCase()}("${endpoint}")
.then(res => {
  console.log(res.data);
});`,

    python: hasBody && inputData
      ? `import requests

data = ${inputData}

response = requests.${method.toLowerCase()}("${endpoint}", json=data)
print(response.json())`
      : `import requests

response = requests.${method.toLowerCase()}("${endpoint}")
print(response.json())`,

    curl: hasBody && inputData
      ? `curl -X ${method} "${endpoint}" \\
  -H "Content-Type: application/json" \\
  -d '${inputData}'`
      : `curl -X ${method} "${endpoint}"`
  };
};

// Your API Groups - Now you only define endpoint, method, input once!
export const apiGroups = [
  {
    title: 'Todo',
    apis: [
      {
        name: "create todo",
        method: "POST",
        description: "create a todo adding the title .",
        image: "/Todo/createTodo.png",
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
        "tags": ["personal"],
        "_id": "681a6968629ef9b1ff4f2bf8",
        "createdAt": "2025-05-06T19:56:24.824Z",
        "updatedAt": "2025-05-06T19:56:24.824Z",
        "__v": 0
    },
    "message": "Success",
    "success": false
}`
      },
      {
        name: "get all todo",
        method: "GET",
        description: "A request to get all todos which has been created .",
        image: "/Todo/getTodo.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/getAllTodo",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": "Todos retrieved successfully",
    "data": [
        {
            "_id": "6807a3775238d60ff443e25d",
            "title": "this is update version of test todod 1",
            "completed": false,
            "dueDate": null,
            "priority": 1,
            "tags": ["personal"],
            "createdAt": "2025-04-22T14:11:03.481Z",
            "updatedAt": "2025-04-22T14:22:45.509Z",
            "__v": 0
        }
    ],
    "message": "Success",
    "success": false
}`
      },
      {
        name: "update Todo",
        method: "PATCH",
        description: "update a todo adding the title .",
        image: "/Todo/updateTodo.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/updateTodo/{SPECIFIC_CREATED_TODO_ID}",
        input: `{
    "title" : "test Todo 13",
    "priority" : 1,
    "tags" :["urgent"]
}`,
        output: `{
    "statusCode": "Todo updated successfully",
    "data": {
        "_id": "681a6968629ef9b1ff4f2bf8",
        "title": "test Todo 14",
        "completed": false,
        "dueDate": null,
        "priority": 2,
        "tags": ["urgent"],
        "createdAt": "2025-05-06T19:56:24.824Z",
        "updatedAt": "2025-05-06T20:08:46.911Z",
        "__v": 0
    },
    "message": "Success",
    "success": false
}`
      },
      {
        name: "delete Todo",
        method: "DELETE",
        description: "delete the Todo title.IMPORTANT , this is only delete the completed todo, this not going to be deleted the incomplete todos.",
        image: "/Todo/deleteTodo.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/deleteTodo/{SPECIFIC_CREATED_TODO_ID}",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": "Cannot delete an incomplete todo.",
    "errors": [],
    "data": null,
    "success": false
}`
      },
      {
        name: "markAsComplete Todo",
        method: "PATCH",
        description: "mark the Todo as complete",
        image: "/Todo/markAsComplete.png",
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
        "tags": ["personal"],
        "createdAt": "2025-05-06T20:13:49.173Z",
        "updatedAt": "2025-05-06T20:15:10.359Z",
        "__v": 0
    },
    "message": "Success",
    "success": false
}`
      },
      {
        name: "getTodoSomeMethods",
        method: "GET",
        description: "GET the todo by some methods like or priority and tags .",
        image: "/Todo/getTodoSomeMethods.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/getTodoSomeMethods?priority=5&tag=urgent",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": "Todos retrieved successfully",
    "data": [
        {
            "_id": "6807a3c25238d60ff443e261",
            "title": "hii this is test todo 2",
            "completed": false,
            "dueDate": null,
            "priority": 1,
            "tags": ["urgent"],
            "createdAt": "2025-04-22T14:12:18.258Z",
            "updatedAt": "2025-04-22T14:33:26.710Z",
            "__v": 0
        }
    ],
    "message": "Success",
    "success": false
}`
      },
      {
        name: "getTodoById",
        method: "GET",
        description: "GET the todo by the id",
        image: "/Todo/getTodoById.png",
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
        "tags": ["personal"],
        "createdAt": "2025-04-22T15:06:13.743Z",
        "updatedAt": "2025-04-22T15:06:13.743Z",
        "__v": 0
    },
    "message": "Success",
    "success": false
}`
      },
      {
        name: "deleteAllTodo",
        method: "DELETE",
        description: "DELETE the all todo . IMPORTANT , this is only delete the completed todo, this not going to be deleted the incomplete todos.",
        image: "/Todo/deleteAllTodo.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/deleteAllTodo",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": "Cannot delete an incomplete todo.",
    "errors": [],
    "data": null,
    "success": false
}`
      },
      {
        name: "getTodoByDueDates",
        method: "GET",
        description: "GET the all todo stats",
        image: "/Todo/getTodoByDueDates.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/getTodoByDueDates/?after=2025-05-01",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": "Todos retrieved by due date successfully",
    "data": [
        {
            "_id": "6807a4115238d60ff443e267",
            "title": "hii this is test todo 4",
            "completed": false,
            "dueDate": "2025-05-01T12:00:00.000Z",
            "priority": 1,
            "tags": ["work"],
            "createdAt": "2025-04-22T14:13:37.987Z",
            "updatedAt": "2025-04-22T14:13:37.987Z",
            "__v": 0
        }
    ],
    "message": "Success",
    "success": false
}`
      },
      {
        name: "TODO STATS",
        method: "GET",
        description: "GET the all todos, analayze the data , when this completed, after duedate or not and mayny thing...",
        image: "/Todo/todoStats.png",
        endpoint: "https://todo-backend-by-learnsphere.onrender.com/api/v1/todos/todoStats",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": "Todo Stats are generated successfully .",
    "data": {
        "total": 16,
        "completed": 1,
        "pending": 15,
        "overdue": 3,
        "upcoming": 0,
        "byPriority": [
            {"_id": 1, "count": 12},
            {"_id": 2, "count": 2},
            {"_id": 4, "count": 2}
        ],
        "byTags": [
            {"_id": ["personal"], "count": 12},
            {"_id": ["urgent"], "count": 3},
            {"_id": ["work"], "count": 1}
        ]
    },
    "message": "Success",
    "success": false
}`
      }
    ]
  },
  {
    title: 'Authentication',
    apis: [
      {
        name: "Register User",
        method: "POST",
        description: "create a user .",
        image: "/authentication/signup.png",
        endpoint: "https://auth-lsp.onrender.com/api/v1/auth/signup",
        input: `{
    "username" : "hell123",
    "email" : "hell@gmail.com",
    "password": "12345678"
}`,
        output: `{
    "data": {
        "message": "User signed up successfully.",
        "user": {
            "username": "hell1234",
            "email": "hell1234@gmail.com",
            "password": "$2b$10$x7B2JG2RoYsCKoWRzEyF1uJhLT7r6HgLuB0PmrwUqA4FMsOyuVdLy",
            "_id": "68ad531b3b4c748ee8546bd9",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}`
      },
      {
        name: "sign in the User",
        method: "POST",
        description: "sign in that user .",
        image: "/authentication/signin.png",
        endpoint: "https://auth-lsp.onrender.com/api/v1/auth/signin",
        input: `{
    "email" : "hell@gmail.com",
    "password": "12345678"
}`,
        output: `{
    "data": {
        "message": "User signin successfully.",
        "user": {
            "email": "hell1234@gmail.com",
            "password": "$2b$10$x7B2JG2RoYsCKoWRzEyF1uJhLT7r6HgLuB0PmrwUqA4FMsOyuVdLy",
            "_id": "68ad531b3b4c748ee8546bd9",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}`
      },
      {
        name: "me",
        method: "GET",
        description: "Find out the user .",
        image: "/authentication/me.png",
        endpoint: "https://auth-lsp.onrender.com/api/v1/auth/me",
        input: `NOT REQUIRED`,
        output: `{
    "data": {
        "message": "User found successfully.",
        "user": {
            "username": "hell1234",
            "email": "hell1234@gmail.com",
            "password": "$2b$10$x7B2JG2RoYsCKoWRzEyF1uJhLT7r6HgLuB0PmrwUqA4FMsOyuVdLy",
            "_id": "68ad531b3b4c748ee8546bd9"
        }
    }
}`
      },
      {
        name: "logout",
        method: "GET",
        description: "log out the user .",
        image: "/authentication/logout.png",
        endpoint: "https://auth-lsp.onrender.com/api/v1/auth/logout",
        input: `NOT REQUIRED`,
        output: `{
    "message": "User log out ."
}`
      }
    ]
  },
  {
    title: 'Social_Media',
    apis: [
      {
        name: "register user",
        method: "POST",
        description: "Registers a new user on the platform by collecting essential details like fullname, email, and password, username. Ensures data validation and securely stores user credentials.",
        image: "/social_media/register.png",
        endpoint: "https://learnsphere-ln9j.onrender.com/api/v1/users/register",
        input: `{
    "fullName": "test_llive_2",
    "email": "testliveapireal2@gmail.com",
    "username": "testliveapireal2",
    "password": "12345678",
    "avatar": "https://demoImage.url",
    "coverImage": "https://demoImage.url"
}`,
        output: `{
    "statusCode": 200,
    "data": {
        "_id": "68b95b9e77a0e024719b2c5d",
        "username": "testliveapireal3",
        "email": "testliveapireal3@gmail.com",
        "fullName": "test_llive_3",
        "avatar": "http://res.cloudinary.com/ytsobhan/video/upload/v1756978077/knsboxjmf1bjbtmaobe0.mp4",
        "coverImage": "http://res.cloudinary.com/ytsobhan/image/upload/v1756978078/blqbbxvcxhchlri7r2rc.jpg",
        "watchHistory": [],
        "createdAt": "2025-09-04T09:27:58.780Z",
        "updatedAt": "2025-09-04T09:27:58.780Z",
        "__v": 0
    },
    "message": "User Register Successfully",
    "success": true
}`
      },
      {
        name: "login",
        method: "POST",
        description: "Login with that user .",
        image: "/social_media/login.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/users/login",
        input: `{
    "username": "testliveapireal3",
    "password": "12345678"
}`,
        output: `{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "68b95b9e77a0e024719b2c5d",
            "username": "testliveapireal3",
            "email": "testliveapireal3@gmail.com",
            "fullName": "test_llive_3",
            "avatar": "http://res.cloudinary.com/ytsobhan/video/upload/v1756978077/knsboxjmf1bjbtmaobe0.mp4",
            "coverImage": "http://res.cloudinary.com/ytsobhan/image/upload/v1756978078/blqbbxvcxhchlri7r2rc.jpg",
            "watchHistory": [],
            "createdAt": "2025-09-04T09:27:58.780Z",
            "updatedAt": "2025-09-04T09:52:40.222Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "message": "User logged In Successfully",
    "success": true
}`
      },
      {
        name: "logout",
        method: "POST",
        description: "Logout with that user .",
        image: "/social_media/logout.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/users/logout",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": 200,
    "data": {},
    "message": "User logged Out",
    "success": true
}`
      },
      {
        name: "Refresh_Access_Token",
        method: "POST",
        description: "Refresh Your Access Token when it about to expire",
        image: "/social_media/refreshaccessToken.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/users/refresh-token",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": 200,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.Token.ZhapSkbBztgBcqMEGCTrG72qn5CkHhX4uqQtSwcuUN8"
    },
    "message": "Access token refreshed ",
    "success": true
}`
      },
      {
        name: "change_password",
        method: "POST",
        description: "Update your Password",
        image: "/social_media/update_Password.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/users/change-password",
        input: `{
    "oldPassword" : "12345678",
    "newPassword" : "123456789"
}`,
        output: `{
    "statusCode": 200,
    "data": {},
    "message": "Passwrod Changed Successfully",
    "success": true
}`
      },
      {
        name: "Current_User",
        method: "GET",
        description: "Get currect Authenticated User",
        image: "/social_media/current_user.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/users/current-user",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": 200,
    "data": {
        "_id": "68b95b9e77a0e024719b2c5d",
        "username": "testliveapireal3",
        "email": "testliveapireal3@gmail.com",
        "fullName": "test_llive_3",
        "avatar": "http://res.cloudinary.com/ytsobhan/video/upload/v1756978077/knsboxjmf1bjbtmaobe0.mp4",
        "coverImage": "http://res.cloudinary.com/ytsobhan/image/upload/v1756978078/blqbbxvcxhchlri7r2rc.jpg",
        "watchHistory": [],
        "createdAt": "2025-09-04T09:27:58.780Z",
        "updatedAt": "2025-10-23T03:53:44.625Z",
        "__v": 0
    },
    "message": "User fetched successfully",
    "success": true
}`
      },
      {
        name: "update_account",
        method: "POST",
        description: "Update Your Account Details",
        image: "/social_media/update_account_details.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/users/update-account",
        input: `{
    "fullName" : "testliveapireal4",
    "email" : "testliveapireal3@gmail.com"
}`,
        output: `{
    "statusCode": 200,
    "data": {
        "_id": "68b95b9e77a0e024719b2c5d",
        "username": "testliveapireal3",
        "email": "testliveapireal3@gmail.com",
        "fullName": "testliveapireal4",
        "avatar": "http://res.cloudinary.com/ytsobhan/video/upload/v1756978077/knsboxjmf1bjbtmaobe0.mp4",
        "coverImage": "http://res.cloudinary.com/ytsobhan/image/upload/v1756978078/blqbbxvcxhchlri7r2rc.jpg",
        "watchHistory": [],
        "createdAt": "2025-09-04T09:27:58.780Z",
        "updatedAt": "2025-10-23T04:02:19.520Z",
        "__v": 0,
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI5NWI5ZTc3YTBlMDI0NzE5YjJjNWQiLCJlbWFpbCI6InRlc3RsaXZlYXBpcmVhbDNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0bGl2ZWFwaXJlYWwzIiwiZnVsbE5hbWUiOiJ0ZXN0X2xsaXZlXzMiLCJpYXQiOjE3NjExOTEyNDYsImV4cCI6MTc2MjA1NTI0Nn0.dy22O5QKj3TBCbtKbK-8xt4KX8uvL8lezno-MoyGqX8"
    },
    "message": "Account details updated successfully",
    "success": true
}`
      },
      {
        name: "update_Avatar",
        method: "PATCH",
        description: "Update Your Avtar Details",
        image: "/social_media/update_avtar.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/users/update-avatar",
        input: `{
    avatar : "PROVIDE IMAGE URL"
}`,
        output: `{
    "statusCode": 200,
    "data": {
        "_id": "68b95b9e77a0e024719b2c5d",
        "username": "testliveapireal3",
        "email": "testliveapireal3@gmail.com",
        "fullName": "testliveapireal4",
        "avatar": "http://res.cloudinary.com/ytsobhan/image/upload/v1761192324/y25hln8qwugeekoklrdd.jpg",
        "coverImage": "http://res.cloudinary.com/ytsobhan/image/upload/v1756978078/blqbbxvcxhchlri7r2rc.jpg",
        "watchHistory": [],
        "password": "$2b$10$dx1HZZPMW67kDSMsJtvPwOCkJXuhSOrNqflZMJ2MJLTNiNmHTFEvG",
        "createdAt": "2025-09-04T09:27:58.780Z",
        "updatedAt": "2025-10-23T04:05:25.717Z",
        "__v": 0,
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI5NWI5ZTc3YTBlMDI0NzE5YjJjNWQiLCJlbWFpbCI6InRlc3RsaXZlYXBpcmVhbDNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0bGl2ZWFwaXJlYWwzIiwiZnVsbE5hbWUiOiJ0ZXN0X2xsaXZlXzMiLCJpYXQiOjE3NjExOTEyNDYsImV4cCI6MTc2MjA1NTI0Nn0.dy22O5QKj3TBCbtKbK-8xt4KX8uvL8lezno-MoyGqX8"
    },
    "message": "Avatar image updated successfully",
    "success": true
}`
      },
      {
        name: "update_Cover_Image",
        method: "PATCH",
        description: "Update Your Cover Image Details",
        image: "/social_media/update_cover.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/users/update-cover-image",
        input: `{
    avatar : "PROVIDE IMAGE URL"
}`,
        output: `{
    "statusCode": 200,
    "data": {
        "_id": "68b95b9e77a0e024719b2c5d",
        "username": "testliveapireal3",
        "email": "testliveapireal3@gmail.com",
        "fullName": "testliveapireal4",
        "avatar": "http://res.cloudinary.com/ytsobhan/image/upload/v1761192324/y25hln8qwugeekoklrdd.jpg",
        "coverImage": "http://res.cloudinary.com/ytsobhan/video/upload/v1761192532/giuinnh8zbfnsax5we3c.mp4",
        "watchHistory": [],
        "password": "$2b$10$dx1HZZPMW67kDSMsJtvPwOCkJXuhSOrNqflZMJ2MJLTNiNmHTFEvG",
        "createdAt": "2025-09-04T09:27:58.780Z",
        "updatedAt": "2025-10-23T04:08:53.795Z",
        "__v": 0,
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI5NWI5ZTc3YTBlMDI0NzE5YjJjNWQiLCJlbWFpbCI6InRlc3RsaXZlYXBpcmVhbDNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0bGl2ZWFwaXJlYWwzIiwiZnVsbE5hbWUiOiJ0ZXN0X2xsaXZlXzMiLCJpYXQiOjE3NjExOTEyNDYsImV4cCI6MTc2MjA1NTI0Nn0.dy22O5QKj3TBCbtKbK-8xt4KX8uvL8lezno-MoyGqX8"
    },
    "message": "Cover Image is uploaded successfully",
    "success": true
}`
      },
      {
        name: "User_Channel_Profile",
        method: "GET",
        description: "Get_User_Channel_Profile",
        image: "/social_media/user_channel_profile.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/users/c/{{username}}",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": 200,
    "data": {
        "_id": "68b95b9e77a0e024719b2c5d",
        "username": "testliveapireal3",
        "email": "testliveapireal3@gmail.com",
        "avatar": "http://res.cloudinary.com/ytsobhan/image/upload/v1761192324/y25hln8qwugeekoklrdd.jpg",
        "coverImage": "http://res.cloudinary.com/ytsobhan/video/upload/v1761192532/giuinnh8zbfnsax5we3c.mp4",
        "subscribersCount": 0,
        "channelsSubscribeToCount": 0,
        "isSubscribed": false
    },
    "message": "user channel is fetched successfully",
    "success": true
}`
      },
      {
        name: "Watch_History",
        method: "GET",
        description: "Get users Watch History",
        image: "/social_media/get_Watch_History.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/users/history",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": 200,
    "data": [],
    "message": "Watch history fetched successfully",
    "success": true
}`
      },
      {
        name: "Publish_Video",
        method: "POST",
        description: "Publish a video to the platfrom",
        image: "/social_media/publish_video.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/video/upload-video",
        input: `{
          "title" : "live test content api",
          "description" : "this is live test of apis",
          "videoFile" : "give a video file url",
          "thumbnail" : "give a thumbnail file url"
}`,
        output: `{
    "statusCode": 200,
    "data": {
        "videoFile": {
            "url": "http://res.cloudinary.com/ytsobhan/video/upload/v1761196157/cyfwggh7ugbu9nhntvuw.mp4",
            "public_id": "cyfwggh7ugbu9nhntvuw",
            "_id": "68f9b87f2000396fe6d467c9"
        },
        "thumbnail": {
            "url": "http://res.cloudinary.com/ytsobhan/image/upload/v1761196158/kdocmmrjtnhve5y2ryws.png",
            "public_id": "kdocmmrjtnhve5y2ryws",
            "_id": "68f9b87f2000396fe6d467ca"
        },
        "title": "live test content api",
        "description": "this is live test of apis",
        "duration": 5.667,
        "views": 0,
        "isPublished": false,
        "owner": "68b95b9e77a0e024719b2c5d",
        "_id": "68f9b87f2000396fe6d467c8",
        "createdAt": "2025-10-23T05:09:19.384Z",
        "updatedAt": "2025-10-23T05:09:19.384Z",
        "__v": 0
    },
    "message": "video uploaded successfully",
    "success": true
}`
      },
      {
        name: "toggle_video",
        method: "PATCH",
        description: "Publish a video to the platfrom",
        image: "/social_media/toogle_video.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/video/toggle/publish/{{Video_Id}}",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": 200,
    "data": {
        "isPublished": true
    },
    "message": "video status updated successfully",
    "success": true
}`
      },
      {
        name: "Update_Video_Fields",
        method: "PATCH",
        description: "Update the title or description of the video content",
        image: "/social_media/update_video_fields.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/video/update-video-fields/{{Video_Id}}",
        input: `{
    "title" : "new live url test title",
    "description" : "new live url test description"
}`,
        output: `{
    "statusCode": 200,
    "data": "video field are updated successfully",
    "message": "Success",
    "success": true
}`
      },
      {
        name: "Update_Video_Thumbnail",
        method: "PATCH",
        description: "Update the thumbnail of video content",
        image: "/social_media/update_video_thumbnail.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/video/update-video-thumbnail/{{Video_Id}}",
        input: `{
      "thumbnail" : "Put a Thumbnail Url"
}`,
        output: `{
    "statusCode": 200,
    "data": "video thumbnail are updated successfully",
    "message": "Success",
    "success": true
}`
      },
      {
        name: "Get_video_By_Id",
        method: "GET",
        description: "Get The Video by their Id",
        image: "/social_media/Get_Video_By_Id.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/video/getVideoById/{{Video_Id}}",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": 200,
    "data": {
        "_id": "68f9b87f2000396fe6d467c8",
        "videoFile": {
            "url": "http://res.cloudinary.com/ytsobhan/video/upload/v1761196157/cyfwggh7ugbu9nhntvuw.mp4"
        },
        "title": "new live url test title",
        "description": "new live url test description",
        "duration": 5.667,
        "views": 0,
        "owner": {
            "_id": "68b95b9e77a0e024719b2c5d",
            "username": "testliveapireal3",
            "avatar": "http://res.cloudinary.com/ytsobhan/image/upload/v1761192324/y25hln8qwugeekoklrdd.jpg",
            "subscribersCount": 0,
            "isSubscribed": false
        },
        "createdAt": "2025-10-23T05:09:19.384Z",
        "comments": [],
        "likesCount": 0,
        "isLiked": false
    },
    "message": "Video details fetched successfully",
    "success": true
}`
      },
      {
        name: "All_video_By_User",
        method: "GET",
        description: "Get the all video of user has published .",
        image: "/social_media/Get_All_video_Of_publised_By_user.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/video/getVideoById/{{Video_Id}}",
        input: `NOT REQUIRED`,
        output: `{{
    "statusCode": 200,
    "data": {
        "docs": [
            {
                "_id": "68f9b87f2000396fe6d467c8",
                "videoFile": {
                    "url": "http://res.cloudinary.com/ytsobhan/video/upload/v1761196157/cyfwggh7ugbu9nhntvuw.mp4",
                    "public_id": "cyfwggh7ugbu9nhntvuw",
                    "_id": "68f9b87f2000396fe6d467c9"
                },
                "thumbnail": {
                    "url": "http://res.cloudinary.com/ytsobhan/image/upload/v1761202801/lmenjmyn9qpiqwve4zll.png",
                    "public_id": "lmenjmyn9qpiqwve4zll",
                    "_id": "68f9d272983d0c9603d69352"
                },
                "title": "new live url test title",
                "description": "new live url test description",
                "duration": 5.667,
                "views": 1,
                "isPublished": true,
                "owner": "68b95b9e77a0e024719b2c5d",
                "createdAt": "2025-10-23T05:09:19.384Z",
                "updatedAt": "2025-10-23T07:04:22.726Z",
                "__v": 0,
                "ownerDetails": {
                    "_id": "68b95b9e77a0e024719b2c5d",
                    "username": "testliveapireal3",
                    "avatar": "http://res.cloudinary.com/ytsobhan/image/upload/v1761192324/y25hln8qwugeekoklrdd.jpg"
                }
            }
        ],
        "totalDocs": 1,
        "limit": 10,
        "page": 1,
        "totalPages": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    },
    "message": "videos fetched successfully",
    "success": true
}`
      },
      {
        name: "delete_the_video",
        method: "DELETE",
        description: "Delete the video by there Id",
        image: "/social_media/delete_the_video.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/video/d/{{Video_Id}}",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": 200,
    "data": {},
    "message": "video delted successfully",
    "success": true
}`
      },
      {
        name: "create_tweet",
        method: "POST",
        description: "Create the tweet . ",
        image: "/social_media/create_tweet.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/tweet/createTweet",
        input: `{
     "content" : "helllo guys this is my new tweet live api test"
}`,
        output: `{
    "statusCode": 200,
    "data": {
        "content": "helllo guys this is my new tweet live api test",
        "owner": "68b95b9e77a0e024719b2c5d",
        "_id": "68fa2d7346f73d48e5702b44",
        "createdAt": "2025-10-23T13:28:19.645Z",
        "updatedAt": "2025-10-23T13:28:19.645Z",
        "__v": 0
    },
    "message": "Tweet created successfully. ✅",
    "success": true
}`
      },
      {
        name: "update_tweet",
        method: "PATCH",
        description: "update the existing tweet . ",
        image: "/social_media/update_tweet.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/tweet/updateTweet/{{YOUR_TWEET_ID}}",
        input: `{
    "content" : "helllo guys this is my new tweet live api test updated"
}`,
        output: `{
    "statusCode": 200,
    "data": {
        "_id": "68fa2d7346f73d48e5702b44",
        "content": "helllo guys this is my new tweet live api test updated",
        "owner": "68b95b9e77a0e024719b2c5d",
        "createdAt": "2025-10-23T13:28:19.645Z",
        "updatedAt": "2025-10-23T14:09:49.287Z",
        "__v": 0
    },
    "message": "Tweet updated successfully ✅",
    "success": true
}`
      },
      {
        name: "Get_User_Tweets",
        method: "GET",
        description: "Get the tweets which is create by that particular user .",
        image: "/social_media/get_user_tweets.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/tweet/user/{{USER_ID}}",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": 200,
    "data": "Tweets fetched successfully",
    "message": [
        {
            "_id": "68fa2d7346f73d48e5702b44",
            "content": "helllo guys this is my new tweet live api test updated",
            "createdAt": "2025-10-23T13:28:19.645Z",
            "ownerInfo": [
                {
                    "_id": "68b95b9e77a0e024719b2c5d",
                    "username": "testliveapireal3"
                }
            ],
            "commentsInfo": [],
            "likesCount": 0,
            "commentsCount": 0,
            "isLiked": false
        }
    ],
    "success": true
}`
      },
      {
        name: "delete_tweets",
        method: "DELETE",
        description: "Delete the tweet .",
        image: "/social_media/delete_Tweets.png",
        endpoint: "https://social-media-3cdj.onrender.com/api/v1/tweet/tweet/deleteTweet/{{TWEET_ID}}",
        input: `NOT REQUIRED`,
        output: `{
    "statusCode": 200,
    "data": {
        "tweetId": "68fa2d7346f73d48e5702b44"
    },
    "message": "Tweet deleted successfully",
    "success": true
}`
      },
    ]
  }
];

apiGroups.forEach(group => {
  group.apis.forEach(api => {
    api.codeSamples = generateCodeSamples(api.method, api.endpoint, api.input);
  });
});