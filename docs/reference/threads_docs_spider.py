import os
import re
import glob
from urllib.parse import urlsplit
import scrapy
from scrapy import signals
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from markdownify import markdownify as to_md
from lxml.html.clean import Cleaner


class ThreadsDocsSpider(CrawlSpider):
    # REQUIRED: Scrapy looks for subclasses of Spider at module top-level with a 'name'
    name = "threads_docs"

    allowed_domains = ["developers.facebook.com"]
    start_urls = ["https://developers.facebook.com/docs/threads/"]

    # Only follow links under /docs/threads (and include the start page)
    rules = (
        Rule(
            LinkExtractor(
                allow=(r"^https?://developers\\.facebook\\.com/docs/threads(?:/.*)?$"),
                deny_extensions=[
                    "jpg","jpeg","png","gif","svg","webp","ico",
                    "pdf","zip","gz","tar","tgz","bz2",
                    "mp4","mp3","mov","webm",
                    "css","js","map",
                ],
                unique=True,
                canonicalize=True,
            ),
            callback="parse_page",
            follow=True,
        ),
    )

    handle_httpstatus_list = [400]

    custom_settings = {
        "ROBOTSTXT_OBEY": False,
        "AUTOTHROTTLE_ENABLED": True,
        "DOWNLOAD_DELAY": 0.25,
        "CONCURRENT_REQUESTS": 8,
        "USER_AGENT": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "LOG_LEVEL": "INFO",
        "DEFAULT_REQUEST_HEADERS": {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
        }
    }

    OUT_DIR = "."

    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super(ThreadsDocsSpider, cls).from_crawler(crawler, *args, **kwargs)
        crawler.signals.connect(spider.spider_closed, signal=signals.spider_closed)
        return spider

    def spider_closed(self, spider):
        spider.logger.info("Spider closed. Post-processing links...")
        base_dir = os.path.join(self.OUT_DIR, "threads")
        for filepath in glob.glob(f"{base_dir}/**/*.md", recursive=True):
            spider.logger.info(f"Processing file: {filepath}")
            with open(filepath, "r+") as f:
                content = f.read()
                
                def replace_link(match):
                    link_text = match.group(1)
                    link_url = match.group(2)
                    spider.logger.info(f"Found link: {link_url}")
                    
                    prefix = "/docs/threads"
                    if link_url.startswith(prefix):
                        path = link_url
                        if path == "/docs/threads":
                            path = "/docs/threads/"

                        if path.endswith("/"):
                            rel = path[len(prefix):].lstrip("/") + "index.md"
                        else:
                            rel = path[len(prefix):].lstrip("/") + ".md"
                        
                        rel = re.sub(r"[^\w/.-]", "-", rel)
                        rel = re.sub(r"/{2,}", "/", rel)
                        
                        target_path = os.path.join(base_dir, rel)
                        current_dir = os.path.dirname(filepath)
                        new_url = os.path.relpath(target_path, current_dir)
                        spider.logger.info(f"New URL: {new_url}")
                        
                        return f"[{link_text}]({new_url})"
                    else:
                        return match.group(0)

                new_content = re.sub(r"\[(.*?)\]\((/docs/threads.*?)\)", replace_link, content)
                
                if content != new_content:
                    spider.logger.info("Content modified. Writing back to file.")
                    f.seek(0)
                    f.write(new_content)
                    f.truncate()
                else:
                    spider.logger.info("No links found to replace.")
        spider.logger.info("Link post-processing complete.")

    # CrawlSpider won’t call 'parse' for start_urls; define this to capture the root page too.
    def parse_start_url(self, response):
        return self.parse_page(response)

    def parse_page(self, response: scrapy.http.Response):
        url = self._strip_query_fragment(response.url)

        # Try common main-content roots first; fallback to whole page
        content_html = (
            response.css("main").get()
            or response.css('[role="main"]').get()
            or response.css("article").get()
            or response.css("#content").get()
            or response.text
        )

        cleaner = Cleaner(
            scripts=True,
            javascript=True,
            comments=True,
            style=True,
            inline_style=True,
            links=True,
            meta=True,
            page_structure=False,  # Keep page structure
            processing_instructions=True,
            embedded=True,
            frames=True,
            forms=False,  # Keep forms
            annoying_tags=False,
            remove_tags=None,
            kill_tags=None,
            allow_tags=None,
        )
        cleaned_html = cleaner.clean_html(content_html)

        title = (response.css("title::text").get() or url).strip()
        md_body = to_md(cleaned_html, heading_style="ATX", strip=["script", "style"])
        markdown = f"# {title}\n\nSource: {url}\n\n" + md_body

        out_path = self._path_for(url)
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(markdown)

        self.logger.info("Saved %s -> %s", url, out_path)
        yield {"url": url, "path": out_path, "title": title}

    # ---------- helpers ----------
    def _strip_query_fragment(self, url: str) -> str:
        parts = urlsplit(url)
        return f"{parts.scheme}://{parts.netloc}{parts.path}"

    def _path_for(self, url: str) -> str:
        """
        Map URL to md_out/threads/... .md
          /docs/threads/              -> md_out/threads/index.md
          /docs/threads/api/auth      -> md_out/threads/api/auth.md
        """
        parts = urlsplit(url)
        path = parts.path
        prefix = "/docs/threads"

        if path.endswith("/"):
            rel = path[len(prefix):].lstrip("/") + "index.md"
        else:
            rel = path[len(prefix):].lstrip("/") + ".md"

        rel = re.sub(r"[^\w/.-]", "-", rel)
        rel = re.sub(r"/{2,}", "/", rel)

        return os.path.join(self.OUT_DIR, "threads", rel)