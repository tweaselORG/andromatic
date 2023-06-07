andromatic

# andromatic

## Table of contents

### Type Aliases

- [AndroidTool](README.md#androidtool)
- [AndroidToolName](README.md#androidtoolname)
- [AvailablePackage](README.md#availablepackage)
- [EmulatorOptions](README.md#emulatoroptions)

### Variables

- [unversionedAndroidTools](README.md#unversionedandroidtools)
- [versionedAndroidTools](README.md#versionedandroidtools)

### Functions

- [createEmulator](README.md#createemulator)
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

[index.ts:112](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L112)

___

### AndroidToolName

Ƭ **AndroidToolName**: keyof typeof [`versionedAndroidTools`](README.md#versionedandroidtools) \| keyof typeof [`unversionedAndroidTools`](README.md#unversionedandroidtools)

The name of an Android development tool, either unversioned or versioned.

#### Defined in

[index.ts:104](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L104)

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

[index.ts:214](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L214)

___

### EmulatorOptions

Ƭ **EmulatorOptions**: `MergeExclusive`<{ `package`: `string`  }, { `apiLevel`: `number` ; `architecture`: ``"x86"`` \| ``"x86_64"`` \| ``"armeabi-v7a"`` \| ``"arm64-v8a"`` ; `variant`: ``"default"`` \| ``"google_apis"`` \| ``"google_apis_playstore"`` \| ``"aosp_atd"`` \| ``"google_atd"`` \| ``"android-tv"`` \| ``"google-tv"`` \| ``"android-wear"`` \| ``"android-wear-cn"``  }\> & { `device?`: `string` ; `force?`: `boolean` ; `partitionSize?`: `number`  }

The options for creating an emulator using the [createEmulator](README.md#createemulator) function.

For choosing the system image you can either:

- Specify only `package`, or…
- Specify `apiLevel`, `variant`, and `architecture` but not `package`. Note that not all combinations of these
  properties actually have a system image available.

#### Defined in

[emulator.ts:14](https://github.com/tweaselORG/andromatic/blob/main/src/emulator.ts#L14)

## Variables

### unversionedAndroidTools

• `Const` **unversionedAndroidTools**: `Object`

A map of unversioned Android development tools and their corresponding package names and paths to their binary
relative to `$ANDROID_HOME`.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adb` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/adb"`` = 'platform-tools/adb'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `adb.package` | ``"platform-tools"`` |
| `adb.path` | ``"platform-tools/adb"`` |
| `adb.windowsExtension` | ``"exe"`` |
| `crashpad_handler` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/crashpad_handler"`` = 'emulator/crashpad\_handler'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `crashpad_handler.package` | ``"emulator"`` |
| `crashpad_handler.path` | ``"emulator/crashpad_handler"`` |
| `crashpad_handler.windowsExtension` | ``"exe"`` |
| `dmtracedump` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/dmtracedump"`` = 'platform-tools/dmtracedump'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `dmtracedump.package` | ``"platform-tools"`` |
| `dmtracedump.path` | ``"platform-tools/dmtracedump"`` |
| `dmtracedump.windowsExtension` | ``"exe"`` |
| `e2fsck` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/bin64/e2fsck"`` = 'emulator/bin64/e2fsck'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `e2fsck.package` | ``"emulator"`` |
| `e2fsck.path` | ``"emulator/bin64/e2fsck"`` |
| `e2fsck.windowsExtension` | ``"exe"`` |
| `emulator` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/emulator"`` = 'emulator/emulator'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `emulator.package` | ``"emulator"`` |
| `emulator.path` | ``"emulator/emulator"`` |
| `emulator.windowsExtension` | ``"exe"`` |
| `emulator-check` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/emulator-check"`` = 'emulator/emulator-check'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `emulator-check.package` | ``"emulator"`` |
| `emulator-check.path` | ``"emulator/emulator-check"`` |
| `emulator-check.windowsExtension` | ``"exe"`` |
| `etc1tool` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/etc1tool"`` = 'platform-tools/etc1tool'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `etc1tool.package` | ``"platform-tools"`` |
| `etc1tool.path` | ``"platform-tools/etc1tool"`` |
| `etc1tool.windowsExtension` | ``"exe"`` |
| `fastboot` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/fastboot"`` = 'platform-tools/fastboot'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `fastboot.package` | ``"platform-tools"`` |
| `fastboot.path` | ``"platform-tools/fastboot"`` |
| `fastboot.windowsExtension` | ``"exe"`` |
| `fsck.ext4` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/bin64/fsck.ext4"`` = 'emulator/bin64/fsck.ext4' } |
| `fsck.ext4.package` | ``"emulator"`` |
| `fsck.ext4.path` | ``"emulator/bin64/fsck.ext4"`` |
| `goldfish-webrtc-bridge` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/goldfish-webrtc-bridge"`` = 'emulator/goldfish-webrtc-bridge' } |
| `goldfish-webrtc-bridge.package` | ``"emulator"`` |
| `goldfish-webrtc-bridge.path` | ``"emulator/goldfish-webrtc-bridge"`` |
| `hprof-conv` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/hprof-conv"`` = 'platform-tools/hprof-conv'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `hprof-conv.package` | ``"platform-tools"`` |
| `hprof-conv.path` | ``"platform-tools/hprof-conv"`` |
| `hprof-conv.windowsExtension` | ``"exe"`` |
| `make_f2fs` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/make_f2fs"`` = 'platform-tools/make\_f2fs'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `make_f2fs.package` | ``"platform-tools"`` |
| `make_f2fs.path` | ``"platform-tools/make_f2fs"`` |
| `make_f2fs.windowsExtension` | ``"exe"`` |
| `make_f2fs_casefold` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/make_f2fs_casefold"`` = 'platform-tools/make\_f2fs\_casefold'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `make_f2fs_casefold.package` | ``"platform-tools"`` |
| `make_f2fs_casefold.path` | ``"platform-tools/make_f2fs_casefold"`` |
| `make_f2fs_casefold.windowsExtension` | ``"exe"`` |
| `mke2fs` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/mke2fs"`` = 'platform-tools/mke2fs'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `mke2fs.package` | ``"platform-tools"`` |
| `mke2fs.path` | ``"platform-tools/mke2fs"`` |
| `mke2fs.windowsExtension` | ``"exe"`` |
| `mkfs.ext4` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/bin64/mkfs.ext4"`` = 'emulator/bin64/mkfs.ext4' } |
| `mkfs.ext4.package` | ``"emulator"`` |
| `mkfs.ext4.path` | ``"emulator/bin64/mkfs.ext4"`` |
| `mksdcard` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/mksdcard"`` = 'emulator/mksdcard'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `mksdcard.package` | ``"emulator"`` |
| `mksdcard.path` | ``"emulator/mksdcard"`` |
| `mksdcard.windowsExtension` | ``"exe"`` |
| `nimble_bridge` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/nimble_bridge"`` = 'emulator/nimble\_bridge'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `nimble_bridge.package` | ``"emulator"`` |
| `nimble_bridge.path` | ``"emulator/nimble_bridge"`` |
| `nimble_bridge.windowsExtension` | ``"exe"`` |
| `qemu-img` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qemu-img"`` = 'emulator/qemu-img'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `qemu-img.package` | ``"emulator"`` |
| `qemu-img.path` | ``"emulator/qemu-img"`` |
| `qemu-img.windowsExtension` | ``"exe"`` |
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
| `qsn` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/qsn"`` = 'emulator/qsn'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `qsn.package` | ``"emulator"`` |
| `qsn.path` | ``"emulator/qsn"`` |
| `qsn.windowsExtension` | ``"exe"`` |
| `resize2fs` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/bin64/resize2fs"`` = 'emulator/bin64/resize2fs'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `resize2fs.package` | ``"emulator"`` |
| `resize2fs.path` | ``"emulator/bin64/resize2fs"`` |
| `resize2fs.windowsExtension` | ``"exe"`` |
| `sqlite3` | { `package`: ``"platform-tools"`` = 'platform-tools'; `path`: ``"platform-tools/sqlite3"`` = 'platform-tools/sqlite3'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `sqlite3.package` | ``"platform-tools"`` |
| `sqlite3.path` | ``"platform-tools/sqlite3"`` |
| `sqlite3.windowsExtension` | ``"exe"`` |
| `tune2fs` | { `package`: ``"emulator"`` = 'emulator'; `path`: ``"emulator/bin64/tune2fs"`` = 'emulator/bin64/tune2fs'; `windowsExtension`: ``"exe"`` = 'exe' } |
| `tune2fs.package` | ``"emulator"`` |
| `tune2fs.path` | ``"emulator/bin64/tune2fs"`` |
| `tune2fs.windowsExtension` | ``"exe"`` |

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
| `aapt` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `aapt.package` | ``"build-tools"`` |
| `aapt.path` | (`v`: `string`) => `string` |
| `aapt.windowsExtension` | ``"exe"`` |
| `aapt2` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `aapt2.package` | ``"build-tools"`` |
| `aapt2.path` | (`v`: `string`) => `string` |
| `aapt2.windowsExtension` | ``"exe"`` |
| `aidl` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `aidl.package` | ``"build-tools"`` |
| `aidl.path` | (`v`: `string`) => `string` |
| `aidl.windowsExtension` | ``"exe"`` |
| `apkanalyzer` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"bat"`` = 'bat' } |
| `apkanalyzer.package` | ``"cmdline-tools"`` |
| `apkanalyzer.path` | (`v`: `string`) => `string` |
| `apkanalyzer.windowsExtension` | ``"bat"`` |
| `apksigner` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"bat"`` = 'bat' } |
| `apksigner.package` | ``"build-tools"`` |
| `apksigner.path` | (`v`: `string`) => `string` |
| `apksigner.windowsExtension` | ``"bat"`` |
| `avdmanager` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"bat"`` = 'bat' } |
| `avdmanager.package` | ``"cmdline-tools"`` |
| `avdmanager.path` | (`v`: `string`) => `string` |
| `avdmanager.windowsExtension` | ``"bat"`` |
| `bcc_compat` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `bcc_compat.package` | ``"build-tools"`` |
| `bcc_compat.path` | (`v`: `string`) => `string` |
| `bcc_compat.windowsExtension` | ``"exe"`` |
| `cmake` | { `package`: ``"cmake"`` = 'cmake'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `cmake.package` | ``"cmake"`` |
| `cmake.path` | (`v`: `string`) => `string` |
| `cmake.windowsExtension` | ``"exe"`` |
| `cpack` | { `package`: ``"cmake"`` = 'cmake'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `cpack.package` | ``"cmake"`` |
| `cpack.path` | (`v`: `string`) => `string` |
| `cpack.windowsExtension` | ``"exe"`` |
| `ctest` | { `package`: ``"cmake"`` = 'cmake'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `ctest.package` | ``"cmake"`` |
| `ctest.path` | (`v`: `string`) => `string` |
| `ctest.windowsExtension` | ``"exe"`` |
| `d8` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"bat"`` = 'bat' } |
| `d8.package` | ``"build-tools"`` |
| `d8.path` | (`v`: `string`) => `string` |
| `d8.windowsExtension` | ``"bat"`` |
| `dexdump` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `dexdump.package` | ``"build-tools"`` |
| `dexdump.path` | (`v`: `string`) => `string` |
| `dexdump.windowsExtension` | ``"exe"`` |
| `lint` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"bat"`` = 'bat' } |
| `lint.package` | ``"cmdline-tools"`` |
| `lint.path` | (`v`: `string`) => `string` |
| `lint.windowsExtension` | ``"bat"`` |
| `lld` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `lld.package` | ``"build-tools"`` |
| `lld.path` | (`v`: `string`) => `string` |
| `lld.windowsExtension` | ``"exe"`` |
| `llvm-rs-cc` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `llvm-rs-cc.package` | ``"build-tools"`` |
| `llvm-rs-cc.path` | (`v`: `string`) => `string` |
| `llvm-rs-cc.windowsExtension` | ``"exe"`` |
| `ninja` | { `package`: ``"cmake"`` = 'cmake'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `ninja.package` | ``"cmake"`` |
| `ninja.path` | (`v`: `string`) => `string` |
| `ninja.windowsExtension` | ``"exe"`` |
| `profgen` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"bat"`` = 'bat' } |
| `profgen.package` | ``"cmdline-tools"`` |
| `profgen.path` | (`v`: `string`) => `string` |
| `profgen.windowsExtension` | ``"bat"`` |
| `retrace` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"bat"`` = 'bat' } |
| `retrace.package` | ``"cmdline-tools"`` |
| `retrace.path` | (`v`: `string`) => `string` |
| `retrace.windowsExtension` | ``"bat"`` |
| `screenshot2` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"bat"`` = 'bat' } |
| `screenshot2.package` | ``"cmdline-tools"`` |
| `screenshot2.path` | (`v`: `string`) => `string` |
| `screenshot2.windowsExtension` | ``"bat"`` |
| `sdkmanager` | { `package`: ``"cmdline-tools"`` = 'cmdline-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"bat"`` = 'bat' } |
| `sdkmanager.package` | ``"cmdline-tools"`` |
| `sdkmanager.path` | (`v`: `string`) => `string` |
| `sdkmanager.windowsExtension` | ``"bat"`` |
| `split-select` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `split-select.package` | ``"build-tools"`` |
| `split-select.path` | (`v`: `string`) => `string` |
| `split-select.windowsExtension` | ``"exe"`` |
| `zipalign` | { `package`: ``"build-tools"`` = 'build-tools'; `path`: (`v`: `string`) => `string` ; `windowsExtension`: ``"exe"`` = 'exe' } |
| `zipalign.package` | ``"build-tools"`` |
| `zipalign.path` | (`v`: `string`) => `string` |
| `zipalign.windowsExtension` | ``"exe"`` |

#### Defined in

[index.ts:67](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L67)

## Functions

### createEmulator

▸ **createEmulator**(`name`, `options`): `Promise`<`void`\>

Creates an emulator with the given name and options. It will install the required system image if it is not already
installed, and create the emulator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the emulator to create. |
| `options` | [`EmulatorOptions`](README.md#emulatoroptions) | The options for creating the emulator. See [EmulatorOptions](README.md#emulatoroptions). |

#### Returns

`Promise`<`void`\>

#### Defined in

[emulator.ts:83](https://github.com/tweaselORG/andromatic/blob/main/src/emulator.ts#L83)

___

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

[index.ts:336](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L336)

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

[index.ts:289](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L289)

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

[index.ts:262](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L262)

___

### listPackages

▸ **listPackages**(): `Promise`<[`AvailablePackage`](README.md#availablepackage)[]\>

Fetch a list of available packages that can be installed by `sdkmanager`.

#### Returns

`Promise`<[`AvailablePackage`](README.md#availablepackage)[]\>

An array of packages, each with their package path, version and description.

#### Defined in

[index.ts:233](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L233)

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

[index.ts:405](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L405)

___

### updatePackages

▸ **updatePackages**(): `Promise`<`void`\>

Update all installed packages to the latest version using `sdkmanager`.

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:271](https://github.com/tweaselORG/andromatic/blob/main/src/index.ts#L271)
