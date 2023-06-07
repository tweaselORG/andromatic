import fs from 'fs-extra';
import type { MergeExclusive } from 'type-fest';
import { ensureSdkmanager, installPackages, runAndroidDevTool } from './index';

export type EmulatorOptions = MergeExclusive<
    {
        package: string;
    },
    {
        // TODO: Not all combinations are possible.
        apiLevel: number;
        variant:
            | 'default'
            | 'google_apis'
            | 'google_apis_playstore'
            | 'aosp_atd'
            | 'google_atd'
            | 'android-tv'
            | 'google-tv'
            | 'android-wear'
            | 'android-wear-cn';
        architecture: 'x86' | 'x86_64' | 'armeabi-v7a' | 'arm64-v8a';
    }
> & {
    device?: string;
    // TODO: In MB. And this might not be respected exactly. Sometimes, the partition is >= the specified size.
    partitionSize?: number;
    force?: boolean;
};

export const createEmulator = async (name: string, options: EmulatorOptions) => {
    const { androidHome } = await ensureSdkmanager();

    const pkg = options.package
        ? options.package
        : `system-images;android-${options.apiLevel};${options.variant};${options.architecture}`;

    if (!(await fs.pathExists(`${androidHome}/${pkg.split(';').join('/')}/system.img`))) await installPackages(pkg);

    await runAndroidDevTool('avdmanager', [
        'create',
        'avd',
        '--name',
        name,
        '--package',
        pkg,
        '--device',
        options.device || 'pixel_4',
        ...(options.force ? ['--force'] : []),
    ]);

    if (options.partitionSize) {
        // To change the partition size, we need to start the emulator once with these arguments. It doesn't need to
        // boot up fully, so we can kill it after a few seconds. Subsequent runs won't need the arguments.
        await runAndroidDevTool(
            'emulator',
            ['-avd', name, '-no-window', '-partition-size', options.partitionSize.toString(), '-wipe-data'],
            { timeout: 5000, reject: false }
        );
    }
};
