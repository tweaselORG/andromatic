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
/**
 * A map of unversioned Android development tools and their corresponding package names and paths to their binary
 * relative to `$ANDROID_HOME`.
 */
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
} as const;
/**
 * A map of versioned Android development tools and their corresponding package names and paths to their binary relative
 * to `$ANDROID_HOME`.
 */
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
} as const satisfies Record<string, { path: (version: string) => string; package: string }>;
/* eslint-enable camelcase */

/** The name of an Android development tool, either unversioned or versioned. */
export type AndroidToolName = keyof typeof versionedAndroidTools | keyof typeof unversionedAndroidTools;
/**
 * An Android development tool, specified as either a name (which will cause the latest installed or available version
 * to be used) or a name with an explicit version (only possible for versioned tools).
 *
 * The version in this context is _not_ the version of the tool itself, but rather the version of the package that
 * contains the tool.
 */
export type AndroidTool = AndroidToolName | { tool: keyof typeof versionedAndroidTools; packageVersion: string };

const ensureSdkmanager = async (options?: { ensureLicenses?: boolean }) => {
    // Google only provides the command-line tools binaries for Windows, macOS, and Linux.
    const platform = process.platform;
    if (platform !== 'win32' && platform !== 'darwin' && platform !== 'linux')
        throw new Error(`Unsupported platform: "${platform}"`);

    const androidHome = await globalCacheDir('andromatic');

    // Create license files just like Debian and Ubuntu do, see:
    // https://github.com/tweaselORG/meta/issues/26#issuecomment-1535036229
    const createLicenseFiles = async () => {
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
    };
    if (options?.ensureLicenses) await createLicenseFiles();

    const cmdlineToolsDir = join(androidHome, 'cmdline-tools');
    const sdkmanager = join(cmdlineToolsDir, 'latest', 'bin', 'sdkmanager');

    // Download cmdline-tools to get sdkmanager.
    if (!(await fs.exists(sdkmanager))) {
        // If `options?.ensureLicenses` is `true`, we already created the license files above.
        if (!options?.ensureLicenses) await createLicenseFiles();

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

/** A package that can be installed by `sdkmanager`. */
export type AvailablePackage = {
    /**
     * The argument to be passed to `sdkmanager` to install the package with this particular version (e.g.
     * `build-tools;33.0.2`).
     */
    path: string;
    /**
     * The version of the package (e.g. `28.0.0`). Note that these are not necessarily the same as the version that is
     * part of the `path`.
     */
    version: string;
    /** A human-readable description of the package (e.g. `Android SDK Command-line Tools`). */
    description: string;
};
/**
 * Fetch a list of available packages that can be installed by `sdkmanager`.
 *
 * @returns An array of packages, each with their package path, version and description.
 */
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

/**
 * Install one or more packages using `sdkmanager`. The specified packages are installed or updated to the latest
 * version (if already installed) in an automatically created `$ANDROID_HOME` managed by andromatic.
 *
 * @param packages The path(s) of the packages to install, as to be passed to `sdkmanager`.
 *
 * @returns The path to `$ANDROID_HOME` where the packages are installed.
 */
export const installPackages = async (...packages: string[]) => {
    const { androidHome, sdkmanager } = await ensureSdkmanager({ ensureLicenses: true });

    await execa(sdkmanager, packages, { env: { ANDROID_HOME: androidHome } });

    return androidHome;
};

/** Update all installed packages to the latest version using `sdkmanager`. */
export const updatePackages = async () => {
    const { androidHome, sdkmanager } = await ensureSdkmanager({ ensureLicenses: true });

    await execa(sdkmanager, ['--update'], { env: { ANDROID_HOME: androidHome } });
};

/**
 * Install the specified Android development tool if it is not already installed.
 *
 * If no version is specified for a versioned tool, the latest installed (if the tool was already installed) or
 * available version (if it isn't installed yet) is used.
 *
 * The `$ANDROID_HOME` directory where the package is installed is automatically created and managed by andromatic.
 *
 * @param tool The tool to install, either as just its name or with an explicit version.
 *
 * @returns The path to the installed tool's executable.
 */
export const installAndroidDevTool = async (tool: AndroidTool) => {
    if (typeof tool === 'string') {
        if (tool in unversionedAndroidTools) {
            const { package: packageName } = unversionedAndroidTools[tool as keyof typeof unversionedAndroidTools];
            await installPackages(packageName);
            return getAndroidDevToolPath(tool, { installIfNecessary: false });
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
            return getAndroidDevToolPath(tool, { installIfNecessary: false });
        }

        throw new Error(`Unsupported tool: "${tool}"`);
    }

    const { tool: toolName, packageVersion } = tool;
    if (!(toolName in versionedAndroidTools)) throw new Error(`Unsupported tool: ${toolName}@${packageVersion}`);

    const { package: packageName } = versionedAndroidTools[toolName];
    await installPackages(`${packageName};${packageVersion}`);
    return getAndroidDevToolPath(tool, { installIfNecessary: false });
};

/**
 * Get the path to an Android development tool's executable. If the tool is not installed yet, it will automatically be
 * installed (unless you set `options.installIfNecessary` to `false`.
 *
 * If no version is specified for a versioned tool, the latest installed (if the tool was already installed) or
 * available version (if it isn't installed yet) is used.
 *
 * @param tool The tool to get the path for, either as just its name or with an explicit version.
 * @param options Optional options to control the behaviour of this function, where:
 *
 *   - `installIfNecessary`: Whether to automatically install the tool if it is not already installed. Defaults to `true`.
 *
 * @returns The path to the installed tool's executable.
 */
export const getAndroidDevToolPath = async (
    tool: AndroidTool,
    options?: { installIfNecessary?: boolean }
): Promise<string> => {
    const { androidHome } = await ensureSdkmanager();
    const install = async (tool: AndroidTool) => {
        if (options?.installIfNecessary ?? true) return await installAndroidDevTool(tool);
        throw new Error(`Tool not installed: "${tool}"`);
    };

    if (typeof tool === 'string') {
        if (tool in unversionedAndroidTools) {
            const relativeToolPath = unversionedAndroidTools[tool as keyof typeof unversionedAndroidTools].path;
            const toolPath = join(androidHome, relativeToolPath);
            if (!(await fs.exists(toolPath))) return install(tool);
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

            if (!latestVersion) return install(tool);

            return join(
                androidHome,
                versionedAndroidTools[tool as keyof typeof versionedAndroidTools].path(latestVersion)
            );
        }

        throw new Error(`Unsupported tool: "${tool}"`);
    }

    const { tool: toolName, packageVersion } = tool;
    if (!(toolName in versionedAndroidTools)) throw new Error(`Unsupported tool: ${toolName}@${packageVersion}`);

    const relativeToolPath = versionedAndroidTools[toolName].path(packageVersion);
    const toolPath = join(androidHome, relativeToolPath);

    if (!(await fs.exists(toolPath))) return install(tool);
    return toolPath;
};

/**
 * Run an Android development tool. If the tool is not installed yet, it will automatically be installed. The tool is
 * executed using [`execa`](https://github.com/sindresorhus/execa).
 *
 * If no version is specified for a versioned tool, the latest installed (if the tool was already installed) or
 * available version (if it isn't installed yet) is used.
 *
 * @param tool The tool to run, either as just its name or with an explicit version.
 * @param args The arguments to pass to the command.
 * @param execaOptions The options to pass to execa, see: https://github.com/sindresorhus/execa#options-1.
 *
 * @returns The result from execa, see: https://github.com/sindresorhus/execa#childprocess.
 */
export const runAndroidDevTool = async (tool: AndroidTool, args?: string[], execaOptions?: ExecaOptions) => {
    const { androidHome } = await ensureSdkmanager();

    const toolPath = await getAndroidDevToolPath(tool);
    return execa(toolPath, args, { ...execaOptions, env: { ANDROID_HOME: androidHome, ...execaOptions?.env } });
};
