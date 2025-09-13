# Geo-Gated Content - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/posts/geo-gating

Geo-Gated Content - Threads API - Documentation - Meta for Developers

![](https://facebook.com/security/hsts-pixel.gif)

[Threads API](../.md)

* [Overview](../overview.md)
* [Get Started](../get-started.md)
* [Create Posts](../create-posts.md)
* [Retrieve and Discover Posts](../retrieve-and-discover-posts.md)
* [Retrieve and Manage Replies](../retrieve-and-manage-replies.md)
* [Delete Posts](delete-posts.md)
* [Profiles](../threads-profiles.md)
* [Insights](../insights.md)
* [Webhooks](../webhooks.md)
* [oEmbed](../tools-and-resources/embed-a-threads-post.md)
* [Web Intents](../threads-web-intents.md)
* [Troubleshooting](../troubleshooting.md)
* [Reference](../reference.md)
* [Tools and Resources](../tools-and-resources.md)
* [Changelog](../changelog.md)

# Geo-Gated Content

You can use the Threads API to create geo-gated content restricted to one or more specific countries. Content marked in this way will only be shown to Threads profiles in those countries.

### Limitations

Only users with access to this feature on threads.net can use this feature via Threads API.

## User Eligibility

A user's eligibility for the geo-gating feature can be retrieved when making a request to the `GET /me` or `GET /{threads-user-id}` endpoints to [retrieve profile information](../threads-profiles-retrieve-a-threads-user-s-profile-information.md). To retrieve this value, include the following parameter with your API request:

* `is_eligible_for_geo_gating` - A boolean value which represents whether a user is eligible for the geo-gating feature.

### Example Request

```
curl -s -X GET \
  "https://graph.threads.net/v1.0/me?fields=id,is_eligible_for_geo_gating&access_token=<ACCESS_TOKEN>"
```

### Example Response

```
{
   "id": "12312312312123",
   "is_eligible_for_geo_gating": true
}
```

This means that this user has access to the geo-gating feature.

## Publish Geo-Gated Content

Geo-gating can be used when making a request to the `POST /threads` endpoint to [create a media object](../posts-step-1--create-a-threads-media-container.md). To use geo-gating, include the following parameter with your API request:

* `allowlisted_country_codes` - A string list of valid [ISO 3166-1 alpha-2 country codes](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fobp%2Fui%2F%23search&h=AT0uHFjnGw3EExVYrpoPHyTYDuUlH_GPBB5cJ7Z9Ea8vzmvRJUs9Dw9zoU6-zMYYZT-Hics4ihL3ujA9MUS9Sx4yLAACJMYwIB5MBgVwKFiXYiPTIm_iPES3sBVDMY_EuWfe9cdfqm3RK1-_EA_kCTLskHs) that represents the countries where this media should be shown. If this parameter is passed in, the media will not be shown to Threads profiles in countries outside of this list.

### Example Request

```
curl -i -X POST \
  "https://graph.threads.net/v1.0/<THREADS_USER_ID>/threads?media_type=IMAGE&image_url=https://www.example.com/images/bronz-fonz.jpg&text=#BronzFonz&allowlisted_country_codes=US,CA&access_token=<ACCESS_TOKEN>"
```

This request would create a Threads post container that, once published, is only visible in the United States and Canada.

**Note:** The creator of a Threads post is always able to see their content, regardless of geo-gating settings.

## Media Retrieval

Allowlisted country codes for geo-gating can be retrieved when making a request to the `GET /threads` or `GET /{threads_media_id}` endpoint to [retrieve media object(s)](../threads-media.md). To retrieve the geo-gating allowlist, include the following parameter with your API request:

* `allowlisted_country_codes` - A string list of valid [ISO 3166-1 alpha-2 country codes](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.iso.org%2Fobp%2Fui%2F%23search&h=AT33iK1xnCfpVDQ1xWjCQ6dwyGrdjpbprnXMKq29-t48Q84-b2Ep_MObPcAQrN_yVuWyFX-4okXwt1xyGsxkhdPh6Mjb53p5RNbBvUZcpZNmcXo8R3fS_FizGEDsfZw7jc9bGMRmi9ZRoEBMklIus7yN6uk) that represents the countries where this media is shown.

### Example Request

```
curl -s -X GET \
  "https://graph.threads.net/v1.0/me/threads?fields=id,allowlisted_country_codes&limit=1&access_token=<ACCESS_TOKEN>"
```

### Example Response

```
{
   "id": "12312312312123",
   "allowlisted_country_codes": [
      "US"
   ]
}
```

This means this media is only shown to users in the United States.

## Error Codes

Error | Description || `ErrorCode::THREADS_API__FEATURE_NOT_AVAILABLE` | This user does not have access to this Threads API feature. |
| `ErrorCode::THREADS_API__GEO_GATING_INVALID_COUNTRY_CODES` | Some of the specified country code(s) are not supported for geo-gating. |

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)