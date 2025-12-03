### Why is Axios preferred over fetch?

- Simpler syntax, auto JSON transform, better error handling, interceptors.

```js
// With fetch
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(e => console.error(e));

// With axios
axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(res => console.log(res.data))
  .catch(e => console.error(e));
```

---

### How does Axios-Retry improve network reliability?

- Retries failed requests automatically for transient errors (like network drops or 5xx). Reduces manual retry logic.

```js
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });
```

---

### How to handle API failures gracefully in React Native?

- Show an error message, let user retry, prevent crashes.

```js
if (error) {
  return (
    <View>
      <Text>Error: {error.message}</Text>
      <Button title="Retry" onPress={fetchData} />
    </View>
  );
}
```



