/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Stats } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import { join, resolve, sep } from 'node:path'
import { URL } from 'node:url'
import { type Module, Type } from 'helios-distribution-types'
import type { UntrackedFilesOption } from '../../../model/nebula/ServerMeta.js'
import type { MinecraftVersion } from '../../../util/MinecraftVersion.js'
import { ModuleStructure } from './Module.struct.js'

export class MiscFileStructure extends ModuleStructure {
    constructor(
        absoluteRoot: string,
        relativeRoot: string,
        baseUrl: string,
        minecraftVersion: MinecraftVersion,
        untrackedFiles: UntrackedFilesOption[]
    ) {
        super(absoluteRoot, relativeRoot, 'files', baseUrl, minecraftVersion, Type.File, untrackedFiles)
    }

    public getLoggerName(): string {
        return 'MiscFileStructure'
    }

    public async getSpecModel(): Promise<Module[]> {
        if (this.resolvedModels == null) {
            this.resolvedModels = await this.recursiveModuleScan(this.containerDirectory)
        }

        return this.resolvedModels
    }

    protected async recursiveModuleScan(dir: string): Promise<Module[]> {
        let acc: Module[] = []
        const subdirs = await readdir(dir).catch(() => [])
        for (const file of subdirs) {
            const filePath = resolve(dir, file)
            const stats = await stat(filePath)
            if (stats.isDirectory()) {
                acc = acc.concat(await this.recursiveModuleScan(filePath))
            } else {
                if (!this.FILE_NAME_BLACKLIST.includes(file)) {
                    acc.push(await this.parseModule(file, filePath, stats))
                }
            }
        }
        return acc
    }

    protected async getModuleId(name: string, _path: string): Promise<string> {
        return name
    }
    protected async getModuleName(name: string, _path: string): Promise<string> {
        return name
    }
    protected async getModuleUrl(_name: string, path: string, _stats: Stats): Promise<string> {
        return new URL(
            join(
                this.relativeRoot,
                ...path
                    .substr(this.containerDirectory.length + 1)
                    .split(sep)
                    .map((s) => encodeURIComponent(s))
            ),
            this.baseUrl
        ).toString()
    }
    protected async getModulePath(_name: string, path: string, _stats: Stats): Promise<string | null> {
        return path.substr(this.containerDirectory.length + 1).replace(/\\/g, '/')
    }
}
