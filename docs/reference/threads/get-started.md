# Get Started - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/get-started

Get Started - Threads API - Documentation - Meta for Developers

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

# Get Started

To access the Threads API, create an app and pick the [Threads Use Case](/docs/development/create-an-app/threads-use-case).

This guide provides information on what you need to get started using the Threads API.

## Before You Start

You need the following:

### Meta App

A [Meta app](https://developers.facebook.com/apps) created with the [Threads use case](/docs/development/create-an-app/threads-use-case).

### Public Server

We download media used in publishing attempts so the media must be hosted on a publicly accessible server at the time of the attempt.

### Authorization

Data access authorization is controlled by your app users through the use of the permissions listed below. Users must grant your app these permissions through the [Authorization Window](#authorization-window) before your app can access their data. For more details, refer to our [Permissions guide](/docs/permissions#t).

* `threads_basic` — Required for all Threads endpoints.
* `threads_content_publish` — Required for Threads publishing endpoints only.
* `threads_manage_replies` — Required for making `POST` calls to reply endpoints.
* `threads_read_replies` — Required for making `GET` calls to reply endpoints.
* `threads_manage_insights` — Required for making `GET` calls to insights endpoints.

[Threads testers](#threads-testers) can grant your app these permissions at any time. In order for app users without a role on your app to be able to grant your app these permissions, each permission must first be approved through the [App Review](/docs/resp-plat-initiatives/app-review) process, and your app must be published.

Permission grants made by app users with public profiles are valid for 90 days. [Refreshing](get-started/long-lived-tokens-refresh-a-long-lived-token.md) an app user's long-lived access token will extend the permission grant for another 90 days if the app user who granted the token has a public profile. If the app user's profile is [private](https://l.facebook.com/l.php?u=https%3A%2F%2Fhelp.instagram.com%2F225222310104065&h=AT0RLkTXBCCeIFs2EHnpsi-0wfYnIHkgzZz5Igenuj9muRw1Fid0ZZE3YnS0j74ZTwsTbpndq8Z5uMGJDc3hk2TtO3mBLtfd-RVUxbINeOSAu8Wb0Irmu1iTPrBt4kvIdeo2WYuGe9zCq-TwQNfxbiq02s4), however, the permission grant cannot be extended and the app user must grant the expired permission to your app again.

### Threads User Access Tokens

API authentication is handled by Threads user access tokens that conform to the OAuth 2.0 protocol. Access tokens are app-scoped (unique to the app and user pair) and can be short-lived or long-lived. API requests that query Threads users or publish Threads media must include a Threads user access token. Use the [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/) to debug your Threads User Access Token.

#### Short-Lived Access Tokens

Short-lived access tokens are valid for 1 hour, but can be exchanged for [long-lived tokens](get-started/long-lived-tokens.md). To get a short-lived access token, implement the [Authorization Window](#authorization-window) into your app. After the app user authenticates their identity through the window, we will redirect the user back to your app and include an [authorization code](#authorization-codes), which you can then [exchange for a short-lived access token](get-started/get-access-tokens-and-permissions.md).

#### Long-Lived Access Tokens

Short-lived tokens that have not expired can be [exchanged for long-lived access tokens](get-started/long-lived-tokens.md), which are valid for 60 days. Long-lived tokens can be [refreshed](get-started/long-lived-tokens-refresh-a-long-lived-token.md) before they expire by querying the `GET /refresh_access_token` endpoint.

### Authorization Window

The Authorization Window allows your app to get [authorization codes](#authorization-codes) and [permissions](#permissions) from app users. Authorization codes can be exchanged for [Threads user access tokens](#threads-user-access-tokens), which must be included when fetching an app user's profile, retrieving Threads media, publishing posts, reading replies, managing replies, or viewing insights.

![](https://scontent-syd2-1.xx.fbcdn.net/v/t39.8562-6/448400385_1192671258431902_561156009842405502_n.png?_nc_cat=103&ccb=1-7&_nc_sid=f537c7&_nc_ohc=jFkybIAwFRcQ7kNvwGBtAB9&_nc_oc=AdkNSyc8ba8umZ5_hMRgXBSEUkGUq0-ptHsOTDqKDLOF5gCHsWekQCrZVJseuQMFTLo&_nc_zt=14&_nc_ht=scontent-syd2-1.xx&_nc_gid=2yWqYvteXTdJa_5_EX3UrQ&oh=00_AfaGgqV1vZuLp0Dis2517KKmMGY4ox6Z1iwYgRqxOhXQfw&oe=68CAB78F)

To implement the Authorization Window, refer to the [Getting Access Tokens](get-started/get-access-tokens-and-permissions.md) guide.

### Authorization Codes

Authorization codes can be exchanged for short-lived [Threads user access tokens](#threads-user-access-tokens). To get an authorization code, implement the [Authorization Window](#authorization-window) into your app. After an app user authenticates their identity through the window and grants your app any permissions it needs, we will redirect the user to your app and include an authorization code. You can then use the API to exchange the code for the app user's short-lived Threads user access token.

**Note:** Authorization codes are short-lived and are only valid for 1 hour.

### Threads Testers

In order to test your app with a Threads user, you must first send an invitation to the Threads user's profile and accept the invitation. Invitations can be sent by clicking on the **Add People** button and selecting **Threads Tester** in the **App Dashboard** > **App roles** > **Roles** tab.

![](https://scontent-syd2-1.xx.fbcdn.net/v/t39.8562-6/448437743_497641552720473_834837554385422272_n.png?_nc_cat=102&ccb=1-7&_nc_sid=f537c7&_nc_ohc=2uViFPWKMk8Q7kNvwFdyutA&_nc_oc=AdlYmzbL-yoISNQh1GCEkmP-7CrfrLAbzRbuqDP5DyjW-TW8Jzz9p172GnlsuveBXqQ&_nc_zt=14&_nc_ht=scontent-syd2-1.xx&_nc_gid=2yWqYvteXTdJa_5_EX3UrQ&oh=00_AfZ4T2FLkSCyV1xfu4C35228vKUofoUAoWPT-DoNEY-oSg&oe=68CABD96)

Invitations can be accepted by the Threads user in the **Website permissions** section under [**Account Settings**](https://www.threads.net/settings/account) of the Threads website or mobile app after signing into their account.

![](https://scontent-syd2-1.xx.fbcdn.net/v/t39.8562-6/448398889_856199966351807_1368075304931297357_n.png?_nc_cat=101&ccb=1-7&_nc_sid=f537c7&_nc_ohc=yYkcK2p3gDsQ7kNvwEZryoZ&_nc_oc=AdnzJZOFj08O2lYQtB2eoCf_HBEICvGDEIyt-qY2FWCsEnVLE-LXohhYL-Ng7YJ3SyY&_nc_zt=14&_nc_ht=scontent-syd2-1.xx&_nc_gid=2yWqYvteXTdJa_5_EX3UrQ&oh=00_AfZU24kReM6qS1F4Czv-oTN995Mh8PU4FK0_zCv_iatZOQ&oe=68CAB2DC)

## Sample App

Our open-source [Threads API sample app](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fthreads_api&h=AT39gCWxzNpjr9jm0yaFRwMvcxct1dyBWEOhVQoKFhmFPG6XIGTKhLOn4Dl8WYbT6YSIHG__aTL9XTGr63UMGpHLnoI6FpbLXsCO3cZ-Vhvr6z2u9i0grhvag0nYYEiW53YJZ0qk2Pzb7n4M1xaUEz3IctE) serves as a practical guide, enabling you to better understand the API and troubleshoot any issues by referencing a working implementation. This can simplify the integration process, accelerate development time, and ensure a smoother implementation experience.

## Next Steps

* Make [Single Thread Posts](posts-single-thread-posts.md)
* Make [Carousel Posts](posts-carousel-posts.md)
* [Retrieve Threads Media](threads-media.md)

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)