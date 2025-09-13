# Create Replies - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/retrieve-and-manage-replies/create-replies

Create Replies - Threads API - Documentation - Meta for Developers

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

# Create Replies

### Permissions

To reply to a thread, you must meet one of the following permission requirements:

* You are the owner of the root thread post
* You have either the `threads_keyword_search` or the `threads_manage_mentions` permission.

## Respond to Replies

### Step 1: Use the `reply_to_id` parameter to reply to a specific reply under the root post.

#### Example Request

```
curl -X POST \
  -F "media_type=<MEDIA_TYPE>" \
  -F "text=<TEXT>" \
  -F "reply_to_id=<THREADS_ID>" \
  -F "access_token=<ACCESS_TOKEN>" \
"https://graph.threads.net/v1.0/me/threads"
```

#### Example Response

```
{
 "id": "1234567890"
}
```

### Step 2: Use the `POST /{threads-user-id}/threads_publish` endpoint to publish the reply container ID returned in the previous step.

It is recommended to wait on average 30 seconds before publishing a Threads media container to give our server enough time to fully process the upload. See the [media container status endpoint](../troubleshooting-publishing-does-not-return-a-media-id.md) for more details.

#### Parameters

* `creation_id` — Identifier of the Threads media container created from the `/threads` endpoint.

#### Example Request

```
curl -i -X POST \ 
  -F "creation_id=<MEDIA_CONTAINER_ID>" \
  -F "access_token=<ACCESS_TOKEN>" \
"https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads_publish"
```

#### Example Response

```
{
  "id": "1234567" // Threads Reply Media ID
}
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)