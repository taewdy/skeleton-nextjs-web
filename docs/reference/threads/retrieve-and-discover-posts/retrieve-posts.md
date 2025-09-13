# Retrieve User Posts - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/retrieve-and-discover-posts/retrieve-posts

Retrieve User Posts - Threads API - Documentation - Meta for Developers

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

# Retrieve User Posts

This document shows you how to retrieve:

* [A list of all threads created by an app-scoped user](#retrieve-a-list-of-an-app-scoped-user-s-threads)
* [A list of all threads created by a public profile](#retrieve-a-list-of-a-public-profile-s-threads)
* [A single Threads media object](#retrieve-a-single-threads-media-object)

## Retrieve a List of an App-Scoped User's Threads

Use the `GET /{threads-user-id}/threads` endpoint to return a paginated list of all threads created by a user.

### Permissions

The Threads Retrieval API requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.

### Limitations

* You may only fetch a paginated list of all threads created by the app-scoped user.

### Fields

Here's a list of fields that can be returned for each Thread.

Name | Description || `id` (default) | The media's ID. |
| `media_product_type` | Surface where the media is published. In the case of Threads, the value is `THREADS`. |
| `media_type` | The media type for a Threads post will be one of these values: `TEXT_POST`, `IMAGE`, `VIDEO`, `CAROUSEL_ALBUM`, `AUDIO`, or `REPOST_FACADE`. |
| `media_url` | The post’s media URL. |
| `permalink` | Permanent link to the post. Will be omitted if the media contains copyrighted material or has been flagged for a copyright violation. |
| `owner` | Threads user ID who created the post.  **Note:** This is only available on top-level posts that you own. |
| `username` | Threads username who created the post. |
| `text` | Represents text for a Threads post. |
| `timestamp` | Post time. The publish date in ISO 8601 format. |
| `shortcode` | Shortcode of the media. |
| `thumbnail_url` | URL of thumbnail. This only shows up for Threads media with video. |
| `children` | List of child posts. This only shows up for carousel posts. |
| `is_quote_post` | Indicates if the media is a quoted post made by another user. |
| `quoted_post` | Media ID of the post that was quoted.  **Note**: This only appears on quote posts. |
| `reposted_post` | Media ID of the post that was reposted.  **Note**: This only appears on reposts. |
| `alt_text` | The accessibility text label or description for an image or video in a Threads post. |
| `link_attachment_url` | The URL attached to a Threads post. |
| `gif_url` | The URL of the GIF attached to the post (if any).  **Note:** This will only show up on posts that have a GIF attachment. |
| `poll_attachment` | The poll attachment for the post.  **Note:** This will only show up on posts that have a poll. |
| `topic_tag` | The topic tag in the post's header (if any).  **Note:** This will only show up on posts that have a topic tag. |

### Example Request

```
curl -s -X GET \
"https://graph.threads.net/v1.0/me/threads?fields=id,media_product_type,media_type,media_url,permalink,owner,username,text,topic_tag,timestamp,shortcode,thumbnail_url,children,is_quote_post&since=2023-10-15&until=2023-11-18&limit=1&access_token=<ACCESS_TOKEN>"
```

### Example Response

```
{
  "data": [
    {
      "id": "1234567",
      "media_product_type": "THREADS",
      "media_type": "TEXT_POST",
      "permalink": "https://www.threads.net/@threadsapitestuser/post/abcdefg",
      "owner": {
        "id": "1234567"
      },
      "username": "threadsapitestuser",
      "text": "Today Is Monday",
      "topic_tag": "Mondays",
      "timestamp": "2023-10-17T05:42:03+0000",
      "shortcode": "abcdefg",
      "is_quote_post": false
    },
  ],
  "paging": {
    "cursors": {
      "before": "BEFORE_CURSOR",
      "after": "AFTER_CURSOR"
    }
  }
}
```

## Retrieve a List of a Public Profile's Threads

Use the `GET /profile_posts?username=...` endpoint to look up a public profile and retrieve a paginated list of their posts on Threads.

### Permissions

The Threads Profile Discovery API requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.
* `threads_profile_discovery` — Required for making any calls to all Threads Profile Discovery API endpoints.

With [standard access](/docs/graph-api/overview/access-levels), only posts from some of the official Meta accounts can be retrieved. These include @meta, @threads, @instagram, and @facebook.

### Limitations

* Only returns public profiles with a minimum age of 18 years and at least 1,000 followers.
* A user can send a maximum of 1,000 requests within a rolling 24-hour period. Once a query is sent, it will count against this limit for 24 hours.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `username`  string | **Required.**  Unique username on Threads. Must be an exact match. |

### Fields

The same fields as those for an [app-scoped user's posts](retrieve-posts-fields.md) can be retrieved except for the `owner` field.

### Example Request

```
curl -i -X GET \ 
  "https://graph.threads.net/v1.0/profile_posts?access_token=<THREADS_TESTER_ACCESS_TOKEN>&username=<THREADS_USERNAME>&fields=id,media_product_type,media_type,media_url,permalink,username,text,topic_tag,timestamp,shortcode,thumbnail_url,children,is_quote_post&since=2023-10-15&until=2023-11-18&limit=1"
```

### Example Response

```
{
  "data": [
    {
      "id": "1234567",
      "media_product_type": "THREADS",
      "media_type": "TEXT_POST",
      "permalink": "https://www.threads.net/@meta/post/abcdefg",
      "username": "meta",
      "text": "Today Is Monday",
      "topic_tag": "Mondays",
      "timestamp": "2023-10-17T05:42:03+0000",
      "shortcode": "abcdefg",
      "is_quote_post": true
    },
  ],
  "paging": {
    "cursors": {
      "before": "BEFORE_CURSOR",
      "after": "AFTER_CURSOR"
    }
  }
}
```

## Retrieve a Single Threads Media Object

You can also use the `GET /{threads-media-id}` endpoint to return an single Threads media object.

### Permissions

The Threads Retrieval API requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.

If your app has not been approved for [advanced access](/docs/graph-api/overview/access-levels) for the `threads_basic` permission, only posts created by a Threads tester are retrievable. After approval, public posts created by other users will be retrievable.

### Fields

The same fields as those for an [app-scoped user's posts](retrieve-posts-fields.md) can be retrieved.

### Example Request

```
curl -s -X GET \
"https://graph.threads.net/v1.0/<THREADS_MEDIA_ID>?fields=id,media_product_type,media_type,media_url,permalink,owner,username,text,topic_tag,timestamp,shortcode,thumbnail_url,children,is_quote_post&access_token=<ACCESS_TOKEN>"
```

### Example Response

```
{
  "id": "1234567",
  "media_product_type": "THREADS",
  "media_type": "TEXT_POST",
  "permalink": "https://www.threads.net/@threadsapitestuser/post/abcdefg",
  "owner": {
    "id": "1234567"
  },
  "username": "meta",
  "text": "Today Is Monday",
  "topic_tag": "Mondays",
  "timestamp": "2023-10-09T23:18:27+0000",
  "shortcode": "abcdefg",
  "is_quote_post": false
}
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)