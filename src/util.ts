import semverCoerce from 'semver/functions/coerce.js';
import semverCompare from 'semver/functions/compare.js';

export const getLatestVersion = (versions: string[], options?: { allowPrerelease?: boolean }) =>
    [...versions]
        .filter((v) => options?.allowPrerelease === undefined || options?.allowPrerelease || !v.includes('-rc'))
        .sort((a, b) => {
            if (a === 'latest') return 1;
            if (b === 'latest') return -1;

            const aParsed = semverCoerce(a);
            const bParsed = semverCoerce(b);

            if (aParsed && bParsed) return semverCompare(aParsed, bParsed);

            throw new Error(`Invalid version: ${a} or ${b}`);
        })
        .pop();
