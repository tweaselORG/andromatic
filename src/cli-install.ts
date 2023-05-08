#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import type { AndroidTool } from './index';
import { installAndroidDevTool, installPackages, unversionedAndroidTools } from './index';

const argv = yargs(hideBin(process.argv))
    .options({
        package: {
            type: 'string',
            array: true,
            alias: 'p',
            description: 'Path(s) to Android SDK package(s) to install.',
            conflicts: 'tool',
            group: 'Install `sdkmanager` packages:',
        },

        tool: {
            type: 'string',
            alias: 't',
            description: 'Tool from the Android SDK to install.',
            conflicts: 'package',
            group: 'Install an individual tool:',
        },
        'package-version': {
            type: 'string',
            alias: 'v',
            description: 'Version of the package to install the tool from.',
            conflicts: 'package',
            implies: 'tool',
            group: 'Install an individual tool:',
        },
    })
    .example(
        '$0 -p "system-images;android-33;google_apis;x86_64" -p "platforms;android-33"',
        'Install two `sdkmanager` packages.'
    )
    .example('$0 -t aapt', 'Install the latest version of the `aapt` tool.')
    .example('$0 -t aapt -v 30.0.3', 'Install the `aapt` tool from the `build-tools;30.0.3` package.')
    .check((argv) => {
        if (!argv.package && !argv.tool) throw new Error('You need specify either `--package` or `--tool`.');

        if (argv.tool && argv['package-version'] && Object.keys(unversionedAndroidTools).includes(argv.tool))
            throw new Error(`The tool \`${argv.tool}\` does not support versioning.`);

        return true;
    })
    .completion('autocomplete')
    .parseSync();

(async () => {
    if (argv.package) {
        await installPackages(...argv.package);
    } else if (argv.tool) {
        const tool = argv.packageVersion ? { tool: argv.tool, packageVersion: argv.packageVersion } : argv.tool;
        await installAndroidDevTool(tool as AndroidTool);
    }
})();
