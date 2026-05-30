"use strict";
(self["webpackChunkfausteditorweb"] = self["webpackChunkfausteditorweb"] || []).push([[8381],{

/***/ 48381
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  IndexedDB: () => (/* reexport */ IndexedDB),
  IndexedDBStore: () => (/* reexport */ IndexedDBStore),
  IndexedDBTransaction: () => (/* reexport */ IndexedDBTransaction),
  WebAccess: () => (/* reexport */ WebAccess),
  WebAccessFS: () => (/* reexport */ WebAccessFS),
  WebStorage: () => (/* reexport */ WebStorage),
  WebStorageStore: () => (/* reexport */ WebStorageStore)
});

// EXTERNAL MODULE: ./node_modules/@zenfs/core/dist/index.js + 48 modules
var dist = __webpack_require__(99220);
// EXTERNAL MODULE: ./node_modules/@zenfs/core/dist/emulation/constants.js
var constants = __webpack_require__(75087);
// EXTERNAL MODULE: ./node_modules/@zenfs/core/dist/emulation/path.js
var emulation_path = __webpack_require__(78487);
;// ./node_modules/@zenfs/dom/dist/utils.js

/**
 * Converts a DOMException into an Errno
 * @see https://developer.mozilla.org/Web/API/DOMException
 */
function errnoForDOMException(ex) {
    switch (ex.name) {
        case 'IndexSizeError':
        case 'HierarchyRequestError':
        case 'InvalidCharacterError':
        case 'InvalidStateError':
        case 'SyntaxError':
        case 'NamespaceError':
        case 'TypeMismatchError':
        case 'ConstraintError':
        case 'VersionError':
        case 'URLMismatchError':
        case 'InvalidNodeTypeError':
            return 'EINVAL';
        case 'WrongDocumentError':
            return 'EXDEV';
        case 'NoModificationAllowedError':
        case 'InvalidModificationError':
        case 'InvalidAccessError':
        case 'SecurityError':
        case 'NotAllowedError':
            return 'EACCES';
        case 'NotFoundError':
            return 'ENOENT';
        case 'NotSupportedError':
            return 'ENOTSUP';
        case 'InUseAttributeError':
            return 'EBUSY';
        case 'NetworkError':
            return 'ENETDOWN';
        case 'AbortError':
            return 'EINTR';
        case 'QuotaExceededError':
            return 'ENOSPC';
        case 'TimeoutError':
            return 'ETIMEDOUT';
        case 'ReadOnlyError':
            return 'EROFS';
        case 'DataCloneError':
        case 'EncodingError':
        case 'NotReadableError':
        case 'DataError':
        case 'TransactionInactiveError':
        case 'OperationError':
        case 'UnknownError':
        default:
            return 'EIO';
    }
}
/**
 * Handles converting errors, then rethrowing them
 * @internal
 */
function convertException(ex, path, syscall) {
    if (ex instanceof dist.ErrnoError) {
        return ex;
    }
    const code = ex instanceof DOMException ? dist.Errno[errnoForDOMException(ex)] : dist.Errno.EIO;
    const error = new dist.ErrnoError(code, ex.message, path, syscall);
    error.stack = ex.stack;
    error.cause = ex.cause;
    return error;
}

;// ./node_modules/@zenfs/dom/dist/access.js




class WebAccessFS extends (0,dist.Async)(dist.FileSystem) {
    constructor(handle) {
        super();
        this._handles = new Map();
        /**
         * @hidden
         */
        this._sync = dist.InMemory.create({ name: 'accessfs-cache' });
        this._handles.set('/', handle);
    }
    metadata() {
        return {
            ...super.metadata(),
            name: 'WebAccess',
            noResizableBuffers: true,
        };
    }
    async sync(path, data, stats) {
        const currentStats = await this.stat(path);
        if (stats.mtime !== currentStats.mtime) {
            await this.writeFile(path, data);
        }
    }
    async rename(oldPath, newPath) {
        try {
            const handle = await this.getHandle(oldPath);
            if (handle instanceof FileSystemDirectoryHandle) {
                const files = await this.readdir(oldPath);
                await this.mkdir(newPath);
                if (files.length == 0) {
                    await this.unlink(oldPath);
                }
                else {
                    for (const file of files) {
                        await this.rename((0,emulation_path/* join */.fj)(oldPath, file), (0,emulation_path/* join */.fj)(newPath, file));
                        await this.unlink(oldPath);
                    }
                }
            }
            if (!(handle instanceof FileSystemFileHandle)) {
                return;
            }
            const oldFile = await handle.getFile(), destFolder = await this.getHandle((0,emulation_path/* dirname */.pD)(newPath));
            if (!(destFolder instanceof FileSystemDirectoryHandle)) {
                return;
            }
            const newFile = await destFolder.getFileHandle((0,emulation_path/* basename */.P8)(newPath), { create: true });
            const writable = await newFile.createWritable();
            await writable.write(await oldFile.arrayBuffer());
            await writable.close();
            await this.unlink(oldPath);
        }
        catch (ex) {
            throw convertException(ex, oldPath, 'rename');
        }
    }
    async writeFile(path, data) {
        if (data.buffer.resizable) {
            throw new dist.ErrnoError(dist.Errno.EINVAL, 'Resizable buffers can not be written', path, 'write');
        }
        const handle = await this.getHandle((0,emulation_path/* dirname */.pD)(path));
        if (!(handle instanceof FileSystemDirectoryHandle)) {
            return;
        }
        const file = await handle.getFileHandle((0,emulation_path/* basename */.P8)(path), { create: true });
        const writable = await file.createWritable();
        await writable.write(data);
        await writable.close();
    }
    async createFile(path, flag) {
        await this.writeFile(path, new Uint8Array());
        return this.openFile(path, flag);
    }
    async stat(path) {
        const handle = await this.getHandle(path);
        if (!handle) {
            throw dist.ErrnoError.With('ENOENT', path, 'stat');
        }
        if (handle instanceof FileSystemDirectoryHandle) {
            return new dist.Stats({ mode: 0o777 | constants.S_IFDIR, size: 4096 });
        }
        if (handle instanceof FileSystemFileHandle) {
            const { lastModified, size } = await handle.getFile();
            return new dist.Stats({ mode: 0o777 | constants.S_IFREG, size, mtimeMs: lastModified });
        }
        throw new dist.ErrnoError(dist.Errno.EBADE, 'Handle is not a directory or file', path, 'stat');
    }
    async openFile(path, flag) {
        const handle = await this.getHandle(path);
        if (!(handle instanceof FileSystemFileHandle)) {
            throw dist.ErrnoError.With('EISDIR', path, 'openFile');
        }
        try {
            const file = await handle.getFile();
            const data = new Uint8Array(await file.arrayBuffer());
            const stats = new dist.Stats({ mode: 0o777 | constants.S_IFREG, size: file.size, mtimeMs: file.lastModified });
            return new dist.PreloadFile(this, path, flag, stats, data);
        }
        catch (ex) {
            throw convertException(ex, path, 'openFile');
        }
    }
    async unlink(path) {
        const handle = await this.getHandle((0,emulation_path/* dirname */.pD)(path));
        if (handle instanceof FileSystemDirectoryHandle) {
            try {
                await handle.removeEntry((0,emulation_path/* basename */.P8)(path), { recursive: true });
            }
            catch (ex) {
                throw convertException(ex, path, 'unlink');
            }
        }
    }
    async link(srcpath) {
        throw dist.ErrnoError.With('ENOSYS', srcpath, 'WebAccessFS.link');
    }
    async rmdir(path) {
        return this.unlink(path);
    }
    async mkdir(path) {
        const existingHandle = await this.getHandle(path);
        if (existingHandle) {
            throw dist.ErrnoError.With('EEXIST', path, 'mkdir');
        }
        const handle = await this.getHandle((0,emulation_path/* dirname */.pD)(path));
        if (!(handle instanceof FileSystemDirectoryHandle)) {
            throw dist.ErrnoError.With('ENOTDIR', path, 'mkdir');
        }
        await handle.getDirectoryHandle((0,emulation_path/* basename */.P8)(path), { create: true });
    }
    async readdir(path) {
        const handle = await this.getHandle(path);
        if (!(handle instanceof FileSystemDirectoryHandle)) {
            throw dist.ErrnoError.With('ENOTDIR', path, 'readdir');
        }
        const entries = [];
        for await (const k of handle.keys()) {
            entries.push(k);
        }
        return entries;
    }
    async getHandle(path) {
        if (this._handles.has(path)) {
            return this._handles.get(path);
        }
        let walked = '/';
        for (const part of path.split('/').slice(1)) {
            const handle = this._handles.get(walked);
            if (!(handle instanceof FileSystemDirectoryHandle)) {
                throw dist.ErrnoError.With('ENOTDIR', walked, 'getHandle');
            }
            walked = (0,emulation_path/* join */.fj)(walked, part);
            try {
                const dirHandle = await handle.getDirectoryHandle(part);
                this._handles.set(walked, dirHandle);
            }
            catch (_ex) {
                const ex = _ex;
                if (ex.name == 'TypeMismatchError') {
                    try {
                        const fileHandle = await handle.getFileHandle(part);
                        this._handles.set(walked, fileHandle);
                    }
                    catch (ex) {
                        convertException(ex, walked, 'getHandle');
                    }
                }
                if (ex.name === 'TypeError') {
                    throw new dist.ErrnoError(dist.Errno.ENOENT, ex.message, walked, 'getHandle');
                }
                convertException(ex, walked, 'getHandle');
            }
        }
        return this._handles.get(path);
    }
}
const _WebAccess = {
    name: 'WebAccess',
    options: {
        handle: {
            type: 'object',
            required: true,
            description: 'The directory handle to use for the root',
        },
    },
    isAvailable() {
        return typeof FileSystemHandle == 'function';
    },
    create(options) {
        return new WebAccessFS(options.handle);
    },
};
const WebAccess = _WebAccess;

;// ./node_modules/@zenfs/dom/dist/IndexedDB.js


function wrap(request) {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = e => {
            e.preventDefault();
            reject(convertException(request.error));
        };
    });
}
/**
 * @hidden
 */
class IndexedDBTransaction extends dist.AsyncTransaction {
    constructor(tx, store) {
        super(store);
        this.tx = tx;
        this.store = store;
        this._idb = tx.objectStore(store.name);
    }
    async keys() {
        return (await wrap(this._idb.getAllKeys())).filter(k => typeof k == 'string').map(k => BigInt(k));
    }
    get(key) {
        return wrap(this._idb.get(key.toString()));
    }
    async set(key, data) {
        await wrap(this._idb.put(data, key.toString()));
    }
    remove(key) {
        return wrap(this._idb.delete(key.toString()));
    }
    async commit() {
        if (this.done) {
            return;
        }
        const { promise, resolve, reject } = Promise.withResolvers();
        this.done = true;
        this.tx.oncomplete = () => resolve();
        this.tx.onerror = () => reject(convertException(this.tx.error));
        this.tx.commit();
        return promise;
    }
    async abort() {
        if (this.done) {
            return;
        }
        this.done = true;
        const { promise, resolve, reject } = Promise.withResolvers();
        this.tx.onabort = () => resolve();
        this.tx.onerror = () => reject(convertException(this.tx.error));
        this.tx.abort();
        return promise;
    }
}
async function createDB(name, indexedDB = globalThis.indexedDB) {
    const req = indexedDB.open(name);
    req.onupgradeneeded = () => {
        const db = req.result;
        // This should never happen; we're at version 1. Why does another database exist?
        if (db.objectStoreNames.contains(name)) {
            db.deleteObjectStore(name);
        }
        db.createObjectStore(name);
    };
    const result = await wrap(req);
    return result;
}
class IndexedDBStore {
    constructor(db) {
        this.db = db;
    }
    sync() {
        throw dist.ErrnoError.With('ENOSYS', undefined, 'IndexedDBStore.sync');
    }
    get name() {
        return this.db.name;
    }
    clear() {
        return wrap(this.db.transaction(this.name, 'readwrite').objectStore(this.name).clear());
    }
    clearSync() {
        throw dist.ErrnoError.With('ENOSYS', undefined, 'IndexedDBStore.clearSync');
    }
    transaction() {
        const tx = this.db.transaction(this.name, 'readwrite');
        return new IndexedDBTransaction(tx, this);
    }
}
/**
 * A file system that uses the IndexedDB key value file system.
 */
const _IndexedDB = {
    name: 'IndexedDB',
    options: {
        storeName: {
            type: 'string',
            required: false,
            description: 'The name of this file system. You can have multiple IndexedDB file systems operating at once, but each must have a different name.',
        },
        idbFactory: {
            type: 'object',
            required: false,
            description: 'The IDBFactory to use. Defaults to globalThis.indexedDB.',
        },
    },
    async isAvailable(idbFactory = globalThis.indexedDB) {
        try {
            if (!(idbFactory instanceof IDBFactory)) {
                return false;
            }
            const req = idbFactory.open('__zenfs_test');
            await wrap(req);
            idbFactory.deleteDatabase('__zenfs_test');
            return true;
        }
        catch (e) {
            idbFactory.deleteDatabase('__zenfs_test');
            return false;
        }
    },
    async create(options) {
        const db = await createDB(options.storeName || 'zenfs', options.idbFactory);
        const store = new IndexedDBStore(db);
        const fs = new ((0,dist.Async)(dist.StoreFS))(store);
        if (!options?.disableAsyncCache) {
            fs._sync = dist.InMemory.create({ name: 'idb-cache' });
        }
        return fs;
    },
};
const IndexedDB = _IndexedDB;

;// ./node_modules/@zenfs/dom/dist/Storage.js

/**
 * A synchronous key-value store backed by Storage.
 */
class WebStorageStore {
    get name() {
        return WebStorage.name;
    }
    constructor(storage) {
        this.storage = storage;
    }
    clear() {
        this.storage.clear();
    }
    clearSync() {
        this.storage.clear();
    }
    async sync() { }
    transaction() {
        // No need to differentiate.
        return new dist.SimpleTransaction(this);
    }
    keys() {
        return Object.keys(this.storage).map(k => BigInt(k));
    }
    get(key) {
        const data = this.storage.getItem(key.toString());
        if (typeof data != 'string') {
            return;
        }
        return (0,dist.encodeRaw)(data);
    }
    set(key, data) {
        try {
            this.storage.setItem(key.toString(), (0,dist.decodeRaw)(data));
        }
        catch (e) {
            throw new dist.ErrnoError(dist.Errno.ENOSPC, 'Storage is full.');
        }
    }
    delete(key) {
        try {
            this.storage.removeItem(key.toString());
        }
        catch (e) {
            throw new dist.ErrnoError(dist.Errno.EIO, 'Unable to delete key ' + key + ': ' + e);
        }
    }
}
/**
 * A synchronous file system backed by a `Storage` (e.g. localStorage).
 */
const _WebStorage = {
    name: 'WebStorage',
    options: {
        storage: {
            type: 'object',
            required: false,
            description: 'The Storage to use. Defaults to globalThis.localStorage.',
        },
    },
    /**
     * @todo Consider replacing `instanceof` with a duck-typing check?
     */
    isAvailable(storage = globalThis.localStorage) {
        return storage instanceof globalThis.Storage;
    },
    create({ storage = globalThis.localStorage }) {
        return new dist.StoreFS(new WebStorageStore(storage));
    },
};
const WebStorage = _WebStorage;

;// ./node_modules/@zenfs/dom/dist/index.js





/***/ }

}]);
//# sourceMappingURL=efdc680f5624c5522d5d.js.map