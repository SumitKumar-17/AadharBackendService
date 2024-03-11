#AadharBackend

Clone the project :
```python
https://github.com/SumitKumar-17/AadharBackendService.git
```
Navigate into the Project and install the dependencies.
```python
cd AadharBackendService
npm install
```

Finally start the Project
```python
npm start
```

Set the environment variables is .env file 
Set the Mongo DB Connection String and the Port Number.
```python
MONGO_URI="your connection string"
PORT=8000
```

Request and Response Format for all the APIs

Request:
For **POST** /aadhaar/create
```python
{
  "Name":"Sumit Kumar",
  "FingerPrintCode":"rwertuiuop",
  "Address":"hvadvahkvfv",
  "EyeScanCode":"qgerryuiop",
  "PhoneNumber":"1234567890",
  "VID":"qwertyui1p",
  "panCard":"1234567090",
  "AadharNumber":"1234123412341239"
}
```

Response:
```python
{
  "message": "New Aadhar User Created Successfully",
  "result": {
    "AadharNumber": "1234123412341239",
    "Name": "Sumit Kumar",
    "FingerPrintCode": "cndlcnR1aXVvcA==",
    "Address": "hvadvahkvfv",
    "EyeScanCode": "cWdlcnJ5dWlvcA==",
    "PhoneNumber": "1234567890",
    "VID": "qwertyui1p",
    "panCard": "1234567090",
    "_id": "65ef017e453b8db23125541d",
    "createdAt": "2024-03-11T13:05:02.974Z",
    "updatedAt": "2024-03-11T13:05:02.974Z",
    "__v": 0
  }
}
```


Request:
For **POST** /aadhar/authenticate
```python
{
  "FingerPrintCode":"rwertuiuop",
  "EyeScanCode":"qgerryuiop"
}
```
Response:
```python
{
  "message": "Aadhar User Authenticated",
  "result": [
    {
      "_id": "65ef017e453b8db23125541d",
      "AadharNumber": "1234123412341239",
      "Name": "Sumit User2",
      "FingerPrintCode": "cndlcnR1aXVvcA==",
      "Address": "hvadvgcfuhjvhjahkvfv",
      "EyeScanCode": "cWdlcnJ5dWlvcA==",
      "PhoneNumber": "1277567890",
      "VID": "qweuuutyui",
      "panCard": "1234677090",
      "createdAt": "2024-03-11T13:05:02.974Z",
      "updatedAt": "2024-03-11T14:42:10.960Z",
      "__v": 0
    }
  ]
}
```

Request:
For **POST** /aadhar/aadhardetails
```python
{
  "FingerPrintCode":"rwertuiuop",
  "EyeScanCode":"qgerryuiop",
  "AadharNumber":"1234123412341239"
}
```

Response:
```python
{
  "AadharNumber": "1234123412341239",
  "Name": "Sumit User2",
  "Address": "hvadvgcfuhjvhjahkvfv",
  "PhoneNumber": "1277567890",
  "VID": "qweuuutyui",
  "panCard": "1234677090",
  "FingerPrintCode": "rwertuiuop",
  "EyeScanCode": "qgerryuiop"
}
```

Request:
For **POST** /aadhar/update
```python
{
  "Name":"Sumit User2",
  "FingerPrintCode":"rwertuiuop",
  "Address":"hvadvgcfuhjvhjahkvfv",
  "EyeScanCode":"qgerryuiop",
  "PhoneNumber":"1277567890",
  "VID":"qweuuutyui",
  "panCard":"1234677090",
  "AadharNumber":"1234123412341239"
}
```
Response:
```python
{
  "message": "Aadhar User Updated Successfully",
  "result": {
    "_id": "65ef017e453b8db23125541d",
    "AadharNumber": "1234123412341239",
    "Name": "Sumit User2",
    "FingerPrintCode": "cndlcnR1aXVvcA==",
    "Address": "hvadvgcfuhjvhjahkvfv",
    "EyeScanCode": "cWdlcnJ5dWlvcA==",
    "PhoneNumber": "1277567890",
    "VID": "qweuuutyui",
    "panCard": "1234677090",
    "createdAt": "2024-03-11T13:05:02.974Z",
    "updatedAt": "2024-03-11T14:45:14.183Z",
    "__v": 0
  }
}
```



