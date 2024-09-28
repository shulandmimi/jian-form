import jsonpath from "jsonpath";

export function joinPaths(...paths: (string | undefined)[]): string {
    return paths.filter(Boolean).join('.');
}

export function parsePaths(paths: string): string[] {
    return jsonpath
        .parse(`$.${paths}`)
        .map(item => {
            if (item.expression === 'root') {
                return;
            }

            if (item.expression.type === 'identifier') {
                return item.expression.value;
            }
        })
        .filter(Boolean);
}

export function setPaths(root: Record<string, unknown>, paths: string[], value: unknown) {
    let o = root;
    for (let i = 0; i < paths.length - 1; i++) {
        o = o[paths[i]] as Record<string, unknown>;
    }
    if (o && paths.length) {
        o[paths[paths.length - 1]] = value;
    }
}
