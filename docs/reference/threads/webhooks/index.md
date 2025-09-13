# Webhooks - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/webhooks/

Webhooks - Threads API - Documentation - Meta for Developers

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

# Webhooks for Threads

Webhooks for Threads allow you to receive real-time notifications for the subscribed topics and fields.

## Receive Live Webhook Notifications

To receive live webhook notifications, the following conditions must be satisfied:

* Your app must have Threads webhooks added as a sub-use case and appropriate fields subscribed to in the App Dashboard.
* For non-tech providers, the apps must be in [Live Mode](/docs/development/build-and-test/app-modes).
* For tech providers, the apps must have permissions with an [Advanced Access level](/docs/graph-api/overview/access-levels). You can request Advanced Access for permissions as shown here:
    
    

  ![](https://lookaside.fbsbx.com/elementpath/media/?media_id=1741127813088276&version=1755277458)

  If the app permissions don't have an access level of Advanced Access, the app won't receive webhook notifications.
* The app user must have granted your app appropriate permissions (i.e., `threads_basic`, `threads_read_replies` for reply webhooks).
* The business connected to the app must be verified.
* To receive real-time [reply](#real-time-reply-notifications) and [mention](#real-time-mention-notifications) notifications, the owner of the media object upon which the webhook event occurs must not have set their account to private.
* To receive real-time [delete](#real-time-delete-notifications) and [publish](#real-time-publish-notifications) notifications, the owner of the media object upon which the webhook event occurs must be a public account or private account that authenticated to the app.

### Limitations

* Apps don't receive webhook notifications if the media where the reply or mention appears was created by a private account.
* Your app must have successfully completed App Review ([Advanced Access](/docs/graph-api/overview/access-levels)) to receive webhooks notifications for all of the fields.

### Step 0: [Optional] Use the sample app to test your integration

Download the [webhooks sample app](https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Ffbsamples%2Fgraph-api-webhooks-samples%2F&h=AT2cCnAYBDk5MC7rsacGC1ug-kUyCBS7I6_hJ2ACCi_dWimXrxJYNEJHkbdUWDtVIbPZSfYR2kES9niLBvPECOsFL-NP5n_zunNIVZnpPiOXICOEZ3RQbeFZdgM6-2RgpcwbAH6_d851m7jPHKWSXtF2Yv4) to test your integration.

### Step 1: Add the webhooks sub-use case to the main Threads API use case

Under **Use Cases** > **Customize** > **Settings**, add the **Get real-time notifications with Threads Webhooks** sub-use case.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=537570765271468&version=1755277458)

### Step 2: Create an endpoint and configure Threads webhooks

[Create an endpoint](/docs/graph-api/webhooks/getting-started) that accepts and processes webhooks. To add the configuration:

1. Select the desired topic, and click **Subscribe to this object**.
2. Set the callback URL and token.

The token here is passed to your server defined in the callback URL to allow verification that the call originates from Meta servers.

![](https://lookaside.fbsbx.com/elementpath/media/?media_id=1033258184862601&version=1755277458)

#### Webhook Topics

  

##### Moderate topic fields

Name | Description || `replies` | [Replies](../reply-management-reply-retrieval.md) on a [Threads Media](../threads-media.md) owned by the Threads install user.  **Required permission(s):** [`threads_basic`](/docs/permissions#threads_basic), [`threads_read_replies`](/docs/permissions#threads_read_replies) |
| `delete` | Threads posts that were [deleted](../posts/delete-posts.md) by the authenticated user.  **Required permissions:** [`threads_basic`](/docs/permissions#threads_basic), [`threads_delete`](/docs/permissions#threads_delete) |

##### Interaction topic fields

Name | Description || `mentions` | [Mentions](../threads-mentions.md) on a public [Threads Media](../threads-media.md) tagging the Threads install user.  **Required permission(s):** [`threads_basic`](/docs/permissions#threads_basic), [`threads_manage_mentions`](/docs/permissions#threads_manage_mentions)  **Optional permission(s):** [`threads_read_replies`](/docs/permissions#threads_read_replies) — required for the `has_replies`, `is_reply`, `replied_to`, and `root_post` fields. Without this permission, these fields will be removed from the webhook response. |
| `publish` | Threads posts that were [published](../posts.md) by the authenticated user (including replies to user's or other's posts).  **Required permissions:** `threads_basic` |

## Notification Formats

### Fields

Name | Description || `app_id` | The Threads App ID displayed in **App Dashboard** > **App settings** > **Basic** > **Threads App ID**. |
| `topic` | Name of the Webhook topic.  We support moderate and interaction topics. |
| `target_id` | The media’s ID for a `reply` or `delete` webhook, or the mentioned Threads user app-scoped user ID for a `mentions` webhook. |
| `time` | Time when the real-time notification is sent. |
| `subscription_id` | The subscription ID for the user in the webhook. |
| `id` | The media's ID. |
| `deleted_at` | Time when the post was deleted in ISO 8601 format. |
| `timestamp` | Time when the post was published in ISO 8601 format. |

### Real-time reply notifications

If you subscribe to the `replies` field, we send your endpoint a webhook notification containing the reply object.

#### Sample replies payload

```
{
    "app_id": "123456",
    "topic": "moderate",
    "target_id": "78901",
    "time": 1723226877,
    "subscription_id": "234567",
    "has_uid_field": false,
    "values": {
        "value": {
            "id": "8901234",
            "username": "test_username",
            "text": "Reply",
            "media_type": "TEXT_POST",
            "permalink": "https:\/\/www.threads.net\/@test_username\/post\/Pp",
            "replied_to": {
                "id": "567890"
            },
           "root_post": {
               "id": "123456",
               "owner_id": "123456",
               "username": "test_username_2"
           },
            "shortcode": "Pp",
            "timestamp": "2024-08-07T10:33:16+0000"
        },
        "field": "replies"
    }
}
```

### Real-time mention notifications

If you subscribe to the `mentions` field, we send your endpoint a webhook notification containing the media object in which the user is mentioned.

#### Sample mentions payload

```
{
    "app_id": "123456",
    "topic": "interaction",
    "target_id": "78901",
    "time": 1723226877,
    "subscription_id": "234567",
    "has_uid_field": false,
    "values": {
        "value": {
            "id": "8901234",
            "alt_text": "test alt text",
            "gif_url": "https://media2.giphy.com/media/v1.Y2lkPTA1NzQyMTNjd2R0MXcybjZ6bDNyam9qaXJsN3RicnVncnFsanJ2dGk3eDJiejRmbyZlcD12MV9naWZzX2dpZklkJmN0PWc/3o85xEFRBYvAnamJnG/200.gif",
            "has_replies": true,
            "is_quote_post": false,
            "is_reply": false,
            "media_product_type": "THREADS",
            "media_type": "TEXT_POST",	
            "permalink": "https:\/\/www.threads.net\/@test_username\/post\/Pp",
            "shortcode": "Pp",
            "text": "Reply",
            "timestamp": "2024-08-07T10:33:16+0000"
            "username": "test_username",
        },
        "field": "mentions"
    }
}
```

**Note:** Additional fields not listed in this sample response that are returned when applicable include: `media_url`, `poll_attachment`, `quoted_post`, `replied_to`, `reposted_post`, `root_post`, and `thumbnail_url`.

### Real-time delete notifications

If you subscribe to the `delete` field, we send your endpoint a webhook notification containing the media object when it's deleted.

#### Sample delete payload

```
{
    "app_id": "123456",
    "topic": "moderate",
    "target_id": "78901",
    "time": 1723226877,
    "subscription_id": "234567",
    "has_uid_field": false,
    "values": {
        "value": {
            "id": "8901234",
            "owner": {
               "owner_id": "78901",
            },
            "deleted_at": "2024-08-07T10:33:16+0000"
            "timestamp": "2024-08-07T10:33:16+0000"
            "username": "test_username",
        },
        "field": "delete"
    }
}
```

### Real-time publish notifications

If you subscribe to the `publish` field, we send your endpoint a webhook notification containing the media object when it's published (including replies to user's or other's posts).

#### Sample publish payload

```
{
    "app_id": "123456",
    "topic": "interaction",
    "target_id": "78901",
    "time": 1723226877,
    "subscription_id": "234567",
    "has_uid_field": false,
    "values": {
        "value": {
            "id": "8901234",
            "media_type": "TEXT_POST"
            "permalink": "https:\/\/www.threads.net\/@test_username\/post\/Pp",
            "timestamp": "2024-08-07T10:33:16+0000"
            "username": "test_username",
        },
        "field": "publish"
    }
}
```

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)