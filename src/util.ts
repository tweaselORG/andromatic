import locateJavaHomeModule from '@viperproject/locate-java-home';
import type { IJavaHomeInfo, ILocateJavaHomeOptions } from '@viperproject/locate-java-home/js/es6/lib/interfaces';
import semverCoerce from 'semver/functions/coerce.js';
import semverCompare from 'semver/functions/compare.js';

// For some reason the default export of locate-java-home is not set correctly, so we need to do this annoying little dance
const locateJavaHome = (locateJavaHomeModule as unknown as { default: typeof locateJavaHomeModule }).default;

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

export const findJavaHome = (options?: ILocateJavaHomeOptions) =>
    new Promise<IJavaHomeInfo[] | undefined>((resolve, reject) => {
        locateJavaHome(options || {}, (err, javaHomes) => {
            if (err) return reject(err);

            resolve(javaHomes?.sort((a, b) => semverCompare(a.version, b.version)));
        });
    });
