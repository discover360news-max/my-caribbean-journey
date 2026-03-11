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
      hint: 'Separate with pipes — e.g.  Island | Capital | Population'
    },
    {
      name: 'rows',
      label: 'Rows',
      widget: 'text',
      hint: 'One row per line, columns separated by pipes:\nTobago | Scarborough | 60,000\nTrinidad | Port of Spain | 1,300,000'
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
      .join(' | ');

    var dataLines = lines.slice(2);
    var rows = dataLines.map(function (line) {
      return line
        .replace(/^\| /, '').replace(/ \|$/, '')
        .split(' | ')
        .map(function (c) { return c.trim(); })
        .join(' | ');
    }).join('\n');

    return { caption: caption, headers: headers, rows: rows };
  },

  toBlock: function (data) {
    var headers = (data.headers || 'Column 1 | Column 2')
      .split('|').map(function (h) { return h.trim(); });
    var sep = headers.map(function () { return ' --- '; });

    var rows = (data.rows || '').split('\n')
      .filter(function (r) { return r.trim(); })
      .map(function (row) {
        var cells = row.split('|').map(function (c) { return c.trim(); });
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
    var headers = (data.headers || 'Column 1 | Column 2')
      .split('|').map(function (h) { return h.trim(); });
    var rows = (data.rows || '').split('\n')
      .filter(function (r) { return r.trim(); })
      .map(function (row) {
        return row.split('|').map(function (c) { return c.trim(); });
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
        { label: '💡 Tip',                  value: 'tip'                 },
        { label: '⭐ Fun Fact',             value: 'fact'                },
        { label: '📌 Note',                 value: 'note'                },
        { label: '⚠️ Warning',              value: 'warning'             },
        { label: '✍️ Contributor',          value: 'contributor'         },
        { label: '👤 About the Author',     value: 'contributor-author'  },
        { label: '🙏 With thanks to',       value: 'contributor-thanks'  },
        { label: '👤 About the Contributor',value: 'contributor-about'   }
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

  pattern: /^<div class="callout callout-(tip|fact|note|warning|contributor|contributor-author|contributor-thanks|contributor-about)"><p><strong>[^<]+<\/strong> ([\s\S]*?)<\/p><\/div>$/,

  fromBlock: function (match) {
    return {
      type:    match[1] || 'tip',
      content: (match[2] || '').replace(/<br>/g, '\n')
    };
  },

  toBlock: function (data) {
    var labels = {
      tip: '💡 Tip', fact: '⭐ Fun Fact', note: '📌 Note', warning: '⚠️ Warning',
      'contributor': '✍️ Contributor', 'contributor-author': '👤 About the Author',
      'contributor-thanks': '🙏 With thanks to', 'contributor-about': '👤 About the Contributor'
    };
    var type    = data.type || 'tip';
    var label   = labels[type] || 'Tip';
    var content = (data.content || '').replace(/\n/g, '<br>');
    return '<div class="callout callout-' + type + '"><p><strong>' + label + '</strong> ' + content + '</p></div>';
  },

  toPreview: function (data) {
    var labels = {
      tip: '💡 Tip', fact: '⭐ Fun Fact', note: '📌 Note', warning: '⚠️ Warning',
      'contributor': '✍️ Contributor', 'contributor-author': '👤 About the Author',
      'contributor-thanks': '🙏 With thanks to', 'contributor-about': '👤 About the Contributor'
    };
    var contribStyle = { bg: '#f5f0e8', border: '#0d1f12' };
    var colors = {
      tip:                  { bg: 'rgba(45,107,69,0.08)',   border: '#1a4a2e' },
      fact:                 { bg: 'rgba(212,160,48,0.10)',  border: '#d4a030' },
      note:                 { bg: 'rgba(212,160,48,0.05)',  border: 'rgba(212,160,48,0.5)' },
      warning:              { bg: 'rgba(232,101,42,0.08)',  border: '#e8652a' },
      'contributor':        contribStyle,
      'contributor-author': contribStyle,
      'contributor-thanks': contribStyle,
      'contributor-about':  contribStyle
    };
    var type   = data.type || 'tip';
    var label  = labels[type] || 'Tip';
    var color  = colors[type] || colors.tip;
    var content = (data.content || '').replace(/\n/g, '<br>');

    return '<div style="background:' + color.bg + ';border-left:4px solid ' + color.border + ';border-radius:12px;padding:1.1rem 1.4rem;margin:1rem 0;font-family:Inter,sans-serif;font-size:0.95rem;line-height:1.7;">'
      + '<p style="margin:0;"><strong style="display:block;margin-bottom:0.4rem;color:' + color.border + ';">' + label + '</strong>' + content + '</p></div>';
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
// PULL QUOTE
// Adds a "Pull Quote" toolbar button. Highlights a key sentence
// from the article in large italic type. Optional attribution.
// Visually distinct from blockquote — use for standout lines.
// -------------------------------------------------------------
CMS.registerEditorComponent({
  id: 'pull-quote',
  label: 'Pull Quote',

  fields: [
    {
      name: 'quote',
      label: 'Quote',
      widget: 'text',
      hint: 'A standout line from the article — keep it punchy, one or two sentences.'
    },
    {
      name: 'attribution',
      label: 'Attribution (optional)',
      widget: 'string',
      required: false,
      hint: 'Who said it — e.g. "Quincy" or "Tobagonian proverb"'
    }
  ],

  pattern: /^<div class="pull-quote"><p>([\s\S]*?)<\/p>(?:<cite>([\s\S]*?)<\/cite>)?<\/div>$/,

  fromBlock: function (match) {
    return {
      quote:       (match[1] || '').replace(/<br>/g, '\n'),
      attribution: match[2] || ''
    };
  },

  toBlock: function (data) {
    var quote = (data.quote || '').replace(/\n/g, '<br>');
    var out   = '<div class="pull-quote"><p>' + quote + '</p>';
    if (data.attribution) out += '<cite>' + data.attribution + '</cite>';
    out += '</div>';
    return out;
  },

  toPreview: function (data) {
    var quote = (data.quote || '').replace(/\n/g, '<br>');
    var style = [
      'margin:2rem 0',
      'padding:1.75rem 1.5rem',
      'text-align:center',
      'border-top:2px solid #d4a030',
      'border-bottom:1px solid rgba(212,160,48,0.25)',
      'font-family:Georgia,serif'
    ].join(';');
    var pStyle  = 'font-size:1.4rem;font-style:italic;color:#0d1f12;line-height:1.55;margin:0 0 0.75rem;';
    var ctStyle = 'font-size:0.8rem;font-style:normal;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#7a7a6a;';

    var html = '<div style="' + style + '"><p style="' + pStyle + '">\u201C' + quote + '\u201D</p>';
    if (data.attribution) html += '<cite style="' + ctStyle + '">\u2014 ' + data.attribution + '</cite>';
    html += '</div>';
    return html;
  }
});


// -------------------------------------------------------------
// DEFINITION BOX
// Adds a "Definition" toolbar button. Renders a term with its
// explanation — ideal for patois, historical terms, folklore
// vocabulary. Optional language/origin label.
// -------------------------------------------------------------
CMS.registerEditorComponent({
  id: 'definition',
  label: 'Definition',

  fields: [
    {
      name: 'term',
      label: 'Term',
      widget: 'string',
      hint: 'The word or phrase — e.g. "Canboulay" or "Jab Jab"'
    },
    {
      name: 'language',
      label: 'Language / Origin (optional)',
      widget: 'string',
      required: false,
      hint: 'e.g. "Trinidadian Creole" or "French Patois"'
    },
    {
      name: 'definition',
      label: 'Definition',
      widget: 'text',
      hint: 'Explain the term in plain language.'
    }
  ],

  pattern: /^<div class="definition-box"><strong class="definition-term">([^<]+)<\/strong>(?:<span class="definition-lang">([^<]*)<\/span>)?<p>([\s\S]*?)<\/p><\/div>$/,

  fromBlock: function (match) {
    return {
      term:       match[1] || '',
      language:   match[2] || '',
      definition: (match[3] || '').replace(/<br>/g, '\n')
    };
  },

  toBlock: function (data) {
    var def = (data.definition || '').replace(/\n/g, '<br>');
    var out = '<div class="definition-box">'
      + '<strong class="definition-term">' + (data.term || '') + '</strong>';
    if (data.language) out += '<span class="definition-lang">' + data.language + '</span>';
    out += '<p>' + def + '</p></div>';
    return out;
  },

  toPreview: function (data) {
    var def      = (data.definition || '').replace(/\n/g, '<br>');
    var wrapStyle = 'border-left:3px solid #1a4a2e;background:rgba(45,107,69,0.06);border-radius:0 10px 10px 0;padding:1rem 1.25rem;margin:1rem 0;font-family:Inter,sans-serif;';
    var termStyle = 'display:block;font-size:1.1rem;font-weight:700;color:#0d1f12;margin-bottom:0.2rem;';
    var langStyle = 'display:inline-block;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9a7020;background:rgba(212,160,48,0.12);padding:0.15rem 0.5rem;border-radius:4px;margin-bottom:0.5rem;';
    var defStyle  = 'margin:0.4rem 0 0;font-size:0.95rem;color:#1a1a1a;line-height:1.7;';

    var html = '<div style="' + wrapStyle + '">'
      + '<strong style="' + termStyle + '">' + (data.term || '') + '</strong>';
    if (data.language) html += '<span style="' + langStyle + '">' + data.language + '</span>';
    html += '<p style="' + defStyle + '">' + def + '</p></div>';
    return html;
  }
});


// -------------------------------------------------------------
// IMAGE + CAPTION
// Adds an "Image" toolbar button. Upload or select an image,
// write a caption, choose size, display ratio, and decoration.
// Renders as a <figure> with modifier classes for layout/style.
// -------------------------------------------------------------
CMS.registerEditorComponent({
  id: 'image-caption',
  label: 'Image',

  fields: [
    {
      name: 'src',
      label: 'Image',
      widget: 'image',
      hint: 'Upload or select from the media library'
    },
    {
      name: 'alt',
      label: 'Alt text',
      widget: 'string',
      hint: 'Describe the image — shown to screen readers and if the image fails to load'
    },
    {
      name: 'caption',
      label: 'Caption (optional)',
      widget: 'string',
      required: false,
      hint: 'Short caption shown below the image'
    },
    {
      name: 'size',
      label: 'Size',
      widget: 'select',
      default: 'full',
      hint: 'Full spans the whole column. Float options wrap text around the image.',
      options: [
        { label: 'Full width',    value: 'full'        },
        { label: 'Half width',    value: 'half'        },
        { label: 'Float left',    value: 'float-left'  },
        { label: 'Float right',   value: 'float-right' }
      ]
    },
    {
      name: 'ratio',
      label: 'Display ratio',
      widget: 'select',
      default: 'natural',
      hint: 'Crops the image to a fixed ratio. Natural shows the image as-is.',
      options: [
        { label: 'Natural (no crop)',  value: 'natural'    },
        { label: 'Landscape — 16:9',   value: 'ratio-16-9' },
        { label: 'Landscape — 4:3',    value: 'ratio-4-3'  },
        { label: 'Portrait — 3:4',     value: 'ratio-3-4'  },
        { label: 'Square — 1:1',       value: 'ratio-1-1'  }
      ]
    },
    {
      name: 'border',
      label: 'Decorative border',
      widget: 'boolean',
      default: false,
      required: false,
      hint: 'Adds a gold border around the image'
    },
    {
      name: 'shadow',
      label: 'Drop shadow',
      widget: 'boolean',
      default: false,
      required: false,
      hint: 'Adds a subtle shadow to lift the image off the page'
    }
  ],

  pattern: /^<figure class="(post-figure[^"]*)"><img src="([^"]*)" alt="([^"]*)">(?:<figcaption>([\s\S]*?)<\/figcaption>)?<\/figure>$/,

  fromBlock: function (match) {
    var classes = match[1] || 'post-figure';

    var size = 'full';
    if (classes.indexOf('float-left') !== -1)  size = 'float-left';
    else if (classes.indexOf('float-right') !== -1) size = 'float-right';
    else if (classes.indexOf('--half') !== -1)      size = 'half';

    var ratio = 'natural';
    if (classes.indexOf('ratio-16-9') !== -1)      ratio = 'ratio-16-9';
    else if (classes.indexOf('ratio-4-3') !== -1)  ratio = 'ratio-4-3';
    else if (classes.indexOf('ratio-3-4') !== -1)  ratio = 'ratio-3-4';
    else if (classes.indexOf('ratio-1-1') !== -1)  ratio = 'ratio-1-1';

    return {
      src:     match[2] || '',
      alt:     match[3] || '',
      caption: match[4] || '',
      size:    size,
      ratio:   ratio,
      border:  classes.indexOf('--border') !== -1,
      shadow:  classes.indexOf('--shadow') !== -1
    };
  },

  toBlock: function (data) {
    var classes = 'post-figure';
    if (data.size === 'half')              classes += ' post-figure--half';
    else if (data.size === 'float-left')   classes += ' post-figure--float-left';
    else if (data.size === 'float-right')  classes += ' post-figure--float-right';
    if (data.ratio && data.ratio !== 'natural') classes += ' post-figure--' + data.ratio;
    if (data.border) classes += ' post-figure--border';
    if (data.shadow) classes += ' post-figure--shadow';

    var out = '<figure class="' + classes + '">'
      + '<img src="' + (data.src || '') + '" alt="' + (data.alt || '') + '">';
    if (data.caption) out += '<figcaption>' + data.caption + '</figcaption>';
    out += '</figure>';
    return out;
  },

  toPreview: function (data) {
    if (!data.src) return '<p style="color:#7a7a6a;font-family:Inter,sans-serif;font-size:0.9rem;">Select an image above to see a preview.</p>';

    var size  = data.size  || 'full';
    var ratio = data.ratio || 'natural';

    var figStyle = 'margin:1.5rem 0;font-family:Inter,sans-serif;';
    if (size === 'half')
      figStyle = 'max-width:50%;margin:1.5rem auto;font-family:Inter,sans-serif;';
    else if (size === 'float-left')
      figStyle = 'float:left;max-width:45%;margin:0.25rem 1.75rem 1rem 0;font-family:Inter,sans-serif;';
    else if (size === 'float-right')
      figStyle = 'float:right;max-width:45%;margin:0.25rem 0 1rem 1.75rem;font-family:Inter,sans-serif;';

    var ratioMap = { 'ratio-16-9': '16/9', 'ratio-4-3': '4/3', 'ratio-3-4': '3/4', 'ratio-1-1': '1/1' };
    var imgStyle = 'width:100%;border-radius:12px;display:block;';
    if (ratio !== 'natural')
      imgStyle += 'aspect-ratio:' + (ratioMap[ratio] || 'auto') + ';object-fit:cover;';
    if (data.border) imgStyle += 'border:2px solid rgba(212,160,48,0.45);box-sizing:border-box;';
    if (data.shadow) imgStyle += 'box-shadow:0 8px 32px rgba(13,31,18,0.18);';

    var capStyle = 'font-size:0.82rem;color:#5a5a52;text-align:center;margin-top:0.65rem;font-style:italic;line-height:1.5;';

    var html = '<figure style="' + figStyle + '">'
      + '<img src="' + data.src + '" alt="' + (data.alt || '') + '" style="' + imgStyle + '">';
    if (data.caption) html += '<figcaption style="' + capStyle + '">' + data.caption + '</figcaption>';
    html += '</figure>';
    return html;
  }
});


// -------------------------------------------------------------
// BUTTON / CTA
// Adds a "Button" toolbar button. Insert a styled link button
// inline — useful for mid-post CTAs like "Get the book" or
// linking to a guide. Choose gold (primary) or bordered style.
// -------------------------------------------------------------
CMS.registerEditorComponent({
  id: 'cta-button',
  label: 'Button',

  fields: [
    {
      name: 'text',
      label: 'Button text',
      widget: 'string',
      hint: 'e.g. "Get the book", "Explore the guide"'
    },
    {
      name: 'url',
      label: 'URL',
      widget: 'string',
      hint: 'Full URL or internal path — e.g. https://amazon.com/... or /my-tobago-guide/'
    },
    {
      name: 'style',
      label: 'Style',
      widget: 'select',
      options: [
        { label: 'Primary — gold fill',    value: 'primary'      },
        { label: 'Outline — bordered',     value: 'outline-dark'  }
      ],
      default: 'primary'
    },
    {
      name: 'newTab',
      label: 'Open in new tab',
      widget: 'boolean',
      default: true,
      required: false
    }
  ],

  pattern: /^<p class="post-cta"><a href="([^"]+)" class="btn btn-(primary|outline-dark)"(?: target="_blank" rel="noopener noreferrer")?>([^<]+)<\/a><\/p>$/,

  fromBlock: function (match) {
    return {
      url:    match[1] || '',
      style:  match[2] || 'primary',
      newTab: match[0].indexOf('target="_blank"') !== -1,
      text:   match[3] || ''
    };
  },

  toBlock: function (data) {
    var attrs = data.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    return '<p class="post-cta">'
      + '<a href="' + (data.url || '#') + '" class="btn btn-' + (data.style || 'primary') + '"' + attrs + '>'
      + (data.text || 'Read more')
      + '</a></p>';
  },

  toPreview: function (data) {
    var isPrimary = (data.style || 'primary') === 'primary';
    var btnStyle  = isPrimary
      ? 'display:inline-block;padding:0.8rem 2rem;background:#d4a030;color:#0d1f12;font-weight:700;border-radius:8px;text-decoration:none;font-family:Inter,sans-serif;font-size:0.95rem;'
      : 'display:inline-block;padding:0.8rem 2rem;background:transparent;color:#1a4a2e;border:2px solid #1a4a2e;font-weight:700;border-radius:8px;text-decoration:none;font-family:Inter,sans-serif;font-size:0.95rem;';

    return '<p style="text-align:center;margin:1.5rem 0;">'
      + '<a href="' + (data.url || '#') + '" style="' + btnStyle + '">'
      + (data.text || 'Button text')
      + '</a></p>';
  }
});


// -------------------------------------------------------------
// PREVIEW STYLES + TEMPLATE
// Injects site CSS into the CMS preview iframe and registers a
// template that renders body + references with proper markup.
// Both collections (posts, stories) share the same template.
// -------------------------------------------------------------

CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
CMS.registerPreviewStyle('/shared/shared.css');
CMS.registerPreviewStyle('/css/blog.css');

function PostPreview(props) {
  var entry         = props.entry;
  var title         = entry.getIn(['data', 'title'])         || '';
  var excerpt       = entry.getIn(['data', 'excerpt'])       || '';
  var author        = entry.getIn(['data', 'author'])        || '';
  var category      = entry.getIn(['data', 'category'])      || '';
  var featuredImage = entry.getIn(['data', 'featuredImage']) || '';
  var refs          = entry.getIn(['data', 'references']);
  var body          = props.widgetFor('body');
  var refsWidget    = props.widgetFor('references');

  var categoryLabels = {
    culture: 'Culture & Heritage', history: 'History',
    travel: 'Travel & Expat',      food: 'Food & Traditions',
    music: 'Music & Arts',         news: 'News & Updates'
  };
  var categoryLabel = categoryLabels[category] || '';

  var headerBg = featuredImage
    ? 'linear-gradient(to bottom, rgba(13,31,18,0.65) 0%, rgba(13,31,18,0.88) 100%), url(' + featuredImage + ') center/cover no-repeat'
    : 'linear-gradient(135deg, #0d1f12 0%, #1a4a2e 100%)';

  return h('div', { style: { background: '#faf8f4', fontFamily: 'Inter, sans-serif' } },

    // ── Hero header ──────────────────────────────────────
    h('header', { style: { background: headerBg, padding: '4rem 2.5rem 3.5rem' } },
      h('div', { style: { maxWidth: '68ch', margin: '0 auto' } },

        // Category + author row
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' } },
          categoryLabel && h('span', { style: {
            background: 'rgba(212,160,48,0.2)', color: '#d4a030',
            fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase',
            letterSpacing: '0.1em', padding: '0.25rem 0.75rem',
            borderRadius: '20px', border: '1px solid rgba(212,160,48,0.35)'
          }}, categoryLabel),
          author && h('span', { style: { fontSize: '0.85rem', color: 'rgba(245,240,232,0.65)' } }, 'by ' + author)
        ),

        // Title
        h('h1', { style: {
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '700',
          lineHeight: '1.15', color: '#f5f0e8',
          maxWidth: '20ch', marginBottom: excerpt ? '1.25rem' : '0'
        }}, title),

        // Excerpt / standfirst
        excerpt && h('p', { style: {
          fontFamily: '"Playfair Display", serif', fontSize: '1.1rem',
          fontStyle: 'italic', color: 'rgba(245,240,232,0.75)',
          maxWidth: '56ch', lineHeight: '1.65', margin: '0'
        }}, excerpt)
      )
    ),

    // ── Featured image card ───────────────────────────────
    featuredImage && h('div', { style: { maxWidth: '68ch', margin: '-3rem auto 0', padding: '0 2.5rem' } },
      h('div', { style: {
        borderRadius: '16px', overflow: 'hidden',
        boxShadow: '0 12px 56px rgba(0,0,0,0.4)',
        aspectRatio: '16 / 9', background: '#0d1f12'
      }},
        h('img', { src: featuredImage, alt: title, style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } })
      )
    ),

    // ── Body + references ─────────────────────────────────
    h('div', { style: { padding: '3rem 2.5rem 4rem' } },
      h('div', { style: { maxWidth: '68ch', margin: '0 auto' } },
        h('div', { className: 'prose' }, body),
        refs && h('div', { className: 'post-references' },
          h('h2', { className: 'references-heading' }, 'References & Further Reading'),
          h('div', { className: 'prose prose-references' }, refsWidget)
        )
      )
    )

  );
}

CMS.registerPreviewTemplate('posts',   PostPreview);
CMS.registerPreviewTemplate('stories', PostPreview);


// -------------------------------------------------------------
// Add new components below this line.
// Copy a block above as a template.
// -------------------------------------------------------------
