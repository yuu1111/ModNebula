import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { mkdirs, pathExists, remove } from 'fs-extra/esm'
import type { LibraryType } from '../../model/claritas/ClaritasLibraryType.js'
import type { ClaritasResult } from '../../model/claritas/ClaritasResult.js'
import type { MinecraftVersion } from '../MinecraftVersion.js'
import { JarExecutor } from './JarExecutor.js'

export class ClaritasWrapper extends JarExecutor<ClaritasResult> {
    private readonly WORK_DIR: string
    private readonly ARG_FILE: string
    private readonly OUTPUT_FILE: string

    constructor(cwd: string) {
        super('Claritas')

        this.WORK_DIR = resolve(cwd, 'claritasWork')
        this.ARG_FILE = resolve(this.WORK_DIR, 'claritasArgFile.txt')
        this.OUTPUT_FILE = resolve(this.WORK_DIR, 'claritasOutput.json')

        this.onCloseListeners.push(async (code) => {
            if (code !== 0) {
                this.logger.error('Claritas finished with non-zero exit code, ', code)
                this.lastExecutionResult = undefined!
            } else {
                if (await pathExists(this.OUTPUT_FILE)) {
                    this.lastExecutionResult = JSON.parse(
                        (await readFile(this.OUTPUT_FILE)).toString('utf8')
                    ) as ClaritasResult
                } else {
                    this.logger.error('Claritas output file not found when exit code is 0, is this a bug?')
                    this.lastExecutionResult = undefined!
                }
            }
            await this.cleanOutput()
        })
    }

    protected getJarPath(): string {
        const isExecutable = process.execPath.endsWith('.exe') && !process.execPath.includes('bun')
        const baseDir = isExecutable ? dirname(process.execPath) : process.cwd()
        return join(baseDir, 'libraries', 'java', 'Claritas.jar')
    }

    private async writeArgFile(...programArgs: string[]): Promise<void> {
        await mkdirs(this.WORK_DIR)
        await writeFile(this.ARG_FILE, programArgs.join('\n'))
    }

    public async execute(
        libraryType: LibraryType,
        mcVersion: MinecraftVersion,
        absoluteJarPaths: string[]
    ): Promise<ClaritasResult> {
        await this.writeArgFile(
            '--absoluteJarPaths',
            absoluteJarPaths.join(','),
            '--libraryType',
            libraryType,
            '--mcVersion',
            mcVersion.toString(),
            '--outputFile',
            this.OUTPUT_FILE,
            '--previewOutput',
            'true'
        )
        return await super.executeJar([`-Dclaritas.argFile=${this.ARG_FILE}`])
    }

    private async cleanOutput(): Promise<void> {
        if (await pathExists(this.WORK_DIR)) {
            await remove(this.WORK_DIR)
        }
    }
}
