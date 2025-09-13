# Insights - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/insights

Insights - Threads API - Documentation - Meta for Developers

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

# Threads Insights API

The Threads Insights API allows you to read the insights from users' own Threads.

### Permissions

The Threads Insights API requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.
* `threads_manage_insights` — Required for making `GET` calls to insights endpoints.

### Limitations

* The user insights `since` and `until` parameters do not work for dates before April 13, 2024 (Unix timestamp `1712991600`).

## Media Insights

To retrieve the available insights metrics, send a `GET` request to the `/{threads-media-id}/insights` endpoint with the `metric` parameter containing a comma-separated list of metrics to be returned.

**Note:**

* Returned metrics do not capture nested replies' metrics.
* An empty array will be returned for `REPOST_FACADE` posts because they are posts made by other users.

### Available Metrics

Name | Description || `views` | The number of times your post was played or displayed.  **Note:** This metric is [in development](https://www.facebook.com/business/help/metrics-labeling). |
| `likes` | The number of likes on the post. |
| `replies` | The number of replies on the post.  **Note:** When the requested media is a root post, this number includes total replies. If the media is itself a reply, this number includes only **direct** replies. |
| `reposts` | The number of times the post was reposted. |
| `quotes` | The number of times the post was quoted. |
| `shares` | The number of shares of your Threads posts.  **Note:** This metric is [in development](https://www.facebook.com/business/help/metrics-labeling). |

### Example Request

```
curl -s -X GET \
  -F "metric=likes,replies" \
	-F "access_token=<THREADS_ACCESS_TOKEN>"
"https://graph.threads.net/v1.0/<THREADS_MEDIA_ID>/insights"
```

### Example Response

```
{
  "data": [
    {
      "name": "likes",
      "period": "lifetime",
      "values": [
        {
          "value": 100
        }
      ],
      "title": "Likes",
      "description": "The number of likes on your post.",
      "id": "<media_id>/insights/likes/lifetime"
    },
    {
      "name": "replies",
      "period": "lifetime",
      "values": [
        {
          "value": 10
        }
      ],
      "title": "Replies",
      "description": "The number of replies on your post.",
      "id": "<media_id>/insights/replies/lifetime"
    }
  ]
}
```

## User Insights

To retrieve the available user insights metrics, send a `GET` request to the `/{threads-user-id}/threads_insights` endpoint with the `metric` parameter, and optionally, the `since` and `until` parameters.

User insights are not guaranteed to work before June 1, 2024.

### Parameters

Name | Description || `since` | **Optional.**  Used in conjunction with the `until` parameter to define a range. If you omit `since` and `until`, it defaults to a 2-day range: yesterday through today.  **Note:** The earliest Unix timestamp that can be used is `1712991600`, any timestamp before that will be rejected.  **Format:** Unix Timestamp |
| `until` | **Optional.**  Used in conjunction with the `since` parameter to define a range. If you omit `since` and `until`, it defaults to a 2-day range: yesterday through today.  **Note:** The earliest Unix timestamp that can be used is `1712991600`, any timestamp before that will be rejected.  **Format:** Unix Timestamp |
| `metric` | **Required.**  A comma-separated list of the metrics to be returned. Must be at least one of the user metrics values. |

### User Metrics

Name | Response Type | Description || `views` | Time Series | The number of times your profile was viewed. |
| `likes` | Total Value | The number of likes on your posts. |
| `replies` | Total Value | The number of replies on your posts.  **Note:** This number includes only top-level replies. |
| `reposts` | Total Value | The number of times your posts were reposted. |
| `quotes` | Total Value | The number of times your posts were quoted. |
| `clicks` | Link Total Values | The number of times people clicked on URLs you shared. |
| `followers_count` | Total Value | Your total number of followers on Threads.  **Note:**   * This metric does not support the `since` and `until` parameters. |
| `follower_demographics` | Total Value | The demographic characteristics of followers, including countries, cities, and gender distribution.  **Note:**   * This metric does not support the `since` and `until` parameters. * A Threads profile must have at least 100 followers to fetch this metric. * Can only have one `breakdown` parameter, which must be equal to one of the following values: `country`, `city`, `age`, or `gender`. |

### Example Request

```
curl -s -X GET \
  -F "metric=views" \
  -F "access_token=<ACCESS_TOKEN>" \
"https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads_insights"
```

### Example Time Series Metric Response

```
{
  "data": [
    {
      "name": "views",
      "period": "day",
      "values": [
        {
          "value": 10,
          "end_time": "2024-07-12T08:00:00+0000"
        },
        {
          "value": 20,
          "end_time": "2024-07-15T08:00:00+0000"
        },
        {
          "value": 30,
          "end_time": "2024-07-16T08:00:00+0000"
        }
      ],
      "title": "views",
      "description": "The number of times your profile was viewed.",
      "id": "37602215421583/insights/views/day"
    }
  ]
}
```

### Example Total Value Metric Response

```
{
  "data": [
    {
      "name": "views",
      "period": "day",
      "total_value" : {
        "value": 1
      }
      "title": "views",
      "description": "The number of times your profile was viewed.",
      "id": "37602215421583/insights/views/day"
    }
  ]
}
```

### Example Link Total Value Response

```
{
  "data": [
    {
      "name": "clicks",
      "period": "day",
      "link_total_values": [
        {
          "value": 11,
          "link_url": "https://ai.meta.com/blog/"
        }
      ],
      "title": "clicks",
      "description": "The number of times users clicked on a link.",
      "id": "37602215421583/insights/clicks/day"
    }
  ]
}
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)