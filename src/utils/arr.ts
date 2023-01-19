export const chunks = (a: any, size: any) =>
    Array.from(new Array(Math.ceil(a.length / size)), (_, i) =>
        a.slice(i * size, i * size + size))