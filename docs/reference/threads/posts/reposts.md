# Reposts - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/posts/reposts

Reposts - Threads API - Documentation - Meta for Developers

![](https://facebook.com/security/hsts-pixel.gif)

[Threads API](../.md)

* [Overview](../overview.md)
* [Get Started](../get-started.md)
* [Create Posts](../create-posts.md)
* [Retrieve and Discover Posts](../retrieve-and-discover-posts.md)
* [Retrieve and Manage Replies](../retrieve-and-manage-replies.md)
* [Delete Posts](delete-posts.md)
* [Profiles](../threads-profiles.md)
* [Insights](../insights.md)
* [Webhooks](../webhooks.md)
* [oEmbed](../tools-and-resources/embed-a-threads-post.md)
* [Web Intents](../threads-web-intents.md)
* [Troubleshooting](../troubleshooting.md)
* [Reference](../reference.md)
* [Tools and Resources](../tools-and-resources.md)
* [Changelog](../changelog.md)

# Reposts

You can use the Threads API to repost another post.

## Publishing

You can repost another post when making a request to the `POST /{threads_id}/repost` endpoint. Make sure to include the Threads post ID with your API request:

### Example Request

```
curl -i -X POST \  "https://graph.threads.net/v1.0/<THREADS_POST_ID>/repost?access_token=<ACCESS_TOKEN>"
```

### Example Response

```
{
  "id": "1234567" // Threads Repost ID
}
```

The request above reposts an original Threads post. Once done, the reposted post will show up under the **Reposts** tab of the user's Threads profile.

## Media Retrieval

All reposts will have the media type of `REPOST_FACADE` when retrieved. Make a request to the `GET /threads` endpoint to retrieve the reposts. Make sure to include the following fields with your API request:

* `media_type` — A field indicating the type of Threads posts.
* `reposted_post` — Media ID of the post that was reposted.

### Example Request

```
curl -s -X GET \ "https://graph.threads.net/v1.0/<THREADS_MEDIA_ID>?fields=id,media_type,reposted_post&access_token=<ACCESS_TOKEN>"
```

### Example Response

```
{
   "id": "12312312312123",
   "media_type": "REPOST_FACADE",
   "reposted_post": {
     "id": "22312312312123"
   }
}
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)