# Changelog - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/changelog

Changelog - Threads API - Documentation - Meta for Developers

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

# Threads Changelog

## September 9, 2025

* Support for searching for public posts by media type has been added. See [Keyword Search](https://developers.facebook.com/docs/threads/keyword-search#search-by-media-type) for more details.

## August 15, 2025

### Threads Ads

* Threads ads now supports video ads. See [Threads ads creatives: Media requirements](/docs/marketing-api/ad-creative/threads-ads/creation#media-requirements) for more information.
* Threads has been added as a `publisher_platform` in the `customization_spec` for Placement Asset Customization. See [Supported Fields in `customization_spec`](/docs/marketing-api/dynamic-creative/placement-asset-customization/#supported-fields) for more information.

### Webhooks

* Support for publish webhooks has been added. See [Webhooks](webhooks/index.md) for more details.

## August 12, 2025

* The `total_votes` field was added to poll attachments. See [Polls](https://developers.facebook.com/docs/threads/create-posts/polls) for more details.

## August 1, 2025

* Support for delete webhooks has been added. See [Webhooks](webhooks/index.md) for more details.

## July 21, 2025

* The `topic_tag` field was added to the [Media retrieval endpoints](threads-media.md).

## July 15, 2025

* Support for mentions webhooks has been added. See [Webhooks for Threads](webhooks.md) for more details.

## July 14, 2025

* Support for Threads profile discovery has been added. See [Retrieve a Threads User's Public Profile Information](threads-profiles-retrieve-a-threads-user-s-public-profile-information.md) and [Retrieve a List of a Public Profile's Threads](retrieve-and-discover-posts/retrieve-posts-retrieve-a-list-of-a-public-profile-s-threads.md) for more details.
* Support for creating posts with topic tags via a `topic_tag` parameter has been added. See [Threads Posts](https://developers.facebook.com/docs/threads/posts#topic-tags) for more details.
* Support for [Topic Tag Search](https://developers.facebook.com/docs/threads/keyword-search#topic-tag-search) has been added. The `GET /keyword_search` endpoint also now supports timestamp filtering using the `since` and `until` parameters. See [Keyword Search](https://developers.facebook.com/docs/threads/keyword-search#keyword-search) for more details.
* Deletion and location search quotas have been added to the `GET me/threads_publishing_limit` endpoint. See [Troubleshooting](https://developers.facebook.com/docs/threads/troubleshooting#retrieve-quota-limits) for more details.

## July 7, 2025

* The `is_verified` field was added to the [User Profile endpoint](threads-profiles.md).
* Two new reply audience options, `parent_post_author_only` and `followers_only`, have been added to the [Threads Reply Management API](reply-management-control-who-can-reply.md).

## July 2, 2025

* The [`clicks` metric](insights-user-metrics.md) indicating the number of times a URL was clicked on your Threads posts has been added to the [Threads Insights API](insights.md).

## June 25, 2025

* The query limit for keyword search has been changed. See [Keyword Search](keyword-search.md) for more details.

## June 4, 2025

* Support for programmatically debugging access tokens has been added. See [Debug Access Tokens](troubleshooting/debug-access-token.md) for more details.
* Support for automatically publishing text posts has been added. See [Publishing](reference/publishing.md) for more details.

## May 27, 2025

* Support for [retrieving Threads location objects by individual ID](reference/locations.md) has been added.
* Support for [searching for locations to tag in Threads post](reference/location-search.md) has been added.

See [Location Tagging](create-posts/location-tagging.md) for more information.

## April 14, 2025

* Support for creating posts with polls has been added. See [Polls](create-posts/polls.md) for more details.

## March 6, 2025

* Support for deleting posts has been added. See [Delete Posts](posts/delete-posts.md) for more details.

## February 13, 2025

* The `gif_url` field was added to the [Media retrieval endpoints](threads-media.md).

## December 9, 2024

* Support for [Keyword Search](keyword-search.md) has been added.
* Return a list of Threads media objects in which a Threads profile has been tagged by another Threads profile. See [Mentions](threads-mentions.md) for more information.
* Embed the content of Threads posts, such as photos and videos, in other websites. See [Embed a Threads Post](tools-and-resources/embed-a-threads-post.md) for more information.
* Use the [Threads API Postman Collection](tools-and-resources/postman-collection.md) to make API calls.

## October 28, 2024

* The [`shares` metric](insights-available-metrics.md) indicating the number of shares of your Threads posts has been added to the [Threads Insights API](insights.md).

## October 11, 2024

* A hash sign followed by a whole number (i.e. #1) will not be converted into a tag.
* The list of unsupported special characters in tags has been updated.
* See [Tags](posts-tags.md) for more details.

## October 9, 2024

* Support for quote posts has been added. See [Quote Posts](posts/quote-posts.md) for more details.
* Support for reposts has been added. See [Reposts](posts/reposts.md) for more details.

## October 8, 2024

* Additional fields have been added to the Webhook response. See [Webhooks](webhooks.md) for more details.

## September 19, 2024

* [Carousel posts](posts-carousel-posts.md) are now allowed up to 20 images, videos, or a mix of the two.

## September 12, 2024

* We made it easier to attach links with Threads API. See [Links](posts-tags-and-links-in-posts.md) for more details.

## August 21, 2024

* Support for alt text has been added. See [Accessibility](posts/accessibility.md) for more details.

## August 15, 2024

* For Threads users who have [enabled sharing to the fediverse](https://l.facebook.com/l.php?u=https%3A%2F%2Fhelp.instagram.com%2F760878905943039&h=AT0lm0l9c9pCqUyGTX7eGahS999MsxS3sWj8YK0PeE8vfVn6Q0hyY_dP_9GhMVxRwJTns6Ulbd7giW7ifhHAJqm-C3wTTdKAQymL9UG6JPwfvBOuV7GLaTAjREDCy7JK4x1tkEOIFAiFfg86YNRJYyF6Ks0), eligible posts made to Threads via the Threads API will also be shared to the fediverse starting August 28, 2024.

## August 13, 2024

* [Webhooks for Threads](webhooks.md) allow you to receive real-time notifications for the subscribed topics and fields.

## August 5, 2024

* The `name` field was added to the [User Profile endpoint](reference/user-get---threads-user-id--fields-id-username----.md).
* Use `graph.threads.net/me/replies` to fetch all replies for your user. See [Retrieve a List of All a User's Replies](reply-management-retrieve-a-list-of-all-a-user-s-replies.md) for more information.

## July 23, 2024

* Posts made via the Threads API can be [geo-gated](geo-gating.md) to one or more specific countries.

## July 12, 2024

* Threads [Web Intents](threads-web-intents.md) for posts and follows are now available.

## June 25, 2024

* When fetching media insights on reposts, an empty array is returned.

## June 18, 2024

* Threads API is open to all developers, see [blog post](/blog/post/2024/06/18/the-threads-api-is-finally-here/) for more details.
* Docs have been updated to clarify that the `since` and `until` parameters are not supported when fetching the `followers_count` metric on the `/{threads-user-id}/threads_insights` endpoint.

## June 17, 2024

* Authorization, Permissions, and Threads User Access Tokens sections updated for `threads.net` domain and Threads Tester section added to [Get Started](get-started.md).
* [Get Access Tokens and Permissions](get-started/get-access-tokens-and-permissions.md) and [Long-Lived Tokens](get-started/long-lived-tokens.md) docs added.
* To access the Threads API, create an app and pick the [Threads Use Case](/docs/development/create-an-app/threads-use-case).

## June 12, 2024

* With the `threads_basic` and `threads_read_replies` permissions, users can query the `reply_audience` field to see who can reply to their previously published posts.

## June 7, 2024

* The domain for API calls is now `graph.threads.net`. All API calls to `graph.threads.net` should use `v1.0`. In order to use `graph.threads.net`, you will need to obtain a Threads access token.
* Reply Management and Insights have been added to the [Reference](https://developers.facebook.com/docs/threads/reference) page.

## May 21, 2024

* The `since` and `until` parameters on the user insights endpoint do not work for dates before April 13, 2024 (Unix timestamp 1712991600).
* A Threads profile must have at least 100 followers in order to fetch values for the `follower_demographics` metric.
* When requesting follower demographics, the `breakdown` parameter must be provided and must be set equal to one of the following values: `country`, `city`, `age`, or `gender`.
* Updated the possible values of the `hide_status` field on replies: `NOT_HUSHED`, `UNHUSHED`, `HIDDEN`, `COVERED`, `BLOCKED`, `RESTRICTED`.

## May 15, 2024

* Removed `REPOST_FACADE` as one of the possible values for the `media_type` field on replies.

## May 2, 2024

* Deprecated status code on media builder endpoint.

## May 1, 2024

* Users can query the `is_reply_owned_by_me` field to determine which replies are owned by their user and which replies are owned by other users.

## April 26, 2024

* Launch of User Level Insights.

## April 18, 2024

* The `permalink` and `username` fields can now be fetched on replies made by public users and your own user.

## April 8, 2024

* Threads API documentation was made publicly available. See the [blog post](https://developers.facebook.com/blog/post/2024/04/08/the-threads-api-is-coming-soon) for more details.

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)