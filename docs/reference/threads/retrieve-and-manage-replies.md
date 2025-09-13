# Retrieve and Manage Replies - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/retrieve-and-manage-replies

Retrieve and Manage Replies - Threads API - Documentation - Meta for Developers

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

# Retrieve and Manage Replies

The Threads Reply Management API allows you to read and manage replies to users' own Threads.

## Permissions

The Threads Reply Management API requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.
* `threads_manage_replies` — Required for making `POST` calls to reply endpoints.
* `threads_read_replies` — Required for making `GET` calls to reply endpoints.

## Rate Limits

Threads profiles are limited to 1,000 API-published replies within a 24-hour moving period. You can retrieve a profile's current Threads replies rate limit usage with the `GET /{threads-user-id}/threads_publishing_limit` endpoint.

**Note:** This endpoint requires the `threads_basic`, `threads_content_publish`, and `threads_manage_replies` permissions.

#### Fields

Name | Description || `reply_quota_usage` | Threads reply publishing count over the last 24 hours. |
| `reply_config` | Threads reply publishing rate limit config object, which contains the `quota_total` and `quota_duration` fields. |

#### Example Request

```
curl -s -X GET \
  "https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads_publishing_limit?fields=reply_quota_usage,reply_config&access_token=<ACCESS_TOKEN>"
```

#### Example Response

```
{
  "data": [
    {
      "reply_quota_usage": 1,
      "reply_config": {
        "quota_total": 1000,
        "quota_duration": 86400
      }
    }
  ]
}
```

## Next Steps

* [Create Replies](retrieve-and-manage-replies/create-replies.md)
* [Retrieve Replies and Conversations](retrieve-and-manage-replies/replies-and-conversations.md)
* [Reply Management](reply-management.md)

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)