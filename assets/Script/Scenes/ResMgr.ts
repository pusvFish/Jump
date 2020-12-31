export default class ResMgr {
    private allCache: any = {};
    private static instance: ResMgr = null;
    private constructor() {
        this.allCache = {
            spriteFrame: new Map(),
            prefab: new Map(),
            audioClip: new Map(),
            atlas: new Map(),
            tiledMap: new Map()
        };

    }

    static getInstance(): ResMgr {
        if (!ResMgr.instance) {
            ResMgr.instance = new ResMgr();
        }
        return ResMgr.instance;
    }

    addData(type: string, key: string, data) {
        if (!type || typeof type != "string" || !key || typeof key != "string" || !data) {
            return;
        }

        let cache = this.allCache[type];
        cache.set(key, data);
    }

    getData(type: string, key: string) {
        if (!type || typeof type != "string" || !key || typeof key != "string") {
            return null;
        }

        let cache = this.allCache[type];
        return cache.get(key);
    }

    getPrefab(key: string) {
        return this.getData('prefab', key);
    }

    getAudioClip(key: string) {
        return this.getData('audioClip', key);
    }

    getTiledMap(key: string) {
        return this.getData('tiledMap', key);
    }

    getSpriteFrame(key: string, atlasName: string) {
        let spriteFrame;
        spriteFrame = this.getData('spriteFrame', key);
        if (spriteFrame) {
            return spriteFrame;
        }

        if (atlasName && typeof (atlasName) == 'string') {
            let atlas = this.getData('atlas', atlasName);
            if (!atlas) {
                return null;
            }
            spriteFrame = atlas.getSpriteFrame(key);
            if (spriteFrame) {
                return spriteFrame;
            }
        }


        let arrAtlas = Array.from(this.allCache.atlas.values());
        for (let value of arrAtlas) {
            let atlas = value as cc.SpriteAtlas;
            spriteFrame = atlas.getSpriteFrame(key);
            if (spriteFrame) {
                return spriteFrame;
            }
        }

        return null;
    }
}


