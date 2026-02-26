// =============================================================
// Decap CMS — Custom Editor Components
// Each CMS.registerEditorComponent() call adds a button to the
// markdown toolbar. Add new components below in their own block.
// =============================================================


// -------------------------------------------------------------
// TABLE
// Adds a "Table" toolbar button. Fill in headers (comma-separated)
// and rows (one per line, comma-separated). Caption is optional.
// Outputs standard GFM pipe-table markdown.
// -------------------------------------------------------------
CMS.registerEditorComponent({
  id: 'data-table',
  label: 'Table',

  fields: [
    {
      name: 'caption',
      label: 'Caption (optional)',
      widget: 'string',
      required: false,
      hint: 'Short label shown above the table — e.g. "Tobago vs Trinidad at a glance"'
    },
    {
      name: 'headers',
      label: 'Column Headers',
      widget: 'string',
      hint: 'Separate with commas — e.g.  Island, Capital, Population'
    },
    {
      name: 'rows',
      label: 'Rows',
      widget: 'text',
      hint: 'One row per line, columns separated by commas:\nTobago, Scarborough, 60,000\nTrinidad, Port of Spain, 1,300,000'
    }
  ],

  // Pattern must match what toBlock() outputs so the CMS can re-open
  // an existing table for editing.
  pattern: /^(?:<p class="table-caption">([^<]*)<\/p>\n\n)?((?:\|[^\n]+\|\n?)+)/,

  fromBlock: function (match) {
    var caption = match[1] || '';
    var tableBlock = match[2] || '';
    var lines = tableBlock.trim().split('\n').filter(Boolean);

    // Line 0 = header row, line 1 = separator (---), lines 2+ = data
    var headerLine = lines[0] || '';
    var headers = headerLine
      .replace(/^\| /, '').replace(/ \|$/, '')
      .split(' | ')
      .map(function (h) { return h.trim(); })
      .join(', ');

    var dataLines = lines.slice(2);
    var rows = dataLines.map(function (line) {
      return line
        .replace(/^\| /, '').replace(/ \|$/, '')
        .split(' | ')
        .map(function (c) { return c.trim(); })
        .join(', ');
    }).join('\n');

    return { caption: caption, headers: headers, rows: rows };
  },

  toBlock: function (data) {
    var headers = (data.headers || 'Column 1, Column 2')
      .split(',').map(function (h) { return h.trim(); });
    var sep = headers.map(function () { return ' --- '; });

    var rows = (data.rows || '').split('\n')
      .filter(function (r) { return r.trim(); })
      .map(function (row) {
        var cells = row.split(',').map(function (c) { return c.trim(); });
        while (cells.length < headers.length) cells.push('');
        return '| ' + cells.slice(0, headers.length).join(' | ') + ' |';
      });

    var out = '';
    if (data.caption) out += '<p class="table-caption">' + data.caption + '</p>\n\n';
    out += '| ' + headers.join(' | ') + ' |\n';
    out += '|' + sep.join('|') + '|\n';
    out += rows.join('\n');
    return out;
  },

  // Rendered preview shown in the CMS split-view panel
  toPreview: function (data) {
    var headers = (data.headers || 'Column 1, Column 2')
      .split(',').map(function (h) { return h.trim(); });
    var rows = (data.rows || '').split('\n')
      .filter(function (r) { return r.trim(); })
      .map(function (row) {
        return row.split(',').map(function (c) { return c.trim(); });
      });

    var wrapStyle = [
      'border-radius:16px',
      'overflow:hidden',
      'border:1px solid rgba(212,160,48,0.3)',
      'box-shadow:0 2px 16px rgba(13,31,18,0.08)',
      'margin:1.5rem 0',
      'font-family:Inter,sans-serif'
    ].join(';');

    var capStyle = [
      'font-size:0.78rem',
      'font-weight:700',
      'text-transform:uppercase',
      'letter-spacing:0.12em',
      'color:#7a7a6a',
      'margin:0 0 0.6rem',
      'padding:0.9rem 1.1rem 0'
    ].join(';');

    var tableStyle = 'width:100%;border-collapse:collapse;';
    var thStyle = 'background:linear-gradient(135deg,#1a4a2e,#2d6b45);color:#f5f0e8;padding:0.75rem 1.1rem;text-align:left;font-size:0.82rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;white-space:nowrap;';

    var html = '<div style="' + wrapStyle + '">';
    if (data.caption) html += '<p style="' + capStyle + '">' + data.caption + '</p>';
    html += '<table style="' + tableStyle + '"><thead><tr>';
    headers.forEach(function (h) { html += '<th style="' + thStyle + '">' + h + '</th>'; });
    html += '</tr></thead><tbody>';
    rows.forEach(function (row, i) {
      var bg = i % 2 === 0 ? '#faf8f4' : 'rgba(212,160,48,0.04)';
      html += '<tr style="background:' + bg + ';">';
      headers.forEach(function (_, j) {
        var tdStyle = 'padding:0.65rem 1.1rem;border-bottom:1px solid rgba(212,160,48,0.12);font-size:0.93rem;vertical-align:top;' + (j === 0 ? 'font-weight:600;color:#0d1f12;' : 'color:#2a2a22;');
        html += '<td style="' + tdStyle + '">' + (row[j] || '') + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }
});


// -------------------------------------------------------------
// CALLOUT BOX
// Adds a "Callout" toolbar button. Choose a type (Tip, Fun Fact,
// Note, Warning) and write the content. Renders as a styled
// coloured box with a label and icon.
// -------------------------------------------------------------
CMS.registerEditorComponent({
  id: 'callout',
  label: 'Callout',

  fields: [
    {
      name: 'type',
      label: 'Type',
      widget: 'select',
      options: [
        { label: '💡 Tip',       value: 'tip'     },
        { label: '⭐ Fun Fact',  value: 'fact'    },
        { label: '📌 Note',      value: 'note'    },
        { label: '⚠️ Warning',   value: 'warning' }
      ],
      default: 'tip'
    },
    {
      name: 'content',
      label: 'Content',
      widget: 'text',
      hint: 'Keep it brief — one or two sentences works best.'
    }
  ],

  pattern: /^<div class="callout callout-(tip|fact|note|warning)"><p><strong>[^<]+<\/strong> ([\s\S]*?)<\/p><\/div>$/,

  fromBlock: function (match) {
    return {
      type:    match[1] || 'tip',
      content: (match[2] || '').replace(/<br>/g, '\n')
    };
  },

  toBlock: function (data) {
    var labels = { tip: '💡 Tip', fact: '⭐ Fun Fact', note: '📌 Note', warning: '⚠️ Warning' };
    var type    = data.type || 'tip';
    var label   = labels[type] || 'Tip';
    var content = (data.content || '').replace(/\n/g, '<br>');
    return '<div class="callout callout-' + type + '"><p><strong>' + label + '</strong> ' + content + '</p></div>';
  },

  toPreview: function (data) {
    var labels = { tip: '💡 Tip', fact: '⭐ Fun Fact', note: '📌 Note', warning: '⚠️ Warning' };
    var colors = {
      tip:     { bg: 'rgba(45,107,69,0.08)',    border: '#1a4a2e' },
      fact:    { bg: 'rgba(212,160,48,0.10)',   border: '#d4a030' },
      note:    { bg: 'rgba(212,160,48,0.05)',   border: 'rgba(212,160,48,0.5)' },
      warning: { bg: 'rgba(232,101,42,0.08)',   border: '#e8652a' }
    };
    var type   = data.type || 'tip';
    var label  = labels[type] || 'Tip';
    var color  = colors[type] || colors.tip;
    var content = (data.content || '').replace(/\n/g, '<br>');

    return '<div style="background:' + color.bg + ';border-left:4px solid ' + color.border + ';border-radius:12px;padding:1.1rem 1.4rem;margin:1rem 0;font-family:Inter,sans-serif;font-size:0.95rem;line-height:1.7;">'
      + '<p style="margin:0;"><strong style="color:' + color.border + ';">' + label + '</strong> ' + content + '</p></div>';
  }
});


// -------------------------------------------------------------
// YOUTUBE EMBED
// Adds a "YouTube" toolbar button. Paste any YouTube URL
// (youtube.com/watch?v=..., youtu.be/...) and optionally a title.
// Renders as a responsive 16:9 iframe.
// -------------------------------------------------------------
CMS.registerEditorComponent({
  id: 'youtube',
  label: 'YouTube',

  fields: [
    {
      name: 'url',
      label: 'YouTube URL',
      widget: 'string',
      hint: 'Paste the full video URL — e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      name: 'title',
      label: 'Video title (for accessibility)',
      widget: 'string',
      required: false,
      hint: 'Describe the video — e.g. "Tobago Heritage Festival 2023"'
    }
  ],

  pattern: /^<div class="youtube-embed"><iframe src="https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)" title="([^"]*)" allowfullscreen loading="lazy"><\/iframe><\/div>$/,

  fromBlock: function (match) {
    return {
      url:   'https://www.youtube.com/watch?v=' + match[1],
      title: match[2] || ''
    };
  },

  toBlock: function (data) {
    var url   = data.url || '';
    var title = data.title || '';
    var id    = null;

    // Extract video ID from any common YouTube URL format
    var patterns = [
      /[?&]v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
    ];
    for (var i = 0; i < patterns.length; i++) {
      var m = url.match(patterns[i]);
      if (m) { id = m[1]; break; }
    }

    if (!id) return '<!-- Invalid YouTube URL -->';
    return '<div class="youtube-embed"><iframe src="https://www.youtube.com/embed/' + id + '" title="' + title + '" allowfullscreen loading="lazy"></iframe></div>';
  },

  toPreview: function (data) {
    var url = data.url || '';
    var id  = null;
    var patterns = [
      /[?&]v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
    ];
    for (var i = 0; i < patterns.length; i++) {
      var m = url.match(patterns[i]);
      if (m) { id = m[1]; break; }
    }

    if (!id) return '<p style="color:#e8652a;font-family:Inter,sans-serif;font-size:0.9rem;">⚠️ Paste a valid YouTube URL above to see a preview.</p>';

    return '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:1rem 0;">'
      + '<iframe src="https://www.youtube.com/embed/' + id + '" title="' + (data.title || '') + '" allowfullscreen loading="lazy" '
      + 'style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;border-radius:12px;"></iframe></div>';
  }
});


// -------------------------------------------------------------
// Add new components below this line.
// Copy a block above as a template.
// -------------------------------------------------------------
