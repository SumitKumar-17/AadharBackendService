#AadharBackend

Response Format
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

For **POST** /aadhar/authenticate
```python
{
  "FingerPrintCode":"rwertuiuop",
  "EyeScanCode":"qgerryuiop"
}
```
For **POST** /aadhar/authenticate
```python
{
  "FingerPrintCode":"rwertuiuop",
  "EyeScanCode":"qgerryuiop",
  "AadharNumber":"1234123412341239"
}
```
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




