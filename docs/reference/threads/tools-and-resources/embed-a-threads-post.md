# oEmbed - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/tools-and-resources/embed-a-threads-post

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
* [oEmbed](embed-a-threads-post.md)
* [Web Intents](../threads-web-intents.md)
* [Troubleshooting](../troubleshooting.md)
* [Reference](../reference.md)
* [Tools and Resources](../tools-and-resources.md)
* [Changelog](../changelog.md)

# Embed a Threads Post

You can query the Threads oEmbed endpoint to get a public Threads post's embed HTML and basic metadata in order to display the post in another website or app. Text, image, video, and carousel posts are supported.

### Common Uses

* Embed a post in a blog.
* Embed a post in a website.
* Render a post in a content management system.

### Requirements

This guide assumes you are a [registered Meta developer](/docs/development/register) and have created a [Meta app with the Threads use case](/docs/development/create-an-app/threads-use-case).

You will need the following:

* **Access Levels** — [Advanced Access](/docs/graph-api/overview/access-levels) for the Threads oEmbed Read feature. **Requires [Meta App Review](/docs/resp-plat-initiatives/individual-processes/app-review).**
* [**Access Token**](../get-started/app-access-tokens.md) — An app access token if your app accesses the oEmbed endpoint from a backend server.
* Features — [Threads oEmbed Read Feature](/docs/features-reference/threads-oembed-read).

### Limitations

* The Threads oEmbed endpoint is only intended to be used for embedding Threads content in websites and apps. It is not to be used for any other purpose. Using metadata and post content (or their derivations) from the endpoint for any purpose other than providing a front-end view of the post is strictly prohibited. This prohibition encompasses consuming, manipulating, extracting, or persisting the metadata and content, including but not limited to, deriving information about posts from the metadata for analytics purposes.
* Posts on private, inactive, and age-restricted accounts as well as geo-gated posts are not supported.
* With [standard access](/docs/graph-api/overview/access-levels), only posts from official Meta accounts can be embedded. These include [@meta](https://www.threads.net/@meta), [@threads](https://www.threads.net/@threads), [@instagram](https://www.threads.net/@instagram), and [@facebook](https://www.threads.net/@facebook).

### Rate Limits

Rate limits are dependent on the type of access token your app includes in each request.

#### App Token Rate Limits

Apps that rely on app access tokens can make up to 5 million requests per 24 hours.

## Get the Embed HTML

You can get the embed HTML programmatically via the API or from [threads.net](https://threads.net/) by clicking on a post's share icon and selecting the **Get embed code** button.

To get a Threads post's embed HTML using the API, send a request to the `/oembed` endpoint:

```
GET /oembed?url=<URL_OF_THE_POST>&access_token=<ACCESS_TOKEN>
```

* `URL_OF_THE_POST` — The permalink of the Threads post that you want to query.
* `ACCESS_TOKEN` — Your app access token. You can also pass it in an Authorization HTTP header, e.g., `Authorization: Bearer <ACCESS_TOKEN>`.

Upon success, the API will respond with a JSON object containing the post's embed HTML and additional data. The embed HTML will be in the returned `html` property.

Refer to the [Threads oEmbed reference](../reference/oembed.md) for a list of query string parameters you can include to augment the request.

### Example Requests

With an access token:

```
curl -X GET \ "https://graph.threads.net/v1.0/oembed?url=<URL_OF_THE_POST>&access_token=<ACCESS_TOKEN>"
```

With an Authorization HTTP header:

```
curl -i -X GET \
  --header "Authorization: Bearer 96481..." \  
  "https://graph.threads.net/v1.0/oembed?url=<URL_OF_THE_POST>"
```

### Example Response

Default fields that are returned:

```
{
  "version": "1.0",
  "provider_name": "Threads",
  "provider_url": "https://www.threads.net/",
  "type": "rich",
  "width": 658,
  "html": "<blockquote class=\"text-post-media\" data-text-post-perma...",
}
```

### URL Formats

The `url` query string parameter accepts the following URL format:

```
https://www.threads.net/@{username}/post/{media-shortcode}/
```

### Embed JS

The embed HTML contains a reference to the Threads embed.js JavaScript library. When the library loads, it scans the page for the post HTML and generates the fully rendered post.

### Post Size

The embedded post is responsive and will adapt to the size of its container. This means that the height will vary depending on the container width and the length of the post content. You can set the maximum width by including the `maxwidth` query string parameter in your request.

## App Review Submission

When you submit your app for review, in the **Please provide a URL where we can test Oembed Read** form field, use the Threads oEmbed endpoint to get the embed HTML for any public post on our official [Threads profile](https://www.threads.net/@threads). Then, add the returned embed HTML to where you will be displaying oEmbed content and enter that page's URL in the form field.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=1251217786110270&version=1749289789)

Once you have been approved for the [Threads oEmbed Read feature](/docs/features-reference/threads-oembed-read), you may embed your own posts using their respective URLs.

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)