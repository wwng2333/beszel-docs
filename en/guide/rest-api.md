# REST API

Because Beszel is built on PocketBase, you can use the PocketBase [web APIs](https://pocketbase.io/docs/api-records/) and [client-side SDKs](https://pocketbase.io/docs/client-side-sdks/) to read or update data from outside Beszel itself.

## Basic example

This example uses the [PocketBase JS SDK](https://github.com/pocketbase/js-sdk) to read data from the `systems` collection.

```ts
import PocketBase from 'pocketbase'

const pb = new PocketBase('http://localhost:8090')

// authenticate as regular user
const userData = await pb.collection('users').authWithPassword('test@example.com', '123456')

// list and filter system records
const systems = await pb.collection('systems').getList(1, 20, {
	filter: 'status = "up" && created > "2024-06-01 10:00:00"',
})

console.log(systems)
```
