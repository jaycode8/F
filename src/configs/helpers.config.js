function svg(cls, paths) {
    return `<svg class="${cls}" fill="none" stroke="currentColor" viewBox="0 0 24 24">${paths}</svg>`;
}
const genericPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>`;

export const helpers = {
    eq: (a, b) => a === b,

    neq: (a, b) => a != b,

    gt: (a, b) => a > b,

    lt: (a, b) => a < b,

    or: (a, b) => a || b,

    json: (ctx) => JSON.stringify(ctx),

    formatDate: (date) => date ? new Date(date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : '—',

    formatSize: (bytes) => {
        if (!bytes) return '—';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        if (bytes < 1024 ** 3) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
        return (bytes / 1024 ** 3).toFixed(2) + ' GB';
    },

    mimeBackground: (mime) => {
        if (!mime) return 'bg-amber-500/10';
        if (mime.startsWith('image/')) return 'bg-purple-500/10';
        if (mime.startsWith('video/')) return 'bg-rose-500/10';
        if (mime.startsWith('audio/')) return 'bg-cyan-500/10';
        if (mime === 'application/pdf') return 'bg-red-500/10';
        if (mime.includes('word')) return 'bg-sky-500/10';
        if (mime.includes('spreadsheet') || mime.includes('excel')) return 'bg-emerald-500/10';
        if (mime.includes('zip') || mime.includes('compressed')) return 'bg-yellow-500/10';
        if (mime.startsWith('text/')) return 'bg-stone-500/10';
        return 'bg-amber-500/10';
    },

    mimeIcon: (mime) => {
        const cls = (color) => `w-4 h-4 text-${color}-400`;
        if (!mime) return svg(cls('amber'), genericPath);

        if (mime.startsWith('image/'))
            return svg(cls('purple'), `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>`);

        if (mime.startsWith('video/'))
            return svg(cls('rose'), `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>`);

        if (mime.startsWith('audio/'))
            return svg(cls('cyan'), `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>`);

        if (mime === 'application/pdf')
            return svg(cls('red'), `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 13h1.5a1 1 0 000-2H9v4m0-2h1.5M14 11v4m0-4h1a1 1 0 010 2h-1"/>`);

        if (mime.includes('word'))
            return svg(cls('sky'), `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 13l1.5 4 1.5-4 1.5 4 1.5-4"/>`);

        if (mime.includes('spreadsheet') || mime.includes('excel'))
            return svg(cls('emerald'), `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 11l2 2-2 2m4-4l-2 2 2 2"/>`);

        if (mime.includes('zip') || mime.includes('compressed'))
            return svg(cls('yellow'), `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>`);

        if (mime.startsWith('text/'))
            return svg(cls('stone'), genericPath);

        return svg(cls('amber'), genericPath);
    },

    // Build query string preserving existing params
    buildQuery: (options) => {
        const hash = options.hash || {};
        const params = new URLSearchParams();
        Object.entries(hash).forEach(([k, v]) => {
            if (v !== null && v !== undefined && v !== '') params.set(k, v);
        });
        return params.toString();
    },// Mime type short label for badge
    mimeLabel(mime) {
        if (!mime) return 'file';
        if (mime.startsWith('image/')) return mime.split('/')[1].toUpperCase();
        if (mime.startsWith('video/')) return mime.split('/')[1].toUpperCase();
        if (mime.startsWith('audio/')) return mime.split('/')[1].toUpperCase();
        if (mime === 'application/pdf') return 'PDF';
        if (mime.includes('word')) return 'DOCX';
        if (mime.includes('spreadsheet') || mime.includes('excel')) return 'XLSX';
        if (mime.includes('zip')) return 'ZIP';
        if (mime.startsWith('text/')) return mime.split('/')[1].toUpperCase();
        return 'FILE';
    },

    // Mime type badge colour classes
    mimeBadge(mime) {
        if (!mime) return 'bg-amber-500/10 text-amber-400';
        if (mime.startsWith('image/')) return 'bg-purple-500/10 text-purple-400';
        if (mime.startsWith('video/')) return 'bg-rose-500/10 text-rose-400';
        if (mime.startsWith('audio/')) return 'bg-cyan-500/10 text-cyan-400';
        if (mime === 'application/pdf') return 'bg-red-500/10 text-red-400';
        if (mime.includes('word')) return 'bg-sky-500/10 text-sky-400';
        if (mime.includes('spreadsheet') || mime.includes('excel')) return 'bg-emerald-500/10 text-emerald-400';
        if (mime.includes('zip')) return 'bg-yellow-500/10 text-yellow-400';
        if (mime.startsWith('text/')) return 'bg-stone-500/10 text-stone-400';
        return 'bg-amber-500/10 text-amber-400';
    },// First letter of username capitalised
    initial(str) {
        if (!str) return '?';
        return str.charAt(0).toUpperCase();
    },

    // Storage percent used — returns 0-100
    storagePercent(used, limit) {
        if (!limit || limit === 0) return 0;
        return Math.min(Math.round((used / limit) * 100), 100);
    },

    // gte — greater than or equal (for storage bar colour threshold)
    gte(a, b) {
        return a >= b;
    },
}
