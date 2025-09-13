# Accessibility - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/posts/accessibility

Accessibility - Threads API - Documentation - Meta for Developers

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

# Accessibility

To aid users who are visually impaired, you can use Threads API to set the accessibility label or alt text for each image or video that is attached to your post.

### Limitations

This feature isn't available for text-only posts. It will only work on image, video, and carousel posts.

## Publishing

Alt text can be configured when making a request to the `POST /threads` endpoint to [create a media object](../posts-step-1--create-a-threads-media-container.md). Make sure to include the following parameter with your API request:

* `alt_text` — (For images and videos only.) The accessibility text label or description for an image or video in a Threads post.

### Example Request

```
curl -i -X POST \  
  "https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads?media_type=IMAGE&image_url=https://www.example.com/images/bronz-fonz.jpg&text=BronzFonz&access_token=<ACCESS_TOKEN>" 
  -d alt_text="Photograph of Bronze Fonz Statue"
```

### Example Response

```
{
  "id": "1234567" // Threads Media Container ID
}
```

The request above creates a Threads post container that, [once published](../posts-step-2--publish-a-threads-media-container.md), will add a custom accessibility label to your media.

## Media Retrieval

The value for alt text can be retrieved when making a request to the `GET /threads` or `GET /{threads_media_id}` endpoint to retrieve media object(s). Make sure to include the following field with your API request:

* `alt_text` — The accessibility text label or description for an image or video in a Threads post.

### Example Request

```
curl -s -X GET \ 
  "https://graph.threads.net/v1.0/<THREADS_MEDIA_ID>?fields=id,alt_text&access_token=<ACCESS_TOKEN>"
```

### Example Response

```
{
   "id": "12312312312123",
   "alt_text": "Photograph of Bronze Fonz Statue",
}
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)