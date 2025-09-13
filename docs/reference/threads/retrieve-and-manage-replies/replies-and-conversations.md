# Retrieve Media Replies and Conversations - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/retrieve-and-manage-replies/replies-and-conversations

Retrieve Media Replies and Conversations - Threads API - Documentation - Meta for Developers

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

# Retrieve Media Replies and Conversations

There are two ways of retrieving a thread's replies: `GET {media-id}/replies` and `GET {media-id}/conversation`.

`GET {media-id}/replies` only returns the top-level replies under the Threads ID provided in the request, while `GET {media-id}/conversation` returns all replies, regardless of the depth, either in chronological or reverse chronological order.

### Parameters

These parameters are for both `GET {media-id}/replies` and `GET {media-id}/conversation`.

Name | Description || `reverse` | `true` if replies should be sorted in reverse chronological order. `false` if replies should be sorted in chronological order.  **Default:** `true` |

### Fields

These fields are for both `GET {media-id}/replies` and `GET {media-id}/conversation`.

Name | Description || `id` *(default)* | The media's ID. |
| `text` | Represents text for a Threads reply. This is optional on image, video, and carousel replies. |
| `username` | Threads username who created the post.  **Note:** This only works for public users, your own user, and users that you follow. |
| `permalink` | Permanent link to the post. Will be omitted if the media contains copyrighted material or has been flagged for a copyright violation.  **Note:** This only works for public users, your own user, and users that you follow. |
| `timestamp` | The publish date and time of the post in ISO 8601 format. |
| `media_product_type` | Surface where the media is published. In the case of Threads, the value is `THREADS`. |
| `media_type` | The media type for a Threads reply will be one of these values: `TEXT_POST`, `IMAGE`, `VIDEO`, `CAROUSEL_ALBUM`, or `AUDIO`. |
| `media_url` | The post’s media URL. This only shows for image, video, and carousel replies. |
| `shortcode` | Shortcode of the media. |
| `thumbnail_url` | URL of thumbnail. This only shows for Threads replies with video. |
| `children` | List of child posts. This only shows for carousel replies. |
| `is_quote_post` | Indicates if the media is a quoted reply made by another user. |
| `quoted_post` | Media ID of the post that was quoted.  **Note**: This only appears on quote posts. |
| `has_replies` | `true` if the Threads post or reply has replies that you can see. |
| `root_post` | Media ID of the top-level post or original thread in the reply tree.  **Note:** This only appears on replies. |
| `replied_to` | Media ID of the immediate parent of the reply.  **Note:** This only appears on replies. |
| `is_reply` | `true` if the Threads media is a reply. `false` if the Threads media is a top-level post. |
| `is_reply_owned_by_me` | `true` if your user is the owner of the Threads reply. `false` if another user is the owner of the Threads reply.  **Note:** This only appears on replies. |
| `hide_status` | Whether or not the reply is hidden.  **Values:** `NOT_HUSHED`, `UNHUSHED`, `HIDDEN`, `COVERED`, `BLOCKED`, `RESTRICTED`  **Note:** This only appears on replies. |
| `reply_audience` | Who can reply to your post.  **Values:** `EVERYONE`, `ACCOUNTS_YOU_FOLLOW`, `MENTIONED_ONLY`, `PARENT_POST_AUTHOR_ONLY`, `FOLLOWERS_ONLY`  **Note:** This only appears on top-level posts and replies that you own. |
| `gif_url` | The URL of the GIF attached to the post (if any).  **Note:** This will only show up on posts that have a GIF attachment. |
| `poll_attachment` | The poll attachment for the post.  **Note:** This will only show up on posts that have a poll. |
| `topic_tag` | The topic tag for the post (if any).  **Note:** This will only show up on posts that have a topic tag. |

## A Thread's Replies

Use `{media-id}/replies` to fetch a paginated list of all top-level replies.

This endpoint is applicable to the use cases that focus on the depth level of the replies. The endpoint returns the immediate replies of the requested Threads ID. `has_replies` indicates whether a Thread has nested replies or not and the field can be used to decide to chain further subsequent GET calls to retrieve replies located in the deeper levels.

#### Example Request

```
curl -s -X GET \
  "https://graph.threads.net/v1.0/<MEDIA_ID>/replies?fields=id,text,topic_tag,timestamp,media_product_type,media_type,media_url,shortcode,thumbnail_url,children,has_replies,root_post,replied_to,is_reply,hide_status&reverse=false&access_token=<ACCESS_TOKEN>"
```

#### Example Response

```
{
  "data": [
    {
      "id": "1234567890",
      "text": "First Reply",
      "topic_tag": "First Topic",
      "timestamp": "2024-01-01T18:20:00+0000",
      "media_product_type": "THREADS",
      "media_type": "TEXT_POST",
      "shortcode": "abcdefg",
      "has_replies": true,
      "root_post": {
        "id": "1234567890"
      },
      "replied_to": {
        "id": "1234567890"
      },
      "is_reply": true,
      "hide_status": "NOT_HUSHED"
    },
    {
      "id": "1234567890",
      "text": "Second Reply",
      "topic_tag": "Second Topic",
      "timestamp": "2024-01-01T18:20:00+0000",
      "media_product_type": "THREADS",
      "media_type": "TEXT_POST",
      "shortcode": "abcdefg",
      "has_replies": false,
      "root_post": {
        "id": "1234567890"
      },
      "replied_to": {
        "id": "1234567890"
      },
      "is_reply": true,
      "hide_status": "HIDDEN"
    },
    {
      "id": "1234567890",
      "text": "Third Reply",
      "topic_tag": "Third Topic",
      "timestamp": "2024-01-01T18:20:00+0000",
      "media_product_type": "THREADS",
      "media_type": "TEXT_POST",
      "shortcode": "abcdefg",
      "has_replies": false,
      "root_post": {
        "id": "1234567890"
      },
      "replied_to": {
        "id": "1234567890"
      },
      "is_reply": true,
      "hide_status": "UNHUSHED"
    }
  ],
  "paging": {
    "cursors": {
      "before": "BEFORE_CURSOR",
      "after": "AFTER_CURSOR"
    }
  }
}
```

## A Thread's Conversations

Use `{media-id}/conversation` to fetch a paginated and flattened list of all top-level and nested replies.

This endpoint is applicable to specific use cases that do not focus on the knowledge of the depthness of the replies. **Note:** This endpoint is only intended to be used on the root-level threads with replies.

#### Example Request

```
curl -s -X GET \
  "https://graph.threads.net/v1.0/<MEDIA_ID>/conversation?fields=id,text,timestamp,media_product_type,media_type,media_url,shortcode,thumbnail_url,children,has_replies,root_post,replied_to,is_reply,hide_status&reverse=false&access_token=<ACCESS_TOKEN>"
```

#### Example Response

```
{
  "data": [
    {
      "id": "1234567890",
      "text": "First Reply",
      "topic_tag": "First Topic",
      "timestamp": "2024-01-01T18:20:00+0000",
      "media_product_type": "THREADS",
      "media_type": "TEXT_POST",
      "shortcode": "abcdefg",
      "has_replies": true,
      "root_post": {
        "id": "1234567890"
      },
      "replied_to": {
        "id": "1234567890"
      },
      "is_reply": true,
      "hide_status": "NOT_HUSHED"
    },
    {
      "id": "1234567890",
      "text": "Second Reply",
      "topic_tag": "Second Topic",
      "timestamp": "2024-01-01T18:20:00+0000",
      "media_product_type": "THREADS",
      "media_type": "TEXT_POST",
      "shortcode": "abcdefg",
      "has_replies": false,
      "root_post": {
        "id": "1234567890"
      },
      "replied_to": {
        "id": "1234567890"
      },
      "is_reply": true,
      "hide_status": "HIDDEN"
    },
    {
      "id": "1234567890",
      "text": "Third Reply",
      "topic_tag": "Third Topic",
      "timestamp": "2024-01-01T18:20:00+0000",
      "media_product_type": "THREADS",
      "media_type": "TEXT_POST",
      "shortcode": "abcdefg",
      "has_replies": false,
      "root_post": {
        "id": "1234567890"
      },
      "replied_to": {
        "id": "1234567890"
      },
      "is_reply": true,
      "hide_status": "UNHUSHED"
    },
    {
      "id": "1234567890",
      "text": "Nested Reply",
      "topic_tag": "Nested Topic",
      "timestamp": "2024-01-01T18:20:00+0000",
      "media_product_type": "THREADS",
      "media_type": "TEXT_POST",
      "shortcode": "abcdefg",
      "has_replies": false,
      "root_post": {
        "id": "1234567890"
      },
      "replied_to": {
        "id": "1234567890"
      },
      "is_reply": true,
      "hide_status": "NOT_HUSHED"
    }
  ],
  "paging": {
    "cursors": {
      "before": "BEFORE_CURSOR",
      "after": "AFTER_CURSOR"
    }
  }
}
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)