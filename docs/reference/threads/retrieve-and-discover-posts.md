# Retrieve and Discover Posts - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/retrieve-and-discover-posts

Retrieve and Discover Posts - Threads API - Documentation - Meta for Developers

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

# Retrieve and Discover Posts

You can search for posts using the keyword search or retrieve posts and mentions related to a specific user.

## Pagination

Retrieving a user's posts and mentions supports cursor-based pagination so the response will include `before` and `after` cursors if the response contains multiple pages of data. Unlike standard cursor-based pagination, however, the response will not include previous or next fields, so you will have to use the `before` and `after` cursors to construct previous and next query strings manually in order to page through the returned data set.

### Example Request

```
curl -s -X GET \
  https://graph.threads.net/17841405822304914/mentions?fields=id,username&access_token=EAADd...
```

### Example Response

```
{
  "data": [
    {
      "id": "18038...",
      "username": "keldo..."
    },
    {
      "id": "17930...",
      "username": "ashla..."
    },
    {
      "id": "17931...",
      "username": "jaypo..."
    }
  ]
}
```

## Next Steps

* [Retrieve Posts](retrieve-and-discover-posts/retrieve-posts.md)
* [Mentions](threads-mentions.md)
* [Keyword Search](keyword-search.md)

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)