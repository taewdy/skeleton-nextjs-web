# Mentions - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/threads-mentions

Mentions - Threads API - Documentation - Meta for Developers

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

# Mentions

Returns a list of public Threads media objects in which a Threads profile has been tagged by another Threads profile.

### Permissions

The Threads Mentions API requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.
* `threads_manage_mentions` — Required for making any calls to the mentions endpoint.

If your app has not been approved for advanced access for the `threads_manage_mentions` permission, only mentions made by a Threads tester on the app will be returned. After approval, other users' public posts will be returned.

### Limitations

* Threads media objects created by private users will not be returned.
* The `since` parameter's timestamp must be greater than or equal to `1688540400` and less than the `until` parameter, which must be less than or equal to the current timestamp and greater than the `since` parameter.

## Retrieve Threads Mentions

### Fields

Use the `fields` parameter to specify [fields](threads-media-fields.md) you want included on any returned Threads media objects.

### Example Request

```
curl -s -X GET \
  https://graph.threads.net/<THREADS_USER_ID>/mentions?fields=<LIST_OF_FIELDS>&access_token=<ACCESS_TOKEN>
```

### Example Response

A successful API call returns a JSON-formatted object containing Threads media objects.

```
{
  "<FIELD>":"<VALUE>",
  ...
}
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)