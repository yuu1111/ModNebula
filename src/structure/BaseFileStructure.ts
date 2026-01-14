import { join, resolve } from 'node:path'
import { mkdirs } from 'fs-extra/esm'
import type { Logger } from 'winston'
import { LoggerUtil } from '../util/LoggerUtil.js'
import type { FileStructure } from './FileStructure.js'

export abstract class BaseFileStructure implements FileStructure {
    protected logger: Logger
    protected containerDirectory: string

    constructor(
        protected absoluteRoot: string,
        protected relativeRoot: string,
        protected structRoot: string
    ) {
        this.relativeRoot = join(relativeRoot, structRoot)
        this.containerDirectory = resolve(absoluteRoot, structRoot)
        this.logger = LoggerUtil.getLogger(this.getLoggerName())
    }

    public async init(): Promise<void> {
        await mkdirs(this.containerDirectory)
    }

    public getContainerDirectory(): string {
        return this.containerDirectory
    }

    public abstract getLoggerName(): string
}
