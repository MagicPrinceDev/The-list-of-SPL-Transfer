# Get SPL token transfer list

Reference: https://docs.hellomoon.io/

## Setting up the environment

Once you're gonna use the hellomoon api, you need to get the Hello Moon API key on their website.

`
YOUR_BEARER_TOKEN = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
`

## How to use API

`
    $> npm i @hellomoon/api@latest
`

```
    const { RestClient, TokenTransfersWithOwnerRequest } = require("@hellomoon/api");

    const client = new RestClient("{{YOUR_BEARER_TOKEN}}");

    client.send(new TokenTransfersWithOwnerRequest({
	    // ...your params
    }))
	.then(console.log)
	.catch(console.error);
```

