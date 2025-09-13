# Quote Posts - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/posts/quote-posts

Quote Posts - Threads API - Documentation - Meta for Developers

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

# Quote Posts

You can use the Threads API to quote another post.

## Publishing

You can quote another post when making a request to the `POST /threads` endpoint to [create a media object](../posts-step-1--create-a-threads-media-container.md). Make sure to include the following parameter with your API request:

* `quote_post_id` — ID of another post that you want to quote.

### Example Request

```
curl -i -X POST \  
  "https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads?media_type=IMAGE&image_url=https://www.example.com/images/bronz-fonz.jpg&text=BronzFonz&access_token=<ACCESS_TOKEN>" 
  -d quote_post_id="1234567"
```

### Example Response

```
{
  "id": "1234567" // Threads Media Container ID
}
```

The request above creates a Threads post container that, once [published](../posts-step-2--publish-a-threads-media-container.md), will have a quote reference to the specified post.

## Media Retrieval

All quote posts will be labeled accordingly when retrieved. Make a request to the `GET /threads` or `GET /{threads_media_id}` endpoint to [retrieve media object(s)](../threads-media.md). Make sure to include the following fields with your API request:

* `is_quote_post` — A boolean field indicating whether a post is a quote post or not.
* `quoted_post` — Media ID of the post that was quoted.

### Example Request

```
curl -s -X GET \ 
  "https://graph.threads.net/v1.0/<THREADS_MEDIA_ID>?fields=id,is_quote_post,quoted_post&access_token=<ACCESS_TOKEN>"
```

### Example Response

```
{
   "id": "12312312312123",
   "is_quote_post": true,
   "quoted_post": {
     "id": "22312312312123"
   }
}
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)