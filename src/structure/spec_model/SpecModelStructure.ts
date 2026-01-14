import type { FileStructure } from '../FileStructure.js'

export interface SpecModelStructure<T> extends FileStructure {
    getSpecModel(): Promise<T>
}
