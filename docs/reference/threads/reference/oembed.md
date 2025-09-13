# oEmbed  - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/reference/oembed

oEmbed - Threads API - Documentation - Meta for Developers

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

# oEmbed

You can retrieve the embed HTML and associated metadata of public Threads posts.

## `GET /oembed?url=...`

Retrieve the embed HTML of a public Threads post. See [Embed a Threads Post](../tools-and-resources/embed-a-threads-post.md) for more information.

With [standard access](/docs/graph-api/overview/access-levels), only posts from official Meta accounts can be embedded. These include [@meta](https://www.threads.net/@meta), [@threads](https://www.threads.net/@threads), [@instagram](https://www.threads.net/@instagram), and [@facebook](https://www.threads.net/@facebook). Advanced access is required to embed other public Threads posts.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API app access token. |
| `url`  string | **Required.**  The permalink of the post. Accepts the format:   ``` https://www.threads.net/@{username}/post/{media-shortcode}/ ``` |
| `maxwidth`  int64 | **Optional.**  Maximum width of returned media. Must be between 320 and 658. **Note:** The `maxheight` parameter is not supported because the embed code is responsive and its height varies depending on its width. |

### Fields

Name | Description || `html`  string | The HTML used to display the post. |
| `provider_name`  string | Name of the provider (Threads). |
| `provider_url`  string | URL of the provider (<https://www.threads.net/>). |
| `type`  string | The oEmbed resource type. See [https://oembed.com/](https://l.facebook.com/l.php?u=https%3A%2F%2Foembed.com%2F&h=AT0-zqTkgiZDhl2UtqIuS_1rZhZYLiL1fmqME-oKpxScwStVHQLA5NoQyaUYCekdGRZICRkv69U6m9yNomYaCM48z6aEsIdrrz68SiruAKJ9BRU-wHAVKIbns8xgW1pDzTIJ2tswq29Rgq7JTf9J2YrVqCE). |
| `version`  string | Always 1.0. See [https://oembed.com/](https://l.facebook.com/l.php?u=https%3A%2F%2Foembed.com%2F&h=AT3nFz6RYjzgD8FdAz0RFmCfLYFnRHp4XGssORuOGYqDkh880mIr2znwV1vM2mk-pPGcDkME3U6yzF9vT1HiHuig4IZl9YaPX-difxqmozx5kv2bGGXrX4IOmAdg0R8_Y2m1hd5WJoRDpcc-fQ9QC2ihc2A). |
| `width`  int32 | The width in pixels required to display the HTML. |

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)