# App Access Tokens - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/get-started/app-access-tokens

App Access Tokens - Threads API - Documentation - Meta for Developers

![](https://facebook.com/security/hsts-pixel.gif)

[Threads API](../.md)

* [Overview](../overview.md)
* [Get Started](../get-started.md)
* [Create Posts](../create-posts.md)
* [Retrieve and Discover Posts](../retrieve-and-discover-posts.md)
* [Retrieve and Manage Replies](../retrieve-and-manage-replies.md)
* [Delete Posts](../posts/delete-posts.md)
* [Profiles](../threads-profiles.md)
* [Insights](../insights.md)
* [Webhooks](../webhooks.md)
* [oEmbed](../tools-and-resources/embed-a-threads-post.md)
* [Web Intents](../threads-web-intents.md)
* [Troubleshooting](../troubleshooting.md)
* [Reference](../reference.md)
* [Tools and Resources](../tools-and-resources.md)
* [Changelog](../changelog.md)

# App Access Tokens

App access tokens are used to make requests to the Threads API on behalf of an app rather than a user. Certain APIs require app access tokens instead of user access tokens, such as the [oEmbed API](../tools-and-resources/embed-a-threads-post.md).

## Generating an app access token

To generate an app access token, you need:

* Your Threads app ID
* Your Threads app secret

### Example request

```
curl -X GET https://graph.threads.net/oauth/access_token
  ?client_id=<APP_ID>
  &client_secret=<APP_SECRET>
  &grant_type=client_credentials
```

### Example response

```
{
  "access_token": "TH|<APP_ID>|<ACCESS_TOKEN>",
  "token_type": "bearer"
}
```

This call will return an app access token that can be used in place of a user access token to make API calls as noted above.

**Note:** Because this request uses your app secret, it must never be made in client-side code or in an app binary that could be decompiled. It is important that your app secret is never shared with anyone. Therefore, this API call should only be made using server-side code.

## Alternate method

There is another method to make calls to the Threads API on behalf of an app which doesn't require using a generated app access token. You can just pass your app ID and app secret as the `access_token` parameter when you make a call.

### Example request

```
curl -X GET https://graph.threads.net/<API_ENDPOINT>
  ?access_tokens=TH|<APP_ID>|<APP_SECRET>&...
```

The choice to use a generated access token or this method depends on where you hide your app secret.

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)