# Profiles - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/threads-profiles

Profiles - Threads API - Documentation - Meta for Developers

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

# Threads Profiles

The [Threads Profile API](reference/user-get---threads-user-id--fields-id-username----.md) and [Threads Profile Discovery API](reference/user-get--profile-lookup-username----.md) provide 2 ways of retrieving Threads profile information depending on scope.

## Retrieve a Threads App-Scoped User's Profile Information

Use the `GET /{threads-user-id}?fields=id,username,...` endpoint to return profile information about a Threads user.

### Permissions

The Threads Profile API requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.

### Limitations

* You may only fetch the profile of the app-scoped user.

### Fields

Name | Description || `id` | Threads user ID. This is returned by default. |
| `username` | Handle or unique username on Threads. |
| `name` | Display name of the user on Threads. |
| `threads_profile_picture_url` | URL of the user's profile picture on Threads. |
| `threads_biography` | Biography text on Threads profile. |
| `is_verified` | Returns `true` if the user is verified on Threads. |

### Example Request

```
curl -s -X GET \
"https://graph.threads.net/v1.0/me?fields=id,username,name,threads_profile_picture_url,threads_biography,is_verified&access_token=<ACCESS_TOKEN>"
```

### Example Response

```
{
  "id": "1234567",
  "username": "threadsapitestuser",
  "name": "Threads API Test User",
  "threads_profile_picture_url": "https://scontent-sjc3-1.cdninstagram.com/link/to/profile/picture/on/threads/",
  "threads_biography": "This is my Threads bio.",
  "is_verified": false
}
```

## Retrieve a Threads User's Public Profile Information

Use the `GET /profile_lookup?username=...` endpoint to look up a public profile and retrieve their basic profile information.

### Permissions

The Threads Profile Discovery API requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.
* `threads_profile_discovery` — Required for making any calls to all Threads Profile Discovery API endpoints.

With [standard access](/docs/graph-api/overview/access-levels), only some of the official Meta accounts can be looked up. These include @meta, @threads, @instagram, and @facebook.

### Limitations

* Only returns public profiles with a minimum age of 18 years and at least 1,000 followers.
* A user can send a maximum of 1,000 requests within a rolling 24-hour period. Once a query is sent, it will count against this limit for 24 hours.

### Parameters

Name | Description || `access_token`  string | **Required.**  Threads Graph API user access token. |
| `username`  string | **Required.**  Handle or unique username on Threads. Must be an exact match. |

### Fields

Name | Description || `username`  string | Handle or unique username on Threads. |
| `name`  string | Display name of the user on Threads. |
| `profile_picture_url`  string | URL of the user's profile picture on Threads. |
| `biography`  string | Biography text on Threads profile. |
| `follower_count`  int | Total follower count of the user. |
| `likes_count`  int | Likes count of the user's posts in the past 7 days. |
| `quotes_count`  int | Quotes count of the user's posts in the past 7 days. |
| `reposts_count`  int | Reposts count of the user's posts in the past 7 days. |
| `views_count`  int | Views count of the user's posts in the past 7 days. |
| `is_verified`  Boolean | Returns `true` if the user is verified on Threads. |

### Example Request

```
curl -i -X GET \ 
  "https://graph.threads.net/v1.0/profile_lookup?access_token=<ACCESS_TOKEN>&username=<THREADS_USERNAME>"
```

### Example Response

```
{
  "username": "meta",
  "name": "Meta",
  "profile_picture_url": "https://scontent-sjc3-1.cdninstagram.com/link/to/profile/picture/on/threads/",
  "biography": "Connect with what you love to make things happen. It’s Your World.",
  "is_verified": true,
  "follower_count": 1234567,
  "likes_count": 1234567,
  "quotes_count": 1234567,
  "replies_count": 1234567,
  "reposts_count": 1234567,
  "views_count": 1234567
}
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)