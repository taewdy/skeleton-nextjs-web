# Media Retrieval - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/reference/media-retrieval

Media Retrieval - Threads API - Documentation - Meta for Developers

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

# Media Retrieval

You can retrieve Threads media objects by individual ID or by searching on a keyword. See [Retrieve Threads Media Objects](../threads-media.md) and [Keyword Search](../keyword-search.md) for more information on each method.

## `GET /{threads-media-id}`

Retrieve a Threads media object. See [Retrieve a Single Threads Media Object](../threads-media-retrieve-a-single-threads-media-object.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-media-id`  string | **Required.**  The path parameter of the Threads media identifier. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `id` *(default)*, `media_product_type`, `media_type`, `media_url`, `permalink`, `owner`, `username`, `text`, `timestamp`, `shortcode`, `thumbnail_url`, `children`, `is_quote_post`, `alt_text`, `link_attachment_url`, `has_replies`, `is_reply`, `is_reply_owned_by_me`, `root_post`, `replied_to`, `hide_status`, `reply_audience`, `quoted_post`, `reposted_post`, `gif_url`, `poll_attachment`, `topic_tag` |

---

## `GET /keyword_search`

Search for public Threads media with specific keywords or topic tags. See [Keyword Search](../keyword-search.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `q`  string | **Required.**  The keyword(s) to be queried. |
| `search_type`  string | **Optional.**  Specifies the search behavior.  **Values:**   * `TOP` (*default*) — To get the most popular search results. * `RECENT` — To get the most recent search results. |
| `search_mode`  string | **Optional.**  Specifies the search mode.  **Values:**   * `KEYWORD` (*default*) — The query will be treated as a keyword. * `TAG` — The query will be treated as a topic tag. |
| `media_type`  string | **Optional.**  Specifies the type of media to search for. Only the media type values listed below are supported.  **Values:**   * `TEXT` — The query will search for text posts. * `IMAGE` — The query will search for image posts. * `VIDEO` — The query will search for video posts. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `id` *(default)*, `media_product_type`, `media_type`, `media_url`, `permalink`, `username`, `text`, `timestamp`, `shortcode`, `thumbnail_url`, `children`, `is_quote_post`, `alt_text`, `link_attachment_url`, `has_replies`, `is_reply`, `root_post`, `replied_to`, `reply_audience`, `quoted_post`, `reposted_post`, `gif_url`, `poll_attachment`, `topic_tag` |
| `since` | **Optional.**  Query string parameter representing the start date for retrieval (must be a Unix timestamp or a date/time representation parseable by `strtotime();`, the timestamp must be greater than or equal to `1688540400` and less than the `until` parameter). |
| `until` | **Optional.**  Query string parameter representing the end date for retrieval (must be a Unix timestamp or a date/time representation parseable by `strtotime();`, the timestamp must be less than or equal to the current timestamp and greater than the `since` parameter). |
| `limit` | **Optional.**  Query string parameter representing the maximum number of media objects or records requested to return, default is **25** and maximum is **100** (only non-negative numbers are allowed). |

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)