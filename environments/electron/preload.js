const { contextBridge, ipcRenderer } = require("electron");

const api = {
    version: () => ipcRenderer.invoke("Yukino-Version"),
    rpc: (act) => ipcRenderer.invoke("Rpc-Set", act),
    store: {
        async get(key) {
            return await ipcRenderer.invoke("Store-Get", key);
        },
        async set(key, data) {
            return await ipcRenderer.invoke("Store-Set", key, data);
        },
    },
    animeExt: {
        async search(terms) {
            return await ipcRenderer.invoke("MAL-Search", terms);
        },
        async getAnimeInfo(url) {
            return ipcRenderer.invoke("MAL-AnimeInfo", url);
        },
        async getTopAnime(type) {
            return ipcRenderer.invoke("MAL-TopAnimes", type);
        },
        async getTopAnimeType() {
            return ipcRenderer.invoke("MAL-TopAnimesTypes");
        },
        extractors: {
            anime: {
                extractors: {
                    all() {
                        return ipcRenderer.invoke("Anime-All-Sources");
                    },
                    search(plugin, terms) {
                        return ipcRenderer.invoke(
                            `Anime-${plugin}-Search`,
                            terms
                        );
                    },
                    info(plugin, url) {
                        return ipcRenderer.invoke(`Anime-${plugin}-Info`, url);
                    },
                    links(plugin, url) {
                        return ipcRenderer.invoke(
                            `Anime-${plugin}-DownloadLinks`,
                            url
                        );
                    },
                },
            },
            manga: {
                extractors: {
                    all() {
                        return ipcRenderer.invoke("Manga-All-Sources");
                    },
                    search(plugin, terms) {
                        return ipcRenderer.invoke(
                            `Manga-${plugin}-Search`,
                            terms
                        );
                    },
                    info(plugin, url) {
                        return ipcRenderer.invoke(`Manga-${plugin}-Info`, url);
                    },
                    pages(plugin, url) {
                        return ipcRenderer.invoke(`Manga-${plugin}-Pages`, url);
                    },
                    pageImage(plugin, url) {
                        return ipcRenderer.invoke(
                            `Manga-${plugin}-PageImage`,
                            url
                        );
                    },
                },
            },
        },
    },
    openExternalLink(url) {
        return ipcRenderer.invoke("Open-Externally", url);
    },
};

contextBridge.exposeInMainWorld("api", api);

document.addEventListener("DOMContentLoaded", () => {
    const minimizeBtn = document.getElementById("titlebar-minimize");
    const maximizeBtn = document.getElementById("titlebar-maximize");
    const closeBtn = document.getElementById("titlebar-close");
    const reloadBtn = document.getElementById("titlebar-reload");

    minimizeBtn.addEventListener("click", () => {
        ipcRenderer.invoke("minimize-window");
    });

    maximizeBtn.addEventListener("click", () => {
        ipcRenderer.invoke("toggle-maximize-window");
    });

    closeBtn.addEventListener("click", () => {
        ipcRenderer.invoke("close-window");
    });

    reloadBtn.addEventListener("click", () => {
        ipcRenderer.invoke("reload-window");
    });
});
