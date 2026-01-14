import { Type } from 'helios-distribution-types'
import { LibraryType } from '../../../model/claritas/ClaritasLibraryType.js'
import type { UntrackedFilesOption } from '../../../model/nebula/ServerMeta.js'
import type { MinecraftVersion } from '../../../util/MinecraftVersion.js'
import type { VersionSegmented } from '../../../util/VersionSegmented.js'
import { BaseModStructure } from './Mod.struct.js'
import type { ClaritasException } from './Module.struct.js'

export abstract class BaseForgeModStructure<T> extends BaseModStructure<T> implements VersionSegmented {
    protected readonly EXAMPLE_MOD_ID = 'examplemod'

    constructor(
        absoluteRoot: string,
        relativeRoot: string,
        baseUrl: string,
        minecraftVersion: MinecraftVersion,
        untrackedFiles: UntrackedFilesOption[]
    ) {
        super(absoluteRoot, relativeRoot, 'forgemods', baseUrl, minecraftVersion, Type.ForgeMod, untrackedFiles)
    }

    public abstract isForVersion(version: MinecraftVersion, libraryVersion: string): boolean

    protected getClaritasExceptions(): ClaritasException[] {
        return [
            {
                exceptionName: 'optifine',
                proxyMetadata: {
                    group: 'net.optifine',
                },
            },
        ]
    }

    protected getClaritasType(): LibraryType {
        return LibraryType.FORGE
    }

    protected discernResult(claritasValue: string | undefined, crudeInference: string): string {
        return claritasValue == null || claritasValue === '' ? crudeInference : claritasValue
    }
}
