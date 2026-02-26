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
// Add new components below this line.
// Copy the block above as a template.
// -------------------------------------------------------------
