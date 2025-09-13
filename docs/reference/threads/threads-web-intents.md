# Web Intents - Threads API - Documentation - Meta for Developers

Source: https://developers.facebook.com/docs/threads/threads-web-intents

Web Intents - Threads API - Documentation - Meta for Developers

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

# Web Intents

Web intents offer a simple way for people to interact with Threads directly from your website, starting with the ability to quickly create posts and follow profiles.

When clicking on a Web intent URL, a new window opens and users are directed to Threads to complete the intended action. On mobile (iOS and Android), web intents will open the Threads app whenever it is installed. If they are not already logged-in, they will have the opportunity to sign in or create a Threads account.

When linking intents to an image, we recommend using the Threads logo available in our [Threads Brand Resources](https://about.meta.com/brand/resources/instagram/threads/).

## Post Intent

Post intents allow people to easily share their favorite content from your website directly to Threads, in order to increase your reach, spark conversations and drive traffic.

### URL Format

The URL format is <https://www.threads.net/intent/post>.

### Supported Parameters

The post intent flow supports the following query string parameters.

Name | Description || `text` | **Optional.**  The text that the post dialog should be prefilled with. |
| `url` | **Optional.**  The URL for an optional link attachment. |

All parameter values should be encoded using [percent-encoding](https://l.facebook.com/l.php?u=https%3A%2F%2Fdatatracker.ietf.org%2Fdoc%2Fhtml%2Frfc3986%23section-2.1&h=AT1BbCCEYV34IfcHRKKcbZSAzWewS77fK4S0PbQcmQYHYpRM8RSUHkcbg6SFXkPAij-0XmCpdHw8L84rXna7xXWWvx171cj7MGCm516PABR7xJMqADgCUilz5lR2r6eiuQJzXY1BcUfqyhO-UVML-vtAwJs) ("URL encoding") so that the values can safely be passed via the URL.

### Examples

Example | URL || Only text | <https://www.threads.net/intent/post?text=Say+more+with+Threads+%E2%80%94+Instagram%27s+new+text+app> |
| Only link attachment | <https://www.threads.net/intent/post?url=https%3A%2F%2Fabout.fb.com%2Fnews%2F2023%2F07%2Fintroducing-threads-new-app-text-sharing%2F> |
| Text and link attachment | <https://www.threads.net/intent/post?url=https%3A%2F%2Fabout.fb.com%2Fnews%2F2023%2F07%2Fintroducing-threads-new-app-text-sharing%2F&text=Introducing+Threads%3A+A+New+Way+to+Share+With+Text> |

## Follow Intent

Follow intents allow people to easily follow a Threads account directly from your website.

### URL Format

The URL format is <https://www.threads.net/intent/follow>.

### Supported Parameters

Name | Description || `username` | **Required.**  The username of the user to follow. |

### Examples

Example | URL || The official @threads account | <https://www.threads.net/intent/follow?username=threads> |

![](https://www.facebook.com/tr?id=675141479195042&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=574561515946252&ev=PageView&noscript=1)![](https://www.facebook.com/tr?id=1754628768090156&ev=PageView&noscript=1)