# Publishing - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/reference/publishing

Publishing - Threads API - Documentation - Meta for Developers

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

# Publishing

The Threads publishing endpoints allow you to upload and publish Threads media objects and check their status. See [Post to Threads](../posts.md) for more information.

## `POST /{threads-user-id}/threads`

Upload media and create media containers. See [Posts](../posts.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-user-id`  string | **Required.**  The path parameter of the Threads user identifier. |
| `media_type`  string | **Required.**  **Values:** `TEXT`, `IMAGE`, `VIDEO`, `CAROUSEL` |
| `text`  string | **Optional.**  The text associated with the post. Uses [UTF-8 encoding](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fgrapheme-splitter&h=AT3p-EMCFvcHT8XkwRnc6CltYuwdueEOwBt7japMNsaCHksZK3dh_WPvv7GyVzgZbMrMT3hLFSRV0xZgx9g9sGR55cm0tQ9ddJDndVA_b_xOPx8jZjIuZMeDvUV3UGgs8qmpwtWcVv82KP_Rg-hp-hqbmY4). For text-only posts, this parameter is **required**. |
| `image_url`  string | **Optional.**  Required if `media_type=IMAGE`. |
| `video_url`  string | **Optional.**  Required if `media_type=VIDEO`. |
| `is_carousel_item`  Boolean | **Optional.**  **Values:** `true`, `false` (default) |
| `children`  array | **Optional.**  Required if `media_type=CAROUSEL`. |
| `reply_to_id`  string | **Optional.**  Required if replying to a post. |
| `reply_control`  string | **Optional.**  Can be used to specify who can reply to a post.  **Values:** `everyone`, `accounts_you_follow`, `mentioned_only`, `parent_post_author_only`, `followers_only` |
| `allowlisted_country_codes`  list<string> | **Optional.**  A string list of valid [ISO 3166-1 alpha-2 country codes](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fobp%2Fui%2F%23search&h=AT3szZrYuQhg3zZHSPWWCvZBjGMXDFwe4RO8CHR313N3TwqhbQC-NiaDG45x2VfPhnhrxQ4Uopsc-GwRWptbwhJAEqtLUZcUll_DNSHk_-dQ7FFXDlouKV6U3BiIKsg8zQnLYhrX6iFPWNMM1hxCEon8J-8) that represents the countries where this media should be shown. If this parameter is passed in, the media will not be shown to Threads profiles in countries outside of this list. |
| `alt_text`  string | **Optional.**  The accessibility text label or description for an image or video in a Threads post.  **Note:** The maximum length of `alt_text` is 1,000 characters. |
| `link_attachment`  string | **Optional.**  The URL attached to a Threads post. |
| `quote_post_id`  string | **Optional.**  ID of the post that is intended to be quoted. |
| `poll_attachment`  object | **Optional.**  The options for a post with a poll attachment. |
| `auto_publish_text`  Boolean | **Optional.**  When this optional flag is passed, a Threads post is published automatically when a Threads [media container](../posts-step-1--create-a-threads-media-container.md) is created without needing to go through the extra [publish step](../posts-step-2--publish-a-threads-media-container.md).  **Note:** This only works for text posts. |
| `topic_tag`  string | **Optional.**  The topic to add to a post.  **Note:** The following characters are not allowed in topic tags:   * Periods (.) * Ampersands (&) |

---

## `POST /{threads-user-id}/threads_publish`

Publish uploaded media using their media containers. See [Posts](../posts.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-user-id`  string | **Required.**  The path parameter of the Threads user identifier. |
| `creation_id`  string | **Required.**  Identifier of the Threads media container. |

---

## `GET /{threads-container-id}?fields=status`

Check the Threads media container publishing eligibility and status.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-container-id`  string | **Required.**  The path parameter of the Threads media container identifier. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `id` *(default)*, `status` *(default)*, `error_message` |

## `POST /{threads-media-id}/repost`

Repost a Threads post that was previously published. See [Reposts](../posts/reposts.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-media-id`  string | **Required.**  The path parameter of the Threads media identifier. |

## `DELETE /{threads-media-id}`

Delete a Threads post. See [Delete Posts](../posts/delete-posts.md) for more information.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `threads-media-id`  string | **Required.**  The path parameter of the Threads media identifier. |

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)