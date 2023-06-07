import fs from 'fs-extra';
import type { MergeExclusive } from 'type-fest';
import { ensureSdkmanager, installPackages, runAndroidDevTool } from './index';

/**
 * The options for creating an emulator using the {@link createEmulator} function.
 *
 * For choosing the system image you can either:
 *
 * - Specify only `package`, or…
 * - Specify `apiLevel`, `variant`, and `architecture` but not `package`. Note that not all combinations of these
 *   properties actually have a system image available.
 */
export type EmulatorOptions = MergeExclusive<
    {
        /**
         * The package name of the system image to use for the emulator (as understood by `sdkmanager`).
         *
         * @example `system-images;android-30;google_apis;x86_64`
         */
        package: string;
    },
    {
        /** The API level of the system image to use for the emulator, such as 30 for Android 11. */
        apiLevel: number;
        /**
         * The variant of the system image to use for the emulator. It determines the features and services available on
         * the emulator. Possible values are:
         *
         * - `default`: Vanilla Android, without Google APIs or Play Store.
         * - `google_apis`: Android with Google APIs.
         * - `google_apis_playstore`: Android with Google APIs and Play Store.
         * - `aosp_atd`: Automated Test Device (ATD), special image [designed to consume less CPU and
         *   memory](https://android-developers.googleblog.com/2021/10/whats-new-in-scalable-automated-testing.html).
         * - `google_atd`: Automated Test Device (ATD) with Google APIs.
         * - `android-tv`: Android TV.
         * - `google-tv`: Google TV.
         * - `android-wear`: Wear OS.
         * - `android-wear-cn`: China version of Wear OS 3.
         */
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
        /** The architecture of the system image to use for the emulator. */
        architecture: 'x86' | 'x86_64' | 'armeabi-v7a' | 'arm64-v8a';
    }
> & {
    /**
     * The device name to use for the emulator, which determines the screen size, resolution, density and hardware
     * features of the emulator. Defaults to 'pixel_4'. To see the list of available devices, run `avdmanager list
     * device`.
     */
    device?: string;
    /**
     * The partition size of the emulator in MB. Note that sometimes the partition size is not respected exactly, but
     * the partition will always have at least the specified size.
     *
     * To change the partition size, the emulator will be started once and then killed.
     */
    partitionSize?: number;
    /**
     * Whether to overwrite an existing emulator with the same name or not. If true, it will delete the existing
     * emulator and create a new one. If false, it will throw an error if an emulator with the same name already exists.
     * Defaults to false.
     */
    force?: boolean;
};

/**
 * Creates an emulator with the given name and options. It will install the required system image if it is not already
 * installed, and create the emulator.
 *
 * @param name The name of the emulator to create.
 * @param options The options for creating the emulator. See {@link EmulatorOptions}.
 */
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
