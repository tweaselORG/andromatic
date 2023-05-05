import fetch from 'cross-fetch';
import decompress from 'decompress';
import type { Options as ExecaOptions } from 'execa';
import { execa } from 'execa';
import fs from 'fs-extra';
import globalCacheDir from 'global-cache-dir';
import { globby } from 'globby';
import { join } from 'path';
import { getLatestVersion } from './util';

/* eslint-disable camelcase */
export const unversionedAndroidTools = {
    nimble_bridge: { path: 'emulator/nimble_bridge', package: 'emulator' },
    'goldfish-webrtc-bridge': { path: 'emulator/goldfish-webrtc-bridge', package: 'emulator' },
    'qemu-img': { path: 'emulator/qemu-img', package: 'emulator' },
    'emulator-check': { path: 'emulator/emulator-check', package: 'emulator' },
    qsn: { path: 'emulator/qsn', package: 'emulator' },
    emulator: { path: 'emulator/emulator', package: 'emulator' },
    'qemu-system-armel': { path: 'emulator/qemu/linux-x86_64/qemu-system-armel', package: 'emulator' },
    'qemu-system-x86_64-headless': {
        path: 'emulator/qemu/linux-x86_64/qemu-system-x86_64-headless',
        package: 'emulator',
    },
    'qemu-system-aarch64-headless': {
        path: 'emulator/qemu/linux-x86_64/qemu-system-aarch64-headless',
        package: 'emulator',
    },
    'qemu-system-i386': { path: 'emulator/qemu/linux-x86_64/qemu-system-i386', package: 'emulator' },
    'qemu-system-aarch64': { path: 'emulator/qemu/linux-x86_64/qemu-system-aarch64', package: 'emulator' },
    'qemu-system-i386-headless': { path: 'emulator/qemu/linux-x86_64/qemu-system-i386-headless', package: 'emulator' },
    'qemu-system-armel-headless': {
        path: 'emulator/qemu/linux-x86_64/qemu-system-armel-headless',
        package: 'emulator',
    },
    'qemu-system-x86_64': { path: 'emulator/qemu/linux-x86_64/qemu-system-x86_64', package: 'emulator' },
    mksdcard: { path: 'emulator/mksdcard', package: 'emulator' },
    crashpad_handler: { path: 'emulator/crashpad_handler', package: 'emulator' },
    'fsck.ext4': { path: 'emulator/bin64/fsck.ext4', package: 'emulator' },
    e2fsck: { path: 'emulator/bin64/e2fsck', package: 'emulator' },
    tune2fs: { path: 'emulator/bin64/tune2fs', package: 'emulator' },
    'mkfs.ext4': { path: 'emulator/bin64/mkfs.ext4', package: 'emulator' },
    resize2fs: { path: 'emulator/bin64/resize2fs', package: 'emulator' },

    'hprof-conv': { path: 'platform-tools/hprof-conv', package: 'platform-tools' },
    adb: { path: 'platform-tools/adb', package: 'platform-tools' },
    fastboot: { path: 'platform-tools/fastboot', package: 'platform-tools' },
    dmtracedump: { path: 'platform-tools/dmtracedump', package: 'platform-tools' },
    make_f2fs_casefold: { path: 'platform-tools/make_f2fs_casefold', package: 'platform-tools' },
    etc1tool: { path: 'platform-tools/etc1tool', package: 'platform-tools' },
    sqlite3: { path: 'platform-tools/sqlite3', package: 'platform-tools' },
    mke2fs: { path: 'platform-tools/mke2fs', package: 'platform-tools' },
    make_f2fs: { path: 'platform-tools/make_f2fs', package: 'platform-tools' },
};
export const versionedAndroidTools = {
    aapt: { path: (v) => `build-tools/${v}/aapt`, package: 'build-tools' },
    'split-select': { path: (v) => `build-tools/${v}/split-select`, package: 'build-tools' },
    zipalign: { path: (v) => `build-tools/${v}/zipalign`, package: 'build-tools' },
    bcc_compat: { path: (v) => `build-tools/${v}/bcc_compat`, package: 'build-tools' },
    dexdump: { path: (v) => `build-tools/${v}/dexdump`, package: 'build-tools' },
    aidl: { path: (v) => `build-tools/${v}/aidl`, package: 'build-tools' },
    lld: { path: (v) => `build-tools/${v}/lld`, package: 'build-tools' },
    aapt2: { path: (v) => `build-tools/${v}/aapt2`, package: 'build-tools' },
    'llvm-rs-cc': { path: (v) => `build-tools/${v}/llvm-rs-cc`, package: 'build-tools' },
    apksigner: { path: (v) => `build-tools/${v}/apksigner`, package: 'build-tools' },
    d8: { path: (v) => `build-tools/${v}/d8`, package: 'build-tools' },

    cmake: { path: (v) => `cmake/${v}/bin/cmake`, package: 'cmake' },
    cpack: { path: (v) => `cmake/${v}/bin/cpack`, package: 'cmake' },
    ninja: { path: (v) => `cmake/${v}/bin/ninja`, package: 'cmake' },
    ctest: { path: (v) => `cmake/${v}/bin/ctest`, package: 'cmake' },

    screenshot2: { path: (v) => `cmdline-tools/${v}/bin/screenshot2`, package: 'cmdline-tools' },
    apkanalyzer: { path: (v) => `cmdline-tools/${v}/bin/apkanalyzer`, package: 'cmdline-tools' },
    profgen: { path: (v) => `cmdline-tools/${v}/bin/profgen`, package: 'cmdline-tools' },
    retrace: { path: (v) => `cmdline-tools/${v}/bin/retrace`, package: 'cmdline-tools' },
    avdmanager: { path: (v) => `cmdline-tools/${v}/bin/avdmanager`, package: 'cmdline-tools' },
    lint: { path: (v) => `cmdline-tools/${v}/bin/lint`, package: 'cmdline-tools' },
    sdkmanager: { path: (v) => `cmdline-tools/${v}/bin/sdkmanager`, package: 'cmdline-tools' },
} satisfies Record<string, { path: (version: string) => string; package: string }>;
/* eslint-enable camelcase */

export type AndroidToolName = keyof typeof versionedAndroidTools | keyof typeof unversionedAndroidTools;
export type AndroidTool = AndroidToolName | { tool: keyof typeof versionedAndroidTools; version: string };

const platform = process.platform;
if (platform !== 'win32' && platform !== 'darwin' && platform !== 'linux')
    throw new Error(`Unsupported platform: "${platform}"`);

const ensureSdkmanager = async () => {
    const androidHome = await globalCacheDir('andromatic');

    // Create license files just like Debian and Ubuntu do, see:
    // https://github.com/tweaselORG/meta/issues/26#issuecomment-1535036229
    const licensesDir = join(androidHome, 'licenses');
    await fs.mkdir(licensesDir, { recursive: true });
    const licenseHashes = {
        'android-googletv-license': '601085b94cd77f0b54ff86406957099ebe79c4d6',
        'android-sdk-arm-dbt-license': '859f317696f67ef3d7f30a50a5560e7834b43903',
        'android-sdk-license': '24333f8a63b6825ea9c5514f83c2829b004d1fee',
        'android-sdk-preview-license': '84831b9409646a918e30573bab4c9c91346d8abd',
        'google-gdk-license': '33b6a2b64607f11b759f320ef9dff4ae5c47d97a',
        'mips-android-sysimage-license': 'e9acab5b5fbb560a72cfaecce8946896ff6aab9d',
    };
    for (const [license, hash] of Object.entries(licenseHashes)) {
        const licenseFile = join(licensesDir, license);
        await fs.writeFile(licenseFile, hash);
    }

    const cmdlineToolsDir = join(androidHome, 'cmdline-tools');
    const sdkmanager = join(cmdlineToolsDir, 'latest', 'bin', 'sdkmanager');

    // Download cmdline-tools to get sdkmanager.
    if (!(await fs.exists(sdkmanager))) {
        const cmdlineToolsUrls = {
            win32: 'https://dl.google.com/android/repository/commandlinetools-win-9477386_latest.zip',
            darwin: 'https://dl.google.com/android/repository/commandlinetools-mac-9477386_latest.zip',
            linux: 'https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip',
        };
        const cmdlineToolsZip = await fetch(cmdlineToolsUrls[platform]).then((res) => res.arrayBuffer());

        await fs.mkdir(cmdlineToolsDir, { recursive: true });

        await decompress(Buffer.from(cmdlineToolsZip), cmdlineToolsDir);
        // See: https://developer.android.com/tools/sdkmanager
        await fs.rename(join(cmdlineToolsDir, 'cmdline-tools'), join(cmdlineToolsDir, 'latest'));
    }

    return { androidHome, sdkmanager };
};

export type AvailablePackage = { path: string; version: string; description: string };
export const listPackages = async (): Promise<AvailablePackage[]> => {
    const { androidHome, sdkmanager } = await ensureSdkmanager();

    const { stdout } = await execa(sdkmanager, ['--list'], { env: { ANDROID_HOME: androidHome } });

    const lines = stdout.split('\n');
    /*
    Available Packages:
    Path                                 | Version      | Description
    -------                              | -------      | -------
    add-ons;addon-google_apis-google-15  | 3            | Google APIs
    */
    const availableHeaderIndex = lines.findIndex((line) => line.startsWith('Available Packages:'));

    return lines
        .slice(availableHeaderIndex + 3)
        .map((line) => line.split('|').map((v) => v.trim()))
        .map(([path, version, description]) => ({ path, version, description }))
        .filter((p): p is AvailablePackage => !!p.path && !!p.version && !!p.description);
};

export const installPackages = async (...packages: string[]) => {
    const { androidHome, sdkmanager } = await ensureSdkmanager();

    await execa(sdkmanager, packages, { env: { ANDROID_HOME: androidHome } });

    return androidHome;
};

export const updatePackages = async () => {
    const { androidHome, sdkmanager } = await ensureSdkmanager();

    await execa(sdkmanager, ['--update'], { env: { ANDROID_HOME: androidHome } });
};

export const installAndroidDevTool = async (tool: AndroidTool) => {
    if (typeof tool === 'string') {
        if (tool in unversionedAndroidTools) {
            const { package: packageName } = unversionedAndroidTools[tool as keyof typeof unversionedAndroidTools];
            await installPackages(packageName);
            return getAndroidDevToolPath(tool);
        } else if (tool in versionedAndroidTools) {
            const { package: packageName } = versionedAndroidTools[tool as keyof typeof versionedAndroidTools];

            const latestVersion = getLatestVersion(
                (await listPackages())
                    .filter((p) => p.path.startsWith(packageName))
                    .map((p) => p.path.split(';').pop())
                    .filter((v): v is string => !!v),
                { allowPrerelease: false }
            );
            if (!latestVersion) throw new Error(`No installable package found for: ${tool}`);

            await installPackages(`${packageName};${latestVersion}`);
            return getAndroidDevToolPath(tool);
        }

        throw new Error(`Unsupported tool: "${tool}"`);
    }

    const { tool: toolName, version } = tool;
    if (!(toolName in versionedAndroidTools)) throw new Error(`Unsupported: ${toolName}`);

    const { package: packageName } = versionedAndroidTools[toolName];
    await installPackages(`${packageName};${version}`);
    return getAndroidDevToolPath(tool);
};

export const getAndroidDevToolPath = async (tool: AndroidTool): Promise<string> => {
    const { androidHome } = await ensureSdkmanager();

    if (typeof tool === 'string') {
        if (tool in unversionedAndroidTools) {
            const relativeToolPath = unversionedAndroidTools[tool as keyof typeof unversionedAndroidTools].path;
            const toolPath = join(androidHome, relativeToolPath);
            if (!(await fs.exists(toolPath))) return await installAndroidDevTool(tool);
            return toolPath;
        } else if (tool in versionedAndroidTools) {
            const relativeGlobToolPath = versionedAndroidTools[tool as keyof typeof versionedAndroidTools].path('*');
            const relativeRegexToolPath =
                versionedAndroidTools[tool as keyof typeof versionedAndroidTools].path('(.+)');

            const installedTools = await globby(relativeGlobToolPath, { cwd: androidHome });
            const installedVersions = installedTools
                .map((p) => p.match(relativeRegexToolPath)?.[1])
                .filter((v): v is string => !!v);
            const latestVersion = getLatestVersion(installedVersions);

            if (!latestVersion) return await installAndroidDevTool(tool);

            return join(
                androidHome,
                versionedAndroidTools[tool as keyof typeof versionedAndroidTools].path(latestVersion)
            );
        }

        throw new Error(`Unsupported tool: "${tool}"`);
    }

    const { tool: toolName, version } = tool;
    if (!(toolName in versionedAndroidTools)) throw new Error(`Unsupported: ${toolName}`);

    const relativeToolPath = versionedAndroidTools[toolName].path(version);
    const toolPath = join(androidHome, relativeToolPath);

    if (!(await fs.exists(toolPath))) return await installAndroidDevTool(tool);
    return toolPath;
};

export const runAndroidDevTool = async (tool: AndroidTool, args?: string[], execaOptions?: ExecaOptions) => {
    const { androidHome } = await ensureSdkmanager();

    const toolPath = await getAndroidDevToolPath(tool);
    return execa(toolPath, args, { ...execaOptions, env: { ANDROID_HOME: androidHome, ...execaOptions?.env } });
};
