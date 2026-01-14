import type { Stats } from 'node:fs'
import { join } from 'node:path'
import { URL } from 'node:url'
import { Type, TypeMetadata } from 'helios-distribution-types'
import type { UntrackedFilesOption } from '../../../model/nebula/ServerMeta.js'
import type { MinecraftVersion } from '../../../util/MinecraftVersion.js'
import { ModuleStructure } from './Module.struct.js'

export class LibraryStructure extends ModuleStructure {
    constructor(
        absoluteRoot: string,
        relativeRoot: string,
        baseUrl: string,
        minecraftVersion: MinecraftVersion,
        untrackedFiles: UntrackedFilesOption[]
    ) {
        super(
            absoluteRoot,
            relativeRoot,
            'libraries',
            baseUrl,
            minecraftVersion,
            Type.Library,
            untrackedFiles,
            (name: string) => {
                return name.toLowerCase().endsWith(TypeMetadata[this.type].defaultExtension!)
            }
        )
    }

    public getLoggerName(): string {
        return 'LibraryStructure'
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async getModuleId(name: string, _path: string): Promise<string> {
        const inference = this.attemptCrudeInference(name)
        return this.generateMavenIdentifier(this.getDefaultGroup(), inference.name, inference.version)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async getModuleName(name: string, _path: string): Promise<string> {
        const inference = this.attemptCrudeInference(name)
        return inference.name
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async getModuleUrl(name: string, _path: string, _stats: Stats): Promise<string> {
        return new URL(join(this.relativeRoot, name), this.baseUrl).toString()
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async getModulePath(_name: string, _path: string, _stats: Stats): Promise<string | null> {
        return null
    }
}
