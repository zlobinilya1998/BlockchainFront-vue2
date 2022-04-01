import $api from "@/services/Infrastructure/Api";

export default class BlockchainService {
    static baseUrl = $api.defaults.baseURL + '/bc';
    static async getSymbols(){
        const { data } = await $api.get(this.baseUrl + '/symbols');
        return data;
    }
    static async getSymbolInfo(symbol: string){
        const { data } = await $api.get(this.baseUrl + `/symbols/${symbol}`)
        return data;
    }
    static async getSymbolsList(){
        const { data } = await $api.get(this.baseUrl + `/symbolsList`)
        return data.result;
    }
}
