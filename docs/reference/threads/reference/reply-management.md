# Reply Management - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/reference/reply-management

Reply Management - Threads API - Documentation - Meta for Developers

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

# Reply Management

The Threads reply management endpoints allow you to retrieve replies and conversations and hide/unhide replies. See [Threads Reply Management API](../reply-management.md) for more information.

## `GET /{threads-media-id}/replies`

Retrieve a paginated list of all top-level replies for a Threads media object. See [Replies](../reply-moderation-replies.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-media-id`  string | **Required.**  The path parameter of the Threads media identifier. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `id` *(default)*, `media_product_type`, `media_type`, `media_url`, `permalink`, `username`, `text`, `timestamp`, `shortcode`, `thumbnail_url`, `children`, `is_quote_post`, `has_replies`, `root_post`, `replied_to`, `is_reply`, `is_reply_owned_by_me`, `hide_status`, `reply_audience`, `quoted_post`, `reposted_post`, `gif_url`, `topic_tag` |
| `reverse`  Boolean | **Optional.**  Whether or not replies should be sorted in reverse chronological order.  **Values:** `true` *(default)*, `false` |
| `before` | **Optional.**  Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |
| `after` | **Optional.**  Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |

---

## `GET /{threads-media-id}/conversation`

Retrieve a paginated and flattened list of all top-level and nested replies for a Threads media object. See [Conversations](../reply-moderation-conversations.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-media-id`  string | **Required.**  The path parameter of the Threads media identifier. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `id` *(default)*, `media_product_type`, `media_type`, `media_url`, `permalink`, `username`, `text`, `timestamp`, `shortcode`, `thumbnail_url`, `children`, `is_quote_post`, `has_replies`, `root_post`, `replied_to`, `is_reply`, `is_reply_owned_by_me`, `hide_status`, `reply_audience`, `quoted_post`, `reposted_post`, `gif_url`, `topic_tag` |
| `reverse`  Boolean | **Optional.**  Whether or not replies should be sorted in reverse chronological order.  **Values:** `true` *(default)*, `false` |
| `before` | **Optional.**  Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |
| `after` | **Optional.**  Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |

## `POST /{threads-reply-id}/manage_reply`

Hide or unhide a top-level reply on your Threads post. See [Hide Replies](../reply-moderation-hide-replies.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-reply-id`  string | **Required.**  The path parameter of the Threads reply media identifier. |
| `hide`  Boolean | **Required.**  Set to `true` to hide a reply and set to `false` to unhide a reply.  **Values:** `true`, `false` |

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)