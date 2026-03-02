function doPost(e) {
  try {
    var data    = JSON.parse(e.postData.contents);
    var name    = (data.name    || '').trim();
    var email   = (data.email   || '').trim();
    var message = (data.message || '').trim();

    if (!name || !email || !message) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    GmailApp.sendEmail(
      'booksbyquincy@gmail.com',
      'New message from mycaribbeanjourney.com — ' + name,
      'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message,
      {
        replyTo: email,
        htmlBody:
          '<p><strong>Name:</strong> ' + name + '</p>' +
          '<p><strong>Email:</strong> ' + email + '</p>' +
          '<p><strong>Message:</strong></p>' +
          '<p style="white-space:pre-wrap">' + message + '</p>'
      }
    );

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
