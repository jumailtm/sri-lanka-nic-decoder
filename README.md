# Sri Lanka NIC Decoder

A lightweight JavaScript package to decode Sri Lankan NIC numbers and extract date of birth, gender and age.

## Features

- Supports new 12-digit Sri Lankan NIC numbers
- Supports old NIC numbers ending with V or X
- Extracts Date of Birth
- Detects Gender
- Calculates Age
- Simple reusable JavaScript class and function

## Installation

```bash
npm install sri-lanka-nic-decoder
```

## Usage

```js
const {
  SriLankaNIC
} = require("sri-lanka-nic-decoder");

const result = SriLankaNIC.decode("<NIC_NUMBER>");

console.log(result);
```

## Simple Function

```js
const {
  decodeSriLankaNIC
} = require("sri-lanka-nic-decoder");

const result = decodeSriLankaNIC("<NIC_NUMBER>");

console.log(result);
```

## Example Result

```js
{
  valid: true,
  dob: "DD-MMM-YYYY",
  dobISO: "YYYY-MM-DD",
  gender: "Male",
  age: 0,
  format: "new"
}
```

## Invalid NIC

```js
const result = SriLankaNIC.decode("INVALID_NIC");

console.log(result);
```

Output:

```js
{
  valid: false,
  error: "Invalid Sri Lankan NIC format."
}
```

## Privacy

This package does not send NIC numbers to any server.  
All decoding is performed locally in your JavaScript application.

## License

MIT License
