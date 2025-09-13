# Create Posts - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/create-posts

Create Posts - Threads API - Documentation - Meta for Developers

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

# Create Posts

You can use the Threads API to publish image, video, text, or carousel posts as well as quote and repost other posts.

## Permissions

Posting to Threads requires an appropriate access token and permissions based on the node you are targeting. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.
* `threads_content_publish` — Required for Threads publishing endpoints only.

If your app has not been approved for advanced access for the `threads_content_publish` permission, you can only post to Threads for your account and your app's tester accounts. After approval, you can post to Threads on behalf of other public users.

## Fediverse

For Threads users who have [enabled sharing to the fediverse](https://l.facebook.com/l.php?u=https%3A%2F%2Fhelp.instagram.com%2F760878905943039&h=AT2pP0Z2mDtRip7SeHMszqNeTfcvzu_SYMnthT_zvNxc4k4F2RR6z_FmT5BV_h_eNw984s_DolU0kWGPbxFPF2FwdOMVOxDjcgbE6bnRaHEBhos1rX8ydee5gPEdpW1pwz5eZ8m_ZWwiHg9iTb1j6v33mqg), eligible posts made to Threads via the Threads API will also be shared to the fediverse starting August 28, 2024.

## Next Steps

* [Threads Posts](posts.md)
* [Reposts](posts/reposts.md)
* [Quote Posts](posts/quote-posts.md)
* [Geo-Gated Content](posts/geo-gating.md)
* [Accessability](posts/accessibility.md)

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)