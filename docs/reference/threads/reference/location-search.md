# Location Search - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/reference/location-search

Location Search - Threads API - Documentation - Meta for Developers

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

# Location Search

The Threads location search endpoint allows you to search for locations which can then be tagged in Threads posts. See [Location Tagging](../create-posts/location-tagging.md) for more information.

## `GET /location_search`

Search for locations by query or by coordinates.

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `query`  string | **Optional.**  The query string to search for. |
| `latitude`  float | **Optional.**  The latitude coordinate to search for. This must be used with `longitude`. |
| `longitude`  float | **Optional.**  The longitude coordinate to search for. This must be used with `latitude`. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `id` *(default)*, `name`, `address`, `city`, `country`, `latitude`, `longitude`, `postal_code` |

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)