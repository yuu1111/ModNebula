import { join } from 'node:path'
import { URL } from 'node:url'
import type { MinecraftVersion } from '../../util/MinecraftVersion.js'
import { BaseFileStructure } from '../BaseFileStructure.js'

export class VersionRepoStructure extends BaseFileStructure {
    private name: string

    constructor(absoluteRoot: string, relativeRoot: string, name: string) {
        super(absoluteRoot, relativeRoot, 'versions')
        this.name = name
    }

    public getLoggerName(): string {
        return 'VersionRepoStructure'
    }

    public getFileName(minecraftVersion: MinecraftVersion, loaderVersion: string): string {
        return `${minecraftVersion}-${this.name}-${loaderVersion}`
    }

    public getVersionManifest(minecraftVersion: MinecraftVersion, loaderVersion: string): string {
        const fileName = this.getFileName(minecraftVersion, loaderVersion)
        return join(this.containerDirectory, fileName, `${fileName}.json`)
    }

    public getVersionManifestURL(url: string, minecraftVersion: MinecraftVersion, loaderVersion: string): string {
        const fileName = this.getFileName(minecraftVersion, loaderVersion)
        return new URL(join(this.relativeRoot, fileName, `${fileName}.json`), url).toString()
    }
}
