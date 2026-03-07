
export const helpers = {
    eq: (a, b) => a === b,

    neq: (a, b) => a != b,

    gt: (a, b) => a > b,

    lt: (a, b) => a < b,

    or: (a, b) => a || b,

    json: (ctx) => JSON.stringify(ctx),

    formatDate: (date) => date ? new Date(date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : '—',
}
