# Debug - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/reference/debug

Debug - Threads API - Documentation - Meta for Developers

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

# Debug

Retrieve various data about an access token. See [Debug Access Token](../troubleshooting/debug-access-token.md) for more information.

## `GET /debug_token`

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token of a Threads tester. |
| `input_token`  string | **Required.**  The access token to be inspected. |

**Note:** The `access_token` and `input_token` can be associated with different users but must be associated with the same app.

### Fields

Name | Description || `data`  object | Data wrapper around the result. |
| `type`  string | Whether the access token is an app access token or user access token. |
| `application`  string | Name of the application this access token is for. |
| `data_access_expires_at`  Unixtime | Timestamp when the app's access to user data expires. |
| `expires_at`  Unixtime | Timestamp when this access token expires. |
| `is_valid`  Boolean | Whether the access token is still valid or not. |
| `issued_at`  Unixtime | Timestamp when this access token was issued. |
| `scopes`  string[] | List of permissions that the user has granted for the app in this access token. |
| `user_id`  string | The ID of the user this access token is for. |

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)