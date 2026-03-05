# Day-2 Intro Email Template — My Caribbean Journey

MailerLite automation email — sent **2 days after signup**. Upload the HTML below via **Templates → New template → Upload HTML** in MailerLite.

---

## MailerLite Setup Notes

| Setting | Value |
|---|---|
| **Subject line** | Here's what to explore — enter this in MailerLite's subject field (add personalization tag for name from their UI, not in the HTML) |
| **Preview text** | The book, the guide, the stories — a quick tour of My Caribbean Journey. |
| **From name** | Quincy · My Caribbean Journey |
| **Trigger** | Automations → When subscriber joins a group → Wait 2 days → Send email |
| **Unsubscribe link** | Already included in the footer via `{$unsubscribe}` |

> **Merge tag note:** `{$name}` inserts the subscriber's name. MailerLite doesn't support inline fallbacks in HTML templates the same way Mailchimp does — if a subscriber has no name on file, it will render blank. To avoid this, make the Name field **required** on your signup form (already done on the MCJ site forms).

---

## Customisation Notes

- **Amazon link:** `https://www.amazon.com/I-Am-Tobago-Quincy-Yeates/dp/B0FYYVKKVT` — update if the listing URL ever changes.
- **Hero image:** Pulls from `https://mycaribbeanjourney.com/images/tobago-guide-trail.webp` — update the `src` if the image path changes.
- **Quincy's personal note:** Edit the two `<p>` tags in the `<!-- BODY SECTION -->` block freely — this is the conversational part.
- **Colors:** All inline, matching the site's design tokens (`#0d1f12` dark green · `#d4a030` gold · `#1a4a2e` mid-green · `#faf8f4` warm white).

---

## HTML Template

```html
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to My Caribbean Journey</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@400;600&display=swap">
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  
<style type="text/css">
		*{
			box-sizing:border-box;
		}
		body{
			margin:0;
			padding:0;
			background-color:#e2ddd6;
		}
		a{
			color:inherit;
		}
		.btn-gold:hover{
			background-color:#e8b84a !important;
		}
		.btn-outline:hover{
			background-color:rgba(26,74,46,0.08) !important;
		}
	@media (max-width: 620px){
		.email-wrapper{
			width:100% !important;
		}

}	@media (max-width: 620px){
		.hero-headline{
			font-size:26px !important;
			line-height:1.3 !important;
		}

}	@media (max-width: 620px){
		.section-pad{
			padding:28px 24px !important;
		}

}	@media (max-width: 620px){
		.footer-pad{
			padding:32px 24px !important;
		}

}</style></head>
<body style="margin:0;padding:0;background-color:#e2ddd6;">

  <!-- Pre-header hidden text -->
  <span style="display:none;font-size:0;line-height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">Stories, guides &amp; culture from the Caribbean — handpicked by Quincy.&#8204;&#8203;&zwnj;&#160;&#847;</span>

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e2ddd6;">
    <tr>
      <td align="center" style="padding:32px 16px 40px;">

        <!-- Email card -->
        <table class="email-wrapper" role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 6px 32px rgba(0,0,0,0.14);">


          <!-- ============================
               HEADER
          ============================= -->
          <tr>
            <td style="background-color:#0d1f12;padding:20px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-family:Georgia,'Playfair Display',serif;font-size:17px;font-weight:bold;color:#d4a030;letter-spacing:0.02em;">My Caribbean Journey</span>
                  </td>
                  <td align="right">
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#f5f0e8;letter-spacing:0.1em;text-transform:uppercase;opacity:0.6;">Explore</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>


          <!-- ============================
               HERO IMAGE
          ============================= -->
          <tr>
            <td style="padding:0;line-height:0;font-size:0;">
              <img src="https://mycaribbeanjourney.com/images/tobago-guide-trail.webp" alt="A trail through the rainforest in Tobago" width="600" style="width:100%;display:block;border:none;">
            </td>
          </tr>


          <!-- ============================
               HERO TEXT (dark panel)
          ============================= -->
          <tr>
            <td class="section-pad" style="background-color:#0d1f12;padding:36px 40px 40px;">
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;color:#d4a030;letter-spacing:0.14em;text-transform:uppercase;">Start here</p>
              <h1 class="hero-headline" style="margin:0 0 20px;font-family:Georgia,'Playfair Display',serif;font-size:32px;font-weight:bold;color:#faf8f4;line-height:1.25;">
                A few things worth exploring.
              </h1>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#f5f0e8;line-height:1.75;opacity:0.85;">
                This space explores the history, culture, and stories of the Caribbean.
              </p>
            </td>
          </tr>


          <!-- ============================
               QUINCY'S PERSONAL NOTE
          ============================= -->
          <tr>
            <td class="section-pad" style="padding:40px 40px 36px;background-color:#faf8f4;">
              <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1a1a1a;line-height:1.8;">
                Many of the stories that shape our identity live mostly in oral tradition, or in stuffy books that few people read. One of my goals here is to document, preserve, and share them — along with the history behind our cultures — in a way that is enjoyable and accessible.
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1a1a1a;line-height:1.8;">
                Here's what I've built so far. Each one is a different way into the same world.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;background-color:#faf8f4;"><hr style="border:none;border-top:1px solid #e0dbd3;margin:0;"></td></tr>


          <!-- ============================
               CTA 1 — I Am Tobago (Book)
          ============================= -->
          <tr>
            <td class="section-pad" style="padding:36px 40px 32px;background-color:#faf8f4;">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;color:#d4a030;letter-spacing:0.13em;text-transform:uppercase;">The Book</p>
              <h2 style="margin:0 0 12px;font-family:Georgia,'Playfair Display',serif;font-size:22px;font-weight:bold;color:#0d1f12;line-height:1.3;">I Am Tobago</h2>
              <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#444444;line-height:1.78;">
                A journey through Tobago's folklore, cultural traditions, and the spirit of an island that refuses to be ordinary. If you've ever wanted to feel what Tobago is really about, this is where to start.
              </p>
              <!-- Button row -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="https://www.amazon.com/I-Am-Tobago-Quincy-Yeates/dp/B0FYYVKKVT" class="btn-gold" style="display:inline-block;background-color:#d4a030;color:#0d1f12;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:8px;letter-spacing:0.02em;">
                      Get Your Copy →
                    </a>
                  </td>
                  <td>
                    <a href="https://mycaribbeanjourney.com/i-am-tobago/" style="display:inline-block;color:#1a4a2e;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;text-decoration:underline;">
                      Learn more
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;background-color:#faf8f4;"><hr style="border:none;border-top:1px solid #e0dbd3;margin:0;"></td></tr>


          <!-- ============================
               CTA 2 — My Tobago Guide
          ============================= -->
          <tr>
            <td class="section-pad" style="padding:32px 40px;background-color:#faf8f4;">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;color:#1a4a2e;letter-spacing:0.13em;text-transform:uppercase;">The Guide</p>
              <h2 style="margin:0 0 12px;font-family:Georgia,'Playfair Display',serif;font-size:22px;font-weight:bold;color:#0d1f12;line-height:1.3;">My Tobago Guide</h2>
              <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#444444;line-height:1.78;">
                A curated, searchable directory of real places, resources, and recommendations for expats and visitors in Tobago - built from personal experience, not sponsored listings.
              </p>
              <a href="https://mycaribbeanjourney.com/my-tobago-guide/" class="btn-outline" style="display:inline-block;background-color:transparent;color:#1a4a2e;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:12px 26px;border-radius:8px;border:2px solid #1a4a2e;letter-spacing:0.02em;">
                Browse the Guide →
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;background-color:#faf8f4;"><hr style="border:none;border-top:1px solid #e0dbd3;margin:0;"></td></tr>


          <!-- ============================
               CTA 3 — Blog
          ============================= -->
          <tr>
            <td class="section-pad" style="padding:32px 40px 40px;background-color:#faf8f4;">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;color:#1a4a2e;letter-spacing:0.13em;text-transform:uppercase;">The Stories</p>
              <h2 style="margin:0 0 12px;font-family:Georgia,'Playfair Display',serif;font-size:22px;font-weight:bold;color:#0d1f12;line-height:1.3;">Island Stories &amp; Culture</h2>
              <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#444444;line-height:1.78;">
                Folklore, festival breakdowns, local insight, and the kind of Caribbean stories that don't make it into travel brochures. New articles drop regularly.
              </p>
              <a href="https://mycaribbeanjourney.com/blog/" class="btn-outline" style="display:inline-block;background-color:transparent;color:#1a4a2e;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:12px 26px;border-radius:8px;border:2px solid #1a4a2e;letter-spacing:0.02em;">
                Read the Blog →
              </a>
            </td>
          </tr>


          <!-- ============================
               CLOSING / FOOTER (dark)
          ============================= -->
          <tr>
            <td class="footer-pad" style="background-color:#0d1f12;padding:40px;">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#f5f0e8;line-height:1.75;">
                Thank you for being part of the journey.
              </p>
              <p style="margin:0 0 32px;font-family:Georgia,'Playfair Display',serif;font-size:19px;font-style:italic;color:#d4a030;line-height:1.5;">
                — Quincy
              </p>
              <hr style="border:none;border-top:1px solid rgba(245,240,232,0.1);margin:0 0 24px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#f5f0e8;opacity:0.45;line-height:1.9;text-align:center;">
                My Caribbean Journey &middot; <a href="https://mycaribbeanjourney.com" style="color:#d4a030;text-decoration:underline;">mycaribbeanjourney.com</a><br>
                You're receiving this because you signed up on the site.<br>
                <a href="{$unsubscribe}" style="color:#d4a030;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>


        </table>
        <!-- /email card -->

      </td>
    </tr>
  </table>

</body>
</html>
```

---

## How to Add It to Mailchimp

1. In Mailchimp, go to **Automations → Welcome new subscribers** (or create a new Customer Journey with a "Subscribed to list" trigger).
2. Add an **Email** action → click **Design Email**.
3. When prompted to choose a template, select **Code your own** → **Paste in code**.
4. Paste the full HTML block above.
5. Set the **Subject line** and **Preview text** from the table at the top of this file.
6. Send a **test email** to yourself before activating — Mailchimp's preview won't render Google Fonts (Outlook won't either), but Georgia is the identical fallback and looks great.
7. Activate the automation.

---

## Copy Changes

To edit Quincy's personal note, find the `<!-- QUINCY'S PERSONAL NOTE -->` block and update the `<p>` tags freely. Everything else (header, CTAs, footer) is structural and rarely needs touching.
