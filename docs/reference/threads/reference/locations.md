# Locations - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/reference/locations

Locations - Threads API - Documentation - Meta for Developers

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

# Locations

You can retrieve Threads location objects by individual ID. See [Location Tagging](../create-posts/location-tagging.md) for more information.

## `GET /{location-id}`

Retrieve a location by its ID.

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `location-id`  string | **Required.**  The path parameter of the Threads location identifier. |
| `fields`  string | **Optional.**  A comma-separated list of the fields to be returned.  **Values:** `id` *(default)*, `name`, `address`, `city`, `country`, `latitude`, `longitude`, `postal_code` |

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)