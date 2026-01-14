import { createHash } from 'node:crypto'
import type { Stats } from 'node:fs'
import type { Artifact, Module } from 'helios-distribution-types'
import type { MinecraftVersion } from '../util/MinecraftVersion.js'
import type { VersionSegmented } from '../util/VersionSegmented.js'
import type { Resolver } from './Resolver.js'

export abstract class BaseResolver implements Resolver, VersionSegmented {
    constructor(
        protected absoluteRoot: string,
        protected relativeRoot: string,
        protected baseUrl: string
    ) {}

    public abstract getModule(): Promise<Module>
    public abstract isForVersion(version: MinecraftVersion, libraryVersion: string): boolean

    protected generateArtifact(buf: Buffer, stats: Stats, url: string): Artifact {
        return {
            size: stats.size,
            MD5: createHash('md5').update(buf).digest('hex'),
            url,
        }
    }
}
