# Reply Management - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/reply-management

Reply Management - Threads API - Documentation - Meta for Developers

![](https://facebook.com/security/hsts-pixel.gif)

[Threads API](.md)

* [Overview](overview.md)
* [Get Started](get-started.md)
* [Create Posts](create-posts.md)
* [Retrieve and Discover Posts](retrieve-and-discover-posts.md)
* [Retrieve and Manage Replies](retrieve-and-manage-replies.md)
* [Delete Posts](posts/delete-posts.md)
* [Profiles](threads-profiles.md)
* [Insights](insights.md)
* [Webhooks](webhooks.md)
* [oEmbed](tools-and-resources/embed-a-threads-post.md)
* [Web Intents](threads-web-intents.md)
* [Troubleshooting](troubleshooting.md)
* [Reference](reference.md)
* [Tools and Resources](tools-and-resources.md)
* [Changelog](changelog.md)

# Reply Management

The Threads Reply Management API allows you manage replies to users' own Threads.

## Hide Replies

Use the `/manage_reply` endpoint to hide/unhide any top-level replies. This will automatically hide/unhide all the nested replies. **Note:** Replies nested deeper than the top-level reply cannot be targeted in isolation to be hidden/unhidden.

#### Example Request

```
curl -X POST \
  -F "hide={true | false}" \
  -F "access_token=<ACCESS_TOKEN>" \
"https://graph.threads.net/v1.0/<THREADS_REPLY_ID>/manage_reply"
```

#### Example Response

```
{
 "success": true
}
```

## Control Who Can Reply

Use the `reply_control` parameter to specify who can reply to a post being created for publishing. This parameter accepts one of the five options: `everyone`, `accounts_you_follow`, `mentioned_only`, `parent_post_author_only`, and `followers_only`.

#### Example Request

```
curl -X POST \
  -F "media_type=<MEDIA_TYPE>" \
  -F "text=<TEXT>" \
  -F "reply_control=accounts_you_follow" \
  -F "access_token=<ACCESS_TOKEN>" \
"https://graph.threads.net/v1.0/me/threads"
```

#### Example Response

```
{
 "id": "1234567890"
}
```

Use the `POST /{threads-user-id}/threads_publish` endpoint to publish the media container ID returned in the previous step. It is recommended to wait on average 30 seconds before publishing a Threads media container to give our server enough time to fully process the upload. See the [media container status endpoint](troubleshooting-publishing-does-not-return-a-media-id.md) for more details.

#### Parameters

* `creation_id` — Identifier of the Threads media container created from the `/threads` endpoint.

#### Example Request

```
curl -i -X POST \ 
"https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads_publish?creation_id=<MEDIA_CONTAINER_ID>&access_token=<ACCESS_TOKEN>"
```

#### Example Response

```
{
  "id": "1234567" // Threads Media ID
}
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)