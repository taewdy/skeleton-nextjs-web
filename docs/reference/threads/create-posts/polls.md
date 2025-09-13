# Polls - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/create-posts/polls

Polls - Threads API - Documentation - Meta for Developers

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

# Polls

You can use the Threads API to create posts with polls.

### Limitations

* Polls can only be attached to text-only posts.

## Create a post with a poll

You can attach a poll when making a request to the `POST /threads` endpoint to create a media object. Include the following parameter in your request:

* `poll_attachment` – A JSON object containing the options for the poll.

The `poll_attachment` object must be of the form:

```
{
  "option_a": "first option",
  "option_b": "second option",
  "option_c": "third option", // Optional
  "option_d": "fourth option" // Optional
}
```

The `poll_attachment` object must contain at least 2 options and no more than 4 options. The length of each option you include must be at least 1 character long and at most 25 characters long.

### Example request

```
curl -i -X POST \
"https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads?media_type=TEXT&text=MyText&access_token=<ACCESS_TOKEN>" \
-d poll_attachment='{"option_a":"first option", "option_b":"second option"}'
```

### Example response

```
{
  "id": "1234567" // Threads Media Container ID
}
```

The request above creates a Threads post container that, once [published](../posts-step-2--publish-a-threads-media-container.md), will contain a poll attachment with the provided options.

## Media retrieval

Make a request to the `GET /threads` or `GET /{threads-media-id}` endpoint to retrieve media object(s). Make sure to include the following field with your API request:

* `poll_attachment` – The poll attachment for the post.

### Example request

```
curl -i -X GET \
"https://graph.threads.net/v1.0/<THREADS_MEDIA_ID>&access_token=<ACCESS_TOKEN>" \
-d fields=id,poll_attachment{option_a,option_b,option_c,option_d,option_a_votes_percentage,option_b_votes_percentage,option_c_votes_percentage,option_d_votes_percentage,total_votes,expiration_timestamp}
```

### Example response

```
{
  "id": "1234567", // Threads Media ID
  "poll_attachment": {
    "option_a": "first option",
    "option_b": "second option",
    "option_c": "third option",
    "option_d": "fourth option",
    "option_a_votes_percentage": 0.10, // Percentage of votes for first option
    "option_b_votes_percentage": 0.20,
    "option_c_votes_percentage": 0.15,
    "option_d_votes_percentage": 0.55,
    "total_votes": 100,
    "expiration_timestamp": "2025-01-01T23:00:00+0000" // Time when the poll expires
  }
}
```

**Note:** The fields for option C and option D will only be returned if available for the poll being retrieved.

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)