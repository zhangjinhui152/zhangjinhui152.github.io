import { defineStore } from 'pinia'
type DataJson = {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    img: string;
    tags: string[];
    content: string;
}

export const useDataJson = defineStore('dataJSon', {
    
    state: () => ({ dataJSon: Array.of<DataJson>() }),
    getters: {
        getData: (state) => state.dataJSon,
    },
    actions: {
        setData(json: DataJson[]) {
            this.dataJSon = json
        },
    },
})