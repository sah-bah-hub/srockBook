export const useCurrencyPair = defineStore('currencyPairStore', () => {
    class historyItem {
        new: string | undefined;
        old: string | undefined;
        changeTime: string | undefined;
    }
    const history: Ref<historyItem[]> = ref([]);

    const currentPair: Ref<String> = ref('BTCUSDT')  

    watch(currentPair, (cur, old) => {
        history.value.push({
            new: String(cur),
            old:String(old),
            changeTime: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
        })
        localStorage.setItem('history', JSON.stringify(history.value))
        localStorage.setItem('currentPair', String(currentPair.value))
    })


    onMounted(() => {
        const historyInLocalStorage = localStorage.getItem('history')
        if (historyInLocalStorage) {
            history.value = JSON.parse(historyInLocalStorage);
        }
        const currentPairInLocalStorage = localStorage.getItem('currentPair')
        if (currentPairInLocalStorage) {
            currentPair.value = currentPairInLocalStorage;
        }
    })
    return { history, currentPair }
})