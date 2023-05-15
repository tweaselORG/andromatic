andromatic

# andromatic

## Table of contents

### Type Aliases

- [AndroidTool](README.md#androidtool)
- [AndroidToolName](README.md#androidtoolname)
- [AvailablePackage](README.md#availablepackage)

### Variables

- [unversionedAndroidTools](README.md#unversionedandroidtools)
- [versionedAndroidTools](README.md#versionedandroidtools)

### Functions

- [getAndroidDevToolPath](README.md#getandroiddevtoolpath)
- [installAndroidDevTool](README.md#installandroiddevtool)
- [installPackages](README.md#installpackages)
- [listPackages](README.md#listpackages)
- [runAndroidDevTool](README.md#runandroiddevtool)
- [updatePackages](README.md#updatepackages)

## Type Aliases

### AndroidTool

Ƭ **AndroidTool**: [`AndroidToolName`](README.md#androidtoolname) \| { `packageVersion`: `string` ; `tool`: keyof typeof [`versionedAndroidTools`](README.md#versionedandroidtools)  }

An Android development tool, specified as either a name (which will cause the latest installed or available version
to be used) or a name with an explicit version (only possible for versioned tools).

The version in this context is _not_ the version of the tool itself, but rather the version of the package that
contains the tool.

#### Defined in

[index.ts:100](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L100)

___

### AndroidToolName

Ƭ **AndroidToolName**: keyof typeof [`versionedAndroidTools`](README.md#versionedandroidtools) \| keyof typeof [`unversionedAndroidTools`](README.md#unversionedandroidtools)

The name of an Android development tool, either unversioned or versioned.

#### Defined in

[index.ts:92](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L92)

___

### AvailablePackage

Ƭ **AvailablePackage**: `Object`

A package that can be installed by `sdkmanager`.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | A human-readable description of the package (e.g. `Android SDK Command-line Tools`). |
| `path` | `string` | The argument to be passed to `sdkmanager` to install the package with this particular version (e.g. `build-tools;33.0.2`). |
| `version` | `string` | The version of the package (e.g. `28.0.0`). Note that these are not necessarily the same as the version that is part of the `path`. |

#### Defined in

[index.ts:186](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L186)

## Variables

### unversionedAndroidTools

• `Const` **unversionedAndroidTools**: `Object`

A map of unversioned Android development tools and their corresponding package names and paths to their binary
relative to `$ANDROID_HOME`.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adb` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/adb"`` = 'platform-tools/adb' } |
| `adb.package` | ``"platform-tools"`` |
| `adb.path` | ``"platform-tools/adb"`` |
| `crashpad_handler` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/crashpad_handler"`` = 'emulator/crashpad\_handler' } |
| `crashpad_handler.package` | ``"emulator"`` |
| `crashpad_handler.path` | ``"emulator/crashpad_handler"`` |
| `dmtracedump` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/dmtracedump"`` = 'platform-tools/dmtracedump' } |
| `dmtracedump.package` | ``"platform-tools"`` |
| `dmtracedump.path` | ``"platform-tools/dmtracedump"`` |
| `e2fsck` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/bin64/e2fsck"`` = 'emulator/bin64/e2fsck' } |
| `e2fsck.package` | ``"emulator"`` |
| `e2fsck.path` | ``"emulator/bin64/e2fsck"`` |
| `emulator` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/emulator"`` = 'emulator/emulator' } |
| `emulator.package` | ``"emulator"`` |
| `emulator.path` | ``"emulator/emulator"`` |
| `emulator-check` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/emulator-check"`` = 'emulator/emulator-check' } |
| `emulator-check.package` | ``"emulator"`` |
| `emulator-check.path` | ``"emulator/emulator-check"`` |
| `etc1tool` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/etc1tool"`` = 'platform-tools/etc1tool' } |
| `etc1tool.package` | ``"platform-tools"`` |
| `etc1tool.path` | ``"platform-tools/etc1tool"`` |
| `fastboot` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/fastboot"`` = 'platform-tools/fastboot' } |
| `fastboot.package` | ``"platform-tools"`` |
| `fastboot.path` | ``"platform-tools/fastboot"`` |
| `fsck.ext4` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/bin64/fsck.ext4"`` = 'emulator/bin64/fsck.ext4' } |
| `fsck.ext4.package` | ``"emulator"`` |
| `fsck.ext4.path` | ``"emulator/bin64/fsck.ext4"`` |
| `goldfish-webrtc-bridge` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/goldfish-webrtc-bridge"`` = 'emulator/goldfish-webrtc-bridge' } |
| `goldfish-webrtc-bridge.package` | ``"emulator"`` |
| `goldfish-webrtc-bridge.path` | ``"emulator/goldfish-webrtc-bridge"`` |
| `hprof-conv` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/hprof-conv"`` = 'platform-tools/hprof-conv' } |
| `hprof-conv.package` | ``"platform-tools"`` |
| `hprof-conv.path` | ``"platform-tools/hprof-conv"`` |
| `make_f2fs` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/make_f2fs"`` = 'platform-tools/make\_f2fs' } |
| `make_f2fs.package` | ``"platform-tools"`` |
| `make_f2fs.path` | ``"platform-tools/make_f2fs"`` |
| `make_f2fs_casefold` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/make_f2fs_casefold"`` = 'platform-tools/make\_f2fs\_casefold' } |
| `make_f2fs_casefold.package` | ``"platform-tools"`` |
| `make_f2fs_casefold.path` | ``"platform-tools/make_f2fs_casefold"`` |
| `mke2fs` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/mke2fs"`` = 'platform-tools/mke2fs' } |
| `mke2fs.package` | ``"platform-tools"`` |
| `mke2fs.path` | ``"platform-tools/mke2fs"`` |
| `mkfs.ext4` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/bin64/mkfs.ext4"`` = 'emulator/bin64/mkfs.ext4' } |
| `mkfs.ext4.package` | ``"emulator"`` |
| `mkfs.ext4.path` | ``"emulator/bin64/mkfs.ext4"`` |
| `mksdcard` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/mksdcard"`` = 'emulator/mksdcard' } |
| `mksdcard.package` | ``"emulator"`` |
| `mksdcard.path` | ``"emulator/mksdcard"`` |
| `nimble_bridge` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/nimble_bridge"`` = 'emulator/nimble\_bridge' } |
| `nimble_bridge.package` | ``"emulator"`` |
| `nimble_bridge.path` | ``"emulator/nimble_bridge"`` |
| `qemu-img` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qemu-img"`` = 'emulator/qemu-img' } |
| `qemu-img.package` | ``"emulator"`` |
| `qemu-img.path` | ``"emulator/qemu-img"`` |
| `qemu-system-aarch64` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qemu/linux-x86_64/qemu-system-aarch64"`` = 'emulator/qemu/linux-x86\_64/qemu-system-aarch64' } |
| `qemu-system-aarch64.package` | ``"emulator"`` |
| `qemu-system-aarch64.path` | ``"emulator/qemu/linux-x86_64/qemu-system-aarch64"`` |
| `qemu-system-aarch64-headless` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qemu/linux-x86_64/qemu-system-aarch64-headless"`` = 'emulator/qemu/linux-x86\_64/qemu-system-aarch64-headless' } |
| `qemu-system-aarch64-headless.package` | ``"emulator"`` |
| `qemu-system-aarch64-headless.path` | ``"emulator/qemu/linux-x86_64/qemu-system-aarch64-headless"`` |
| `qemu-system-armel` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qemu/linux-x86_64/qemu-system-armel"`` = 'emulator/qemu/linux-x86\_64/qemu-system-armel' } |
| `qemu-system-armel.package` | ``"emulator"`` |
| `qemu-system-armel.path` | ``"emulator/qemu/linux-x86_64/qemu-system-armel"`` |
| `qemu-system-armel-headless` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qemu/linux-x86_64/qemu-system-armel-headless"`` = 'emulator/qemu/linux-x86\_64/qemu-system-armel-headless' } |
| `qemu-system-armel-headless.package` | ``"emulator"`` |
| `qemu-system-armel-headless.path` | ``"emulator/qemu/linux-x86_64/qemu-system-armel-headless"`` |
| `qemu-system-i386` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qemu/linux-x86_64/qemu-system-i386"`` = 'emulator/qemu/linux-x86\_64/qemu-system-i386' } |
| `qemu-system-i386.package` | ``"emulator"`` |
| `qemu-system-i386.path` | ``"emulator/qemu/linux-x86_64/qemu-system-i386"`` |
| `qemu-system-i386-headless` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qemu/linux-x86_64/qemu-system-i386-headless"`` = 'emulator/qemu/linux-x86\_64/qemu-system-i386-headless' } |
| `qemu-system-i386-headless.package` | ``"emulator"`` |
| `qemu-system-i386-headless.path` | ``"emulator/qemu/linux-x86_64/qemu-system-i386-headless"`` |
| `qemu-system-x86_64` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qemu/linux-x86_64/qemu-system-x86_64"`` = 'emulator/qemu/linux-x86\_64/qemu-system-x86\_64' } |
| `qemu-system-x86_64.package` | ``"emulator"`` |
| `qemu-system-x86_64.path` | ``"emulator/qemu/linux-x86_64/qemu-system-x86_64"`` |
| `qemu-system-x86_64-headless` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qemu/linux-x86_64/qemu-system-x86_64-headless"`` = 'emulator/qemu/linux-x86\_64/qemu-system-x86\_64-headless' } |
| `qemu-system-x86_64-headless.package` | ``"emulator"`` |
| `qemu-system-x86_64-headless.path` | ``"emulator/qemu/linux-x86_64/qemu-system-x86_64-headless"`` |
| `qsn` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qsn"`` = 'emulator/qsn' } |
| `qsn.package` | ``"emulator"`` |
| `qsn.path` | ``"emulator/qsn"`` |
| `resize2fs` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/bin64/resize2fs"`` = 'emulator/bin64/resize2fs' } |
| `resize2fs.package` | ``"emulator"`` |
| `resize2fs.path` | ``"emulator/bin64/resize2fs"`` |
| `sqlite3` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/sqlite3"`` = 'platform-tools/sqlite3' } |
| `sqlite3.package` | ``"platform-tools"`` |
| `sqlite3.path` | ``"platform-tools/sqlite3"`` |
| `tune2fs` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/bin64/tune2fs"`` = 'emulator/bin64/tune2fs' } |
| `tune2fs.package` | ``"emulator"`` |
| `tune2fs.path` | ``"emulator/bin64/tune2fs"`` |

#### Defined in

[index.ts:17](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L17)

___

### versionedAndroidTools

• `Const` **versionedAndroidTools**: `Object`

A map of versioned Android development tools and their corresponding package names and paths to their binary relative
to `$ANDROID_HOME`.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `aapt` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string`  } |
| `aapt.package` | ``"build-tools"`` |
| `aapt.path` | (`v`: `string`) => `string` |
| `aapt2` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string`  } |
| `aapt2.package` | ``"build-tools"`` |
| `aapt2.path` | (`v`: `string`) => `string` |
| `aidl` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string`  } |
| `aidl.package` | ``"build-tools"`` |
| `aidl.path` | (`v`: `string`) => `string` |
| `apkanalyzer` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string`  } |
| `apkanalyzer.package` | ``"cmdline-tools"`` |
| `apkanalyzer.path` | (`v`: `string`) => `string` |
| `apksigner` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string`  } |
| `apksigner.package` | ``"build-tools"`` |
| `apksigner.path` | (`v`: `string`) => `string` |
| `avdmanager` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string`  } |
| `avdmanager.package` | ``"cmdline-tools"`` |
| `avdmanager.path` | (`v`: `string`) => `string` |
| `bcc_compat` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string`  } |
| `bcc_compat.package` | ``"build-tools"`` |
| `bcc_compat.path` | (`v`: `string`) => `string` |
| `cmake` | { `package`: ``"cmake"`` = 'cmake'; `path`: (`v`: `string`) => `string`  } |
| `cmake.package` | ``"cmake"`` |
| `cmake.path` | (`v`: `string`) => `string` |
| `cpack` | { `package`: ``"cmake"`` = 'cmake'; `path`: (`v`: `string`) => `string`  } |
| `cpack.package` | ``"cmake"`` |
| `cpack.path` | (`v`: `string`) => `string` |
| `ctest` | { `package`: ``"cmake"`` = 'cmake'; `path`: (`v`: `string`) => `string`  } |
| `ctest.package` | ``"cmake"`` |
| `ctest.path` | (`v`: `string`) => `string` |
| `d8` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string`  } |
| `d8.package` | ``"build-tools"`` |
| `d8.path` | (`v`: `string`) => `string` |
| `dexdump` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string`  } |
| `dexdump.package` | ``"build-tools"`` |
| `dexdump.path` | (`v`: `string`) => `string` |
| `lint` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string`  } |
| `lint.package` | ``"cmdline-tools"`` |
| `lint.path` | (`v`: `string`) => `string` |
| `lld` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string`  } |
| `lld.package` | ``"build-tools"`` |
| `lld.path` | (`v`: `string`) => `string` |
| `llvm-rs-cc` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string`  } |
| `llvm-rs-cc.package` | ``"build-tools"`` |
| `llvm-rs-cc.path` | (`v`: `string`) => `string` |
| `ninja` | { `package`: ``"cmake"`` = 'cmake'; `path`: (`v`: `string`) => `string`  } |
| `ninja.package` | ``"cmake"`` |
| `ninja.path` | (`v`: `string`) => `string` |
| `profgen` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string`  } |
| `profgen.package` | ``"cmdline-tools"`` |
| `profgen.path` | (`v`: `string`) => `string` |
| `retrace` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string`  } |
| `retrace.package` | ``"cmdline-tools"`` |
| `retrace.path` | (`v`: `string`) => `string` |
| `screenshot2` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string`  } |
| `screenshot2.package` | ``"cmdline-tools"`` |
| `screenshot2.path` | (`v`: `string`) => `string` |
| `sdkmanager` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string`  } |
| `sdkmanager.package` | ``"cmdline-tools"`` |
| `sdkmanager.path` | (`v`: `string`) => `string` |
| `split-select` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string`  } |
| `split-select.package` | ``"build-tools"`` |
| `split-select.path` | (`v`: `string`) => `string` |
| `zipalign` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string`  } |
| `zipalign.package` | ``"build-tools"`` |
| `zipalign.path` | (`v`: `string`) => `string` |

#### Defined in

[index.ts:63](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L63)

## Functions

### getAndroidDevToolPath

▸ **getAndroidDevToolPath**(`tool`, `options?`): `Promise`<`string`\>

Get the path to an Android development tool's executable. If the tool is not installed yet, it will automatically be
installed (unless you set `options.installIfNecessary` to `false`.

If no version is specified for a versioned tool, the latest installed (if the tool was already installed) or
available version (if it isn't installed yet) is used.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tool` | [`AndroidTool`](README.md#androidtool) | The tool to get the path for, either as just its name or with an explicit version. |
| `options?` | `Object` | Optional options to control the behaviour of this function, where: - `installIfNecessary`: Whether to automatically install the tool if it is not already installed. Defaults to `true`. |
| `options.installIfNecessary?` | `boolean` | - |

#### Returns

`Promise`<`string`\>

The path to the installed tool's executable.

#### Defined in

[index.ts:308](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L308)

___

### installAndroidDevTool

▸ **installAndroidDevTool**(`tool`): `Promise`<`string`\>

Install the specified Android development tool if it is not already installed.

If no version is specified for a versioned tool, the latest installed (if the tool was already installed) or
available version (if it isn't installed yet) is used.

The `$ANDROID_HOME` directory where the package is installed is automatically created and managed by andromatic.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tool` | [`AndroidTool`](README.md#androidtool) | The tool to install, either as just its name or with an explicit version. |

#### Returns

`Promise`<`string`\>

The path to the installed tool's executable.

#### Defined in

[index.ts:261](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L261)

___

### installPackages

▸ **installPackages**(`...packages`): `Promise`<`string`\>

Install one or more packages using `sdkmanager`. The specified packages are installed or updated to the latest
version (if already installed) in an automatically created `$ANDROID_HOME` managed by andromatic.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...packages` | `string`[] | The path(s) of the packages to install, as to be passed to `sdkmanager`. |

#### Returns

`Promise`<`string`\>

The path to `$ANDROID_HOME` where the packages are installed.

#### Defined in

[index.ts:234](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L234)

___

### listPackages

▸ **listPackages**(): `Promise`<[`AvailablePackage`](README.md#availablepackage)[]\>

Fetch a list of available packages that can be installed by `sdkmanager`.

#### Returns

`Promise`<[`AvailablePackage`](README.md#availablepackage)[]\>

An array of packages, each with their package path, version and description.

#### Defined in

[index.ts:205](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L205)

___

### runAndroidDevTool

▸ **runAndroidDevTool**(`tool`, `args?`, `execaOptions?`): `Promise`<`ExecaReturnValue`<`string`\>\>

Run an Android development tool. If the tool is not installed yet, it will automatically be installed. The tool is
executed using [`execa`](https://github.com/sindresorhus/execa).

If no version is specified for a versioned tool, the latest installed (if the tool was already installed) or
available version (if it isn't installed yet) is used.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tool` | [`AndroidTool`](README.md#androidtool) | The tool to run, either as just its name or with an explicit version. |
| `args?` | `string`[] | The arguments to pass to the command. |
| `execaOptions?` | `Options` | The options to pass to execa, see: https://github.com/sindresorhus/execa#options-1. |

#### Returns

`Promise`<`ExecaReturnValue`<`string`\>\>

The result from execa, see: https://github.com/sindresorhus/execa#childprocess.

#### Defined in

[index.ts:369](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L369)

___

### updatePackages

▸ **updatePackages**(): `Promise`<`void`\>

Update all installed packages to the latest version using `sdkmanager`.

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:243](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L243)
