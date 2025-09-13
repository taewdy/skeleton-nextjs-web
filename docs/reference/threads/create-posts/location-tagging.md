# Location Tagging - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/create-posts/location-tagging

Location Tagging - Threads API - Documentation - Meta for Developers

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

# Location Tagging

You can use the Threads API to search for and tag locations when creating media.

### Permissions

The Threads Location Search and Tagging API requires an appropriate access token and permissions. While you are testing, you can easily generate tokens and grant your app permissions by using the Graph API Explorer.

* `threads_basic` — Required for making any calls to all Threads API endpoints.
* `threads_location_tagging` — Required for making GET calls to the location search endpoint and for making POST calls to the publishing endpoints with a location tag.

## Search

You can search for locations by sending a request to the [`GET /location_search` endpoint](../reference/location-search.md). Include the parameter(s) from one of the following options in your request:

* `q` – A query to search for locations by.  
  or
* `latitude` – The latitude of a location.
* `longitude` – The longitude of a location.

At least one of the above parameter options must be provided in the request. All three may be used together as well.

**Note:** If your app has not been approved for the `threads_location_tagging` permission, the search will be performed only on the query "Menlo Park". After approval, all queries will be searchable.

### Example request with query

```
curl -i -X GET \
  "https://graph.threads.net/v1.0/location_search?access_token=<ACCESS_TOKEN>" \
  -d q="some place"
```

### Example request with latitude and longitude

```
curl -i -X GET \
  "https://graph.threads.net/v1.0/location_search?access_token=<ACCESS_TOKEN>" \
  -d latitude=12.3456 \
  -d longitude=12.3456
```

### Example response

```
{
  "data": [
    {
      "id": 12345,
      "name": "Facebook Headquarters",
      "address": "1 Hacker Way",
      "city": "Menlo Park",
      "country": "USA",
      "latitude": 37.48375115774628,
      "longitude": -122.14892131843617,
      "postal_code": "94025",
    },
    ...
  ]
}
```

The requests above will return a list of locations based on the search parameters. This response is not paginated.

## Tagging

You can attach a location tag when making a request to the `POST /threads` endpoint to create a media object. Include the following parameter in your request:

* `location_id` – The ID of the location being tagged.

### Example request

```
curl -i -X POST \
  "https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads?media_type=TEXT&text=<TEXT>&access_token=<ACCESS_TOKEN>" \
  -d location_id=12345
```

### Example response

```
{
  "id": "1234567" // Threads Media Container ID
}
```

The request above creates a Threads post media container that, once [published](../posts-step-2--publish-a-threads-media-container.md), will contain a location tag.

## Media Retrieval

Make a request to the `GET /threads` or `GET /{threads-media-id}` endpoint to retrieve media object(s). Make sure to include the following fields with your API request:

* `location_id` – The ID of the location tagged to the media.
* `location` – The location tagged to the media.

### Example request

```
curl -i -X GET \
  "https://graph.threads.net/v1.0/<THREADS_MEDIA_ID>&access_token=<ACCESS_TOKEN>" \
  -d fields=id,location_id,location{id,address,city,country,name,latitude,longitude,postal_code}
```

### Example response

```
{
  "id": "12345", // Threads Media ID
  "location_id": "12345", // Location Tag ID
  "location": { // Location Tag Object
    "id": "12345",
    "address": "1 Hacker Way",
    "name": "Facebook Headquarters",
    "city": "Menlo Park",
    "country": "USA"
    "latitude": 37.48375115774628,
    "longitude": -122.14892131843617,
    "postal_code": "94025",
  }
}
```

## Location Retrieval

Make a request to the [`GET /{location-id}` endpoint](../reference/locations.md) to retrieve a location object.

### Available Fields

Name | Description || `id` | The location's ID. |
| `address` | Address of the location. |
| `name` | Name of the location. |
| `city` | City of the location. |
| `country` | Country of the location. |
| `latitude` | Latitude of the location. |
| `longitude` | Longitude of the location. |
| `postal_code` | Postal Code of the location. |

### Example request

```
curl -i -X GET \
  "https://graph.threads.net/v1.0/<THREADS_LOCATION_ID>&access_token=<ACCESS_TOKEN>" \
  -d fields=id,address,name,city,country,latitude,longitude,postal_code
```

### Example response

```
{ 
    "id": "12345",
    "address": "1 Hacker Way",
    "name": "Facebook Headquarters",
    "city": "Menlo Park",
    "country": "USA"
    "latitude": 37.48375115774628,
    "longitude": -122.14892131843617,
    "postal_code": "94025",
  }
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)