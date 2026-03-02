# Google Apps Script — Contact Form Setup

One-time setup. Takes about 5 minutes.

---

## 1. Create the script

1. Go to **[script.google.com](https://script.google.com)** (sign in with your Gmail account)
2. Click **New project** (top left)
3. Delete everything in the editor
4. Open `contact-form.gs` (in this folder) and paste the entire contents into the editor
5. Name the project something like `MCJ Contact Form` (click "Untitled project" at the top)
6. Click **Save** (disk icon or Ctrl/Cmd+S)

---

## 2. Deploy as a Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Fill in the settings:
   - **Description:** Contact form
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Google will ask you to authorise — click **Authorise access**, choose your Gmail account, and click **Allow**
6. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/XXXXXXXXXX/exec`

---

## 3. Add the URL to the contact page

Open `/contact/js/contact.js` and replace the placeholder on line 6:

```js
// Before
var GAS_URL = 'PASTE_YOUR_GAS_URL_HERE';

// After
var GAS_URL = 'https://script.google.com/macros/s/XXXXXXXXXX/exec';
```

Save the file, commit, and push. The contact form is live.

---

## Redeploying after changes

If you ever edit the script, you must create a **new deployment** (not edit the existing one) for the changes to take effect:

1. Deploy → New deployment
2. Same settings as above
3. Copy the new URL and update `/contact/js/contact.js`

---

## Testing

Submit the form on the live site. You should receive an email at `booksbyquincy@gmail.com` within a few seconds. The email's **Reply-To** is set to the sender's address, so you can just hit reply to respond.
