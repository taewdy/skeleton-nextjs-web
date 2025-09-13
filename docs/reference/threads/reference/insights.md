# Insights - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/reference/insights

Insights - Threads API - Documentation - Meta for Developers

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

# Insights

The Threads insights endpoints allow you to retrieve insights for Threads media objects and users. See [Threads Insights API](../insights.md) for more information.

## `GET /{threads-media-id}/insights`

Retrieve insights for a Threads media object. See [Media Insights](../insights-media-insights.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-media-id`  string | **Required.**  The path parameter of the Threads media identifier. |
| `metric`  string | **Required.**  A comma-separated list of the metrics to be returned. Must be at least one of the metric values.  **Values:** `views`, `likes`, `replies`, `reposts`, `quotes`, `shares` |

---

## `GET /{threads-user-id}/threads_insights`

Retrieve insights for a Threads user object. See [User Insights](../insights-user-insights.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-user-id`  string | **Required.**  The path parameter of the Threads user identifier. |
| `since` | **Optional.**  Used in conjunction with the `until` parameter to define a range. If you omit `since` and `until`, it defaults to a 2-day range: yesterday through today.  **Format:** Unix Timestamp |
| `until` | **Optional.**  Used in conjunction with the `since` parameter to define a range. If you omit `since` and `until`, it defaults to a 2-day range: yesterday through today.  **Format:** Unix Timestamp |
| `metric`  string | **Required.**  A comma-separated list of the metrics to be returned. Must be at least one of the metric values.  **Values:** `views`, `likes`, `replies`, `reposts`, `quotes`, `clicks`, `followers_count`, `follower_demographics`  **Note:** `follower_demographics` is not compatible with the `since` and `until` parameters. |

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)