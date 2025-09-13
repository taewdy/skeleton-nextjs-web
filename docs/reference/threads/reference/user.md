# User - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/reference/user

User - Threads API - Documentation - Meta for Developers

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

# User

The Threads user endpoints allow you to retrieve a Threads user's posts, publishing limit, and profile. See [Threads Profiles](../threads-profiles.md) for more information.

## `GET /{threads-user-id}/threads`

Retrieve a paginated list of all Threads posts created by a user. See [Retrieve a List of an App-Scoped User's Threads](../retrieve-and-discover-posts/retrieve-posts-retrieve-a-list-of-an-app-scoped-user-s-threads.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-user-id`  string | **Required.**  The path parameter of the Threads user identifier. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `id` *(default)*, `media_product_type`, `media_type`, `media_url`, `permalink`, `owner`, `username`, `text`, `timestamp`, `shortcode`, `thumbnail_url`, `children`, `is_quote_post`, `alt_text`, `link_attachment_url`, `has_replies`, `reply_audience`, `quoted_post`, `reposted_post`, `gif_url` |
| `since` | **Optional.**  Query string parameter representing the start date for retrieval (must be a Unix timestamp or a date/time representation parseable by `strtotime();`, the timestamp must be greater than or equal to `1688540400` and less than the `until` parameter). |
| `until` | **Optional.**  Query string parameter representing the end date for retrieval (must be a Unix timestamp or a date/time representation parseable by `strtotime();`, the timestamp must be less than or equal to the current timestamp and greater than the `since` parameter). |
| `limit` | **Optional.**  Query string parameter representing the maximum number of media objects or records requested to return, default is **25** and maximum is **100** (only non-negative numbers are allowed). |
| `before` | **Optional.**  Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |
| `after` | **Optional.**  Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |

---

## `GET /{threads-user-id}?fields=id,username,...`

Retrieve profile information about a user on Threads. See [Retrieve a Threads App-Scoped User's Profile Information](../threads-profiles-retrieve-a-threads-user-s-profile-information.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-user-id`  string | **Required.**  The path parameter of the Threads user identifier. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `id` *(default)*, `username`, `name`, `threads_profile_picture_url`, `threads_biography`, `is_verified`, `recently_searched_keywords` |

---

## `GET /profile_lookup?username=...`

Look up a public profile and retrieve their basic profile information. See [Retrieve a Threads User's Public Profile Information](../threads-profiles-retrieve-a-threads-user-s-public-profile-information.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `username`  string | **Required.**  Handle or unique username on Threads. Must be an exact match. |

---

## `GET /profile_posts?username=...`

Look up a public profile and retrieve their posts on Threads. See [Retrieve a List of a Public Profile's Threads](../retrieve-and-discover-posts/retrieve-posts-retrieve-a-list-of-a-public-profile-s-threads.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `username`  string | **Required.**  Handle or unique username on Threads. Must be an exact match. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `id` *(default)*, `media_product_type`, `media_type`, `media_url`, `permalink`, `username`, `text`, `timestamp`, `shortcode`, `thumbnail_url`, `children`, `is_quote_post`, `alt_text`, `link_attachment_url`, `has_replies`, `reply_audience`, `quoted_post`, `reposted_post`, `gif_url` |
| `since` | **Optional.**  Query string parameter representing the start date for retrieval (must be a Unix timestamp or a date/time representation parseable by `strtotime();`, the timestamp must be greater than or equal to `1688540400` and less than the `until` parameter). |
| `until` | **Optional.**  Query string parameter representing the end date for retrieval (must be a Unix timestamp or a date/time representation parseable by `strtotime();`, the timestamp must be less than or equal to the current timestamp and greater than the `since` parameter). |
| `limit` | **Optional.**  Query string parameter representing the maximum number of media objects or records requested to return, default is **25** and maximum is **100** (only non-negative numbers are allowed). |
| `before` | **Optional.**  Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |
| `after` | **Optional.**  Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |

---

## `GET /{threads-user-id}/threads_publishing_limit`

Check the app user's current publishing rate limit usage. See [Rate Limiting](../overview-rate-limiting.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-user-id`  string | **Required.**  The path parameter of the Threads user identifier. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `quota_usage` *(default)*, `config`, `reply_quota_usage`, `reply_config`, `delete_quota_usage`, `delete_config`, `location_search_quota_usage`, `location_search_config` |

---

## `GET /{threads-user-id}/replies`

Retrieve a paginated list of all Threads replies created by a user. See [Retrieve a List of All a User's Replies](../reply-management-retrieve-a-list-of-all-a-user-s-replies.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-user-id`  string | **Required.**  The path parameter of the Threads user identifier. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `id` *(default)*, `media_product_type`, `media_type`, `media_url`, `permalink`, `username`, `text`, `timestamp`, `shortcode`, `thumbnail_url`, `children`, `is_quote_post`, `has_replies`, `root_post`, `replied_to`, `is_reply`, `is_reply_owned_by_me`, `reply_audience`, `quoted_post`, `reposted_post`, `gif_url` |
| `since` | **Optional.**  Query string parameter representing the start date for retrieval (must be a Unix timestamp or a date/time representation parseable by `strtotime();`, the timestamp must be greater than or equal to `1688540400` and less than the `until` parameter). |
| `until` | **Optional.**  Query string parameter representing the end date for retrieval (must be a Unix timestamp or a date/time representation parseable by `strtotime();`, the timestamp must be less than or equal to the current timestamp and greater than the `since` parameter). |
| `limit` | **Optional.**  Query string parameter representing the maximum number of media objects or records requested to return, default is **25** and maximum is **100** (only non-negative numbers are allowed). |
| `before` | **Optional.** Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |
| `after` | **Optional.**  Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |

---

## `GET /{threads-user-id}/mentions`

Retrieve a paginated list of all Threads posts where a user is mentioned. See [Mentions](../threads-mentions.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `fields`  string | **Optional.**  A comma-separated list of the [fields](../threads-media-fields.md) to be returned. If omitted, default fields will be returned. |
| `since` | **Optional.**  Query string parameter representing the start date for retrieval (must be a Unix timestamp or a date/time representation parseable by `strtotime();`, the timestamp must be greater than or equal to `1688540400` and less than the `until` parameter). |
| `until` | **Optional.**  Query string parameter representing the end date for retrieval (must be a Unix timestamp or a date/time representation parseable by `strtotime();`, the timestamp must be less than or equal to the current timestamp and greater than the `since` parameter). |
| `limit` | **Optional.**  Query string parameter representing the maximum number of media objects or records requested to return, default is **25** and maximum is **100** (only non-negative numbers are allowed). |
| `before` | **Optional.** Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |
| `after` | **Optional.**  Query string parameter representing a cursor that can be used for pagination, both `before` and `after` parameters cannot be passed at the same time. |

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)