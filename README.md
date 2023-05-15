# andromatic

> Automate the installation and running of the Android developer tools.

Andromatic is a Node.js module that automates the installation and usage of the [Android development tools](https://developer.android.com/tools) that are distributed as part of the Android SDK, such as `adb`, `emulator`, `dexdump`, `aapt`, `cmake`, etc. It automatically downloads and manages the required packages for you on demand using `sdkmanager`, and provides functions to get the path or run any tool with a given version. It also automatically downloads a suitable version of Java if it isn't installed already. This is especially useful if you are writing a library that depends on (some of) these tools but don't want your users to have to install them manually.

In particular, andromatic can install and run the tools from the following SDK packages for you:

* [Android SDK Command-Line Tools](https://developer.android.com/tools#tools-sdk)
* [Android SDK Build Tools](https://developer.android.com/tools#tools-build)
* [Android SDK Platform Tools](https://developer.android.com/tools#tools-platform)
* [Android Emulator](https://developer.android.com/tools#tools-emulator)

In addition, you can also install any other packages supported by `sdkmanager`, such as the NDK and system images, but there is no special additional handling for these.

Andromatic automatically creates and manages an `$ANDROID_HOME` directory for you in your operating system's default cache directory. If you already have another Android SDK installation, andromatic will _not_ use or interfere with that.

A few things to keep in mind:

* If you want to work with physical devices, [additional setup steps may be necessary depending on your system](https://developer.android.com/studio/run/device#setting-up). Andromatic doesn't automate those. On Ubuntu, you need to be a member of the `plugdev` group (`sudo usermod -aG plugdev <username>`) and have `udev` rules for your device (`sudo apt install android-sdk-platform-tools-common`). For other distributions, see [android-udev-rules](https://github.com/M0Rf30/android-udev-rules).
* The binaries downloaded by andromatic are released by Google under proprietary licenses that you need to follow. See especially the [Android Software Development Kit License Agreement](https://developer.android.com/studio/terms).
* Andromatic is a wrapper around Google's `sdkmanager`, it downloads the packages from `https://dl.google.com`. If no Java installation was found, it downloads binaries from the [Adoptium](https://adoptium.net/) project. Be aware of the privacy implications.

## Installation

You can install andromatic using yarn or npm:

```sh
yarn add andromatic
# or `npm i andromatic`
```

## API reference

A full API reference can be found in the [`docs` folder](/docs/README.md).

## Usage

You can run tools through the `runAndroidDevTool()` function. The first time you use a new tool, it will be downloaded and installed automatically. This might take a moment. Subsequent uses will be much faster, as the tool will already be installed.

Here is how you would run `adb devices` and print the output:

```ts
import { runAndroidDevTool } from 'andromatic';

(async () => {
    const { stdout } = await runAndroidDevTool('adb', ['devices']);
    console.log(stdout);
})();
```

Note how we didn't specify a version. In this case, andromatic will automatically use either the latest installed version of the tool (if it was installed already) or download the latest available version otherwise.

`runAndroidDevTool()` is a wrapper around [`execa`](https://github.com/sindresorhus/execa). As such, it also takes optional array of arguments to pass to the tool (we passed `devices` here), and an optional object of [options](https://github.com/sindresorhus/execa#options-1) to pass to execa. It returns a promise that resolves to the [result from `execa`](https://github.com/sindresorhus/execa#childprocess), which contains properties such as `stdout`, `stderr`, `exitCode`, etc.

If you want, you can also use a particular version of a tool. For this, pass an object with the tool's name and the package version you want to use instead of just a string:

```ts
import { runAndroidDevTool } from 'andromatic';

(async () => {
    const { stdout } = await runAndroidDevTool(
        { tool: 'aapt', packageVersion: '32.0.0' },
        ['dump', 'badging', 'app.apk']
    );
    console.log(stdout);
})();
```

As before, if you didn't have version 32.0.0 of the build tools (which `aapt` is part of) installed already, andromatic will automatically download and install it for you. Note that the version we specified was not the version of `aapt` itself, but the version of the build tools package that contains it.

Some packages in the Android SDK (like the platform tools) are unversioned. For these, you cannot specify an explicit version. Andromatic will always use the installed version if available, or download the latest version otherwise. If you want to update your installed packages, you can use the `updatePackages()` function:

```ts
import { updatePackages } from 'andromatic';

(async () => {
    await updatePackages();
})();
```

If you want, you can also install packages and tools manually without running them. This is especially useful if you want to prepare your environment to ensure that tools load quickly when you actually want to use them (if you depend on andromatic in your own library, you could for example do this in a `postinstall` script). For this, you have two options:

```ts
import { installAndroidDevTool, installPackages } from 'andromatic';

(async () => {
    // You can either specify individual tools to install using the
    // `installAndroidDevTool()` function, which will automatically
    // figure out which packages to install for you…

    // Install `adb` by downloading the latest available platform tools.
    // If you already have have them installed, they will not be updated.
    await installAndroidDevTool('adb');
    // Install `dexdump` from version 31.0.0 of the build tools.
    await installAndroidDevTool(
        { tool: 'dexdump', packageVersion: '31.0.0' }
    );

    // …or you can use the `installPackages()` function to specify the
    // specific `sdkmanager` packages you want to install.

    // Install version 9.0 of the commandline tools, and version
    // 3.6.4111459 of cmake.
    await installPackages('cmdline-tools;9.0', 'cmake;3.6.4111459');
})();
```

Finally, andromatic provides the following more advanced functions:

* `listPackages()` gives you an array of available packages that can be installed by `sdkmanager`, each with their path, version, and description.
* `getAndroidDevToolPath()` returns the path to a tool's executable (and optionally installs it if necessary) without running it.

## CLI

Andromatic also provides a command-line tool that you can use to install packages and tools without writing any code. Support for running tools [is planned for the future](https://github.com/tweaselORG/andromatic/issues/2).

You can use the `andromatic-install` command to install packages and tools.

In package mode, you can specify one or more paths to Android SDK packages that you want to install using the `-p` or `--package` option. The paths should match the ones used by `sdkmanager`. For example, to install the latest version of the command-line tools and version 29.0.1 of the build tools, you would run:

```sh
andromatic-install -p "cmdline-tools;latest" -p "build-tools;29.0.1"
```

In tool mode, you can specify the name of a tool from the Android SDK that you want to install using the `-t` or `--tool` option. Andromatic will automatically figure out which package contains the tool and install it for you. You can optionally specify a version of the package to install the tool from using the `-v` or `--package-version` option. For example, to install the `dexdump` tool from version 31.0.0 of the build tools, you can run:

```sh
andromatic-install -t dexdump -v 31.0.0
```

For more details and options, run `andromatic-install --help`:

```
andromatic-install [command]

Commands:
  andromatic-install autocomplete  generate completion script

Install `sdkmanager` packages:
  -p, --package  Path(s) to Android SDK package(s) to install.             [array]

Install an individual tool:
  -t, --tool             Tool from the Android SDK to install.            [string]
  -v, --package-version  Version of the package to install the tool from.
                                                                          [string]

Options:
      --help     Show help                                               [boolean]
      --version  Show version number                                     [boolean]

Examples:
  andromatic-install                                  Install two `sdkmanager`
    -p "system-images;android-33;google_apis;x86_64"  packages.
    -p "platforms;android-33"   
  andromatic-install -t aapt                          Install the latest version
                                                      of the `aapt` tool.
  andromatic-install -t aapt -v 30.0.3                Install the `aapt` tool from
                                                      the `build-tools;30.0.3`
                                                      package.
```

## License

This code is licensed under the MIT license, see the [`LICENSE`](LICENSE) file for details.

Issues and pull requests are welcome! Please be aware that by contributing, you agree for your work to be licensed under an MIT license.
