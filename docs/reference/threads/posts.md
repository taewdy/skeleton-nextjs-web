# Posts - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/posts

Posts - Threads API - Documentation - Meta for Developers

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

# Threads Posts

You can use the Threads API to publish image, video, text, or carousel posts.

This document covers:

* [Single Thread Posts](#single-thread-posts)
* [Carousel Posts](#carousel-posts)
* [Topic Tags and Links in Posts](#topic-tags-and-links-in-posts)

## Single Thread Posts

Publishing a single image, video, or text post is a two-step process:

1. Use the `POST /{threads-user-id}/threads` endpoint to create a media container using an image or video hosted on your public server and optional text. Alternatively, use this endpoint to create a media container with text only.
2. Use the `POST /{threads-user-id}/threads_publish` endpoint to publish the container.

### Limitations

* Text posts are limited to 500 characters.

### Step 1: Create a Threads Media Container

Use the `POST /{threads-user-id}/threads` endpoint to create a Threads media container.

#### Parameters

The following parameters are **required**. Refer to the `POST /{threads-user-id}/threads` endpoint reference for additional supported parameters.

* `is_carousel_item` — Default value is `false` for single thread posts. Indicates an image or video that will appear in a carousel.
* `image_url` — (**For images only.**) The path to the image. We will cURL your image using the URL provided so it must be on a public server.
* `media_type` — Set to either `TEXT`, `IMAGE`, or `VIDEO`. Indicates the current media type. **Note:** Type `CAROUSEL` is not available for single thread posts.
* `video_url` — (**For videos only.**) Path to the video. We will cURL your video using the URL provided so it must be on a public server.
* `text` — The text associated with the post. The first URL included in the `text` field will be used as the link preview for the post. **For text-only posts, this parameter is required.**

#### Example Request

```
curl -i -X POST \
"https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads?media_type=IMAGE&image_url=https://www.example.com/images/bronz-fonz.jpg&text=#BronzFonz&access_token=<ACCESS_TOKEN>"
```

#### Example Response

```
{
  "id": "1234567" // Threads Media Container ID
}
```

### Step 2: Publish a Threads Media Container

Use the `POST /{threads-user-id}/threads_publish` endpoint to publish the container ID returned in the previous step. It is recommended to wait on average 30 seconds before publishing a Threads media container to give our server enough time to fully process the upload. See the [media container status endpoint](troubleshooting-publishing-does-not-return-a-media-id.md) for more details.

#### Parameters

* `creation_id` — Identifier of the Threads media container created from the `/threads` endpoint.

#### Example Request

```
curl -i -X POST \ 
"https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads_publish?creation_id=<MEDIA_CONTAINER_ID>&access_token=<ACCESS_TOKEN>"
```

#### Example Response

```
{
  "id": "1234567" // Threads Media ID
}
```

## Carousel Posts

You may publish up to 20 images, videos, or a mix of the two in a carousel post. Publishing carousels is a three-step process:

1. Use the `POST /{threads-user-id}/threads` endpoint to create individual item containers for each image and video that will appear in the carousel.
2. Use the `POST /{threads-user-id}/threads` endpoint again to create a single carousel container for the items.
3. Use the `POST /{threads-user-id}/threads_publish` endpoint to publish the carousel container.

Carousel posts count as a single post against the profile's [rate limit](overview-rate-limiting.md).

#### Limitations

* Carousels are limited to 20 images, videos, or a mix of the two.
* Carousels require a minimum of two children.

### Step 1: Create an Item Container

Use the `POST /{threads-user-id}/threads` endpoint to create an item container for the image or video that will appear in a carousel.

#### Parameters

The following parameters are **required**. Refer to the `POST /{threads-user-id}/threads` endpoint reference for additional supported parameters.

* `is_carousel_item` — Set to `true`. Indicates that the image or video will appear in a carousel.
* `image_url` — (**For images only.**) The path to the image. We will cURL your image using the passed in URL so it must be on a public server.
* `media_type` — Set to `IMAGE` or `VIDEO`. Indicates that the media is an image or a video.
* `video_url` — (**For videos only.**) Path to the video. We will cURL your video using the passed in URL so it must be on a public server.

**Note:** While the `text` field is optional for carousel posts, the first URL included in the `text` field will be used as the link preview for the post.

If the operation is successful, the API will return an item container ID, which can be used when creating the carousel container.

Repeat this process for each image or video that should appear in the carousel.

#### Example Request

```
curl -i -X POST \
"https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads?image_url=https%3A%2F%2Fsol...&is_carousel_item=true&access_token=<ACCESS_TOKEN>"
```

#### Example Response

```
{
  "id": "1234567"
}
```

### Step 2: Create a Carousel Container

Use the `POST /{threads-user-id}/threads` endpoint to create a carousel container.

#### Parameters

The following parameters are **required**. Refer to the `POST /{threads-user-id}/threads` endpoint reference for additional supported parameters.

* `media_type` — Set to `CAROUSEL`. Indicates that the container is for a carousel.
* `children` — A comma-separated list of up to 20 container IDs of each image and/or video that should appear in the published carousel. Carousels can have at least 2 and up to 20 total images or videos or a mix of the two.
* `text`— (*Optional.*) The text associated with the post.

#### Example Request

```
curl -i -X POST \
"https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads?media_type=CAROUSEL&children=<MEDIA_ID_1>,<MEDIA_ID_2>,<MEDIA_ID_3>&access_token=<ACCESS_TOKEN>"
```

#### Example Response

```
{
  "id": "1234567"
}
```

### Step 3: Publish the Carousel Container

Use the `POST /{threads-user-id}/threads_publish` endpoint to publish a carousel post. Profiles are limited to 250 published posts within a 24-hour period. Publishing a carousel counts as a single post.

#### Parameters

The following parameters are **required**.

* `creation_id` — The carousel container ID.

If the operation is successful, the API will return a carousel album's Threads Media ID.

#### Example Request

```
curl -i -X POST \
"https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads_publish?creation_id=<MEDIA_CONTAINER_ID>&access_token=<ACCESS_TOKEN>"
```

#### Example Response

```
{
  "id": "1234567" // Threads Media ID
}
```

## Topic Tags and Links in Posts

Topics and links appear in posts in such a way as to encourage engagement.

### Topic Tags

Topics make posts more social by allowing central topics of discussion. You can include a topic in a post either by using the `topic_tag` parameter or by including a tag within the text of a post.

#### Using the `topic_tag` parameter

**Note:** Topic tags must be at least 1 character and at most 50 characters long. The following characters are not allowed:

* Periods (.)
* Ampersands (&)

```
curl -i -X POST \  
  "https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads?media_type=TEXT&text=Text&access_token=<ACCESS_TOKEN>"
  -d topic_tag=TAG
```

#### Using an in-text topic tag

**Note:** This method is not preferred but is kept for backwards compatability.

A topic can also be attached to a post by including one in-line within the text of the post. Only one topic tag is allowed per post, so the first valid tag included in a post of any type (text-only, image, video, carousel) via the API is treated as the tag for that post.

Information to keep in mind when adding a topic tag to a post using an in-text tag:

* Valid tags start with a hash sign (#).
* The text is also configured in the app without the hash sign.
* Topic tags must be at least 1 character and at most 50 characters long.
* Whole numbers that are preceded by a hash sign (i.e., #1) will not be converted into a tag. This is because it is assumed that # is signifying a number sign in this scenario.
* The following characters are not allowed when using in-text tags with Threads API, so any in-text tag that starts with a hash sign will end just before these characters:
  + Spaces, Tabs, New Line Characters
  + Periods (.)
  + Ampersands (&)
  + At Signs (@)
  + Exclamation Marks (!)
  + Question Marks (?)
  + Commas (,)
  + Semi-Colons (;)
  + Colons (:)

### Links

To attach a link to your post, use the `link_attachment` parameter when creating a media object.
If no `link_attachment` parameter is provided, then the first link made in a text-only post via the API is configured as the link attachment, which displays as a preview card, to make it easier to engage with and click on.

#### Limitations

* This feature is only available for text-only posts. It won't work on image, video, and carousel posts.

#### Publishing

Links can be attached when making a request to the `POST /threads` endpoint to [create a media object](posts-step-1--create-a-threads-media-container.md). Make sure to include the following parameter with your API request:

* `link_attachment` — (For text posts only.) The URL that should be attached to a Threads post and displayed as a link preview. This must be a valid, publicly accessible URL.

##### Example Request

```
curl -i -X POST \  
  "https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads?media_type=TEXT&text=Link&access_token=<ACCESS_TOKEN>" 
  -d link_attachment=https://developers.facebook.com/
```

##### Example Response

```
{
  "id": "1234567" // Threads Media Container ID
}
```

The request above creates a Threads post container that, once [published](posts-step-2--publish-a-threads-media-container.md), will attach a link preview to your media.

#### Media Retrieval

The value for the link attachment URL can be retrieved when making a request to the `GET /threads` or `GET /{threads_media_id}` endpoint to [retrieve media object(s)](threads-media.md). Make sure to include the following field with your API request:

* `link_attachment_url` — The URL attached to a Threads post.

##### Example Request

```
curl -s -X GET \ "https://graph.threads.net/v1.0/<THREADS_MEDIA_ID>?fields=id,link_attachment_url&access_token=<ACCESS_TOKEN>"
```

##### Example Response

```
{
   "id": "12312312312123",
   "link_attachment_url": "https://developers.facebook.com/",
}
```

## Media Specifications

### Image Specifications

* **Format:** JPEG and PNG image types are the officially supported formats for image posts.
* **File Size:** 8 MB maximum.
* **Aspect Ratio Limit:** 10:1
* **Minimum Width:** 320 (will be scaled up to the minimum if necessary)
* **Maximum Width:** 1440 (will be scaled down to the maximum if necessary)
* **Height:** Varies (depending on width and aspect ratio)
* **Color Space:** sRGB. Images using other color spaces will have their color spaces converted to sRGB.

### Video Specifications

* **Container:** MOV or MP4 (MPEG-4 Part 14), no edit lists, moov atom at the front of the file.
* **Audio Codec:** AAC, 48khz sample rate maximum, 1 or 2 channels (mono or stereo).
* **Video Codec:** HEVC or H264, progressive scan, closed GOP, 4:2:0 chroma subsampling.
* **Frame Rate:** 23-60 FPS
* **Picture Size:**
  + Maximum Columns (horizontal pixels): 1920
  + Required aspect ratio is between 0.01:1 and 10:1 but we recommend 9:16 to avoid cropping or blank space.
* **Video Bitrate:** VBR, 100 Mbps maximum.
* **Audio Bitrate:** 128 kbps.
* **Duration:** 300 seconds (5 minutes) maximum, minimum longer than 0 seconds.
* **File Size:** 1 GB maximum.

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)