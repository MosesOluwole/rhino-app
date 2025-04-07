## Different ways as possible to recreate the Math.abs function in TypeScript

### We can check if the provided number is negative, if it is then return -n, else return n

```javascript
function abs(n) {
  return n < 0 ? -n : n;
}
```

### We can multiply the number by - 1 or 1 but this will depend on if the number provided is negative

```javascript
function abs(n) {
  return n * (n < 0 ? -1 : 1);
}
```

### We can square up the provided number and then find the square root

```javascript
function abs(n) {
  return Math.sqrt(n * n);
}
```

### We can substract the provided number if negative from 0 else we return the same number if positive

```javascript
function abs(n) {
  return n >= 0 ? n : 0 - n;
}
```

### We can store the provided number and its negative value in an array and then return the greater number

This will probably only work if the provided number is positive

```javascript
function abs(n) {
  const arrayStore = [n, -n];
  return n < 0 ? arr[1] : arr[0];
}
```
