<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label
          for="wallet"
          class="block text-sm font-medium text-gray-700"
        >Тикер</label>
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            id="wallet"
            v-model="ticker"
            type="text"
            name="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
            @keydown.enter="add"
          >
        </div>
        <div class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
          <span
            v-for="tickerTip in tickerTips"
            :key="tickerTip.Id"
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
            @click="clickTickerTip(tickerTip)"
          >
            {{ tickerTip.Symbol }}
          </span>
        </div>
        <div
          v-if="tickerExists"
          class="text-sm text-red-600"
        >
          Такой тикер уже добавлен
        </div>
      </div>
    </div>
    <add-button
      type="button"
      :disabled="disabled"
      class="my-4"
      @click="add"
    />
  </section>
</template>
<script>
import AddButton from "./AddButton.vue";

export default {
  components: {
    AddButton,
  },

  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    allTickerTips: {
      type: Array,
      required: false,
      default: () => [],
    },
    tickers: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  emits: {
    "add-ticker": (value) => typeof value === "string" && value.length > 0,
  },

  data() {
    return {
      ticker: "",
      tickerTips: [],
      tickerExists: false,
    };
  },

  watch: {
    ticker(currentTicker) {

      this.tickers.forEach((ticker) => {
        this.tickerExists = currentTicker && ticker.name.includes(currentTicker) ? true : false
      });

      const regex = new RegExp(currentTicker, "gi");
      this.tickerTips = this.allTickerTips
        .filter(
          (ticker) =>
            ticker.FullName?.match(regex) || ticker.Symbol?.match(regex)
        )
        .slice(0, 5);
    },
    allTickerTips() {
      this.tickerTips = this.allTickerTips.slice(0, 5);
    },
  },

  methods: {
    sendTicker(currentTicker) {
      this.$emit("add-ticker", currentTicker);
      this.ticker = "";
    },
    add() {
      if (this.ticker) {
        this.sendTicker(this.ticker)
      }
    },
    clickTickerTip(currentTicker) {
      this.tickers.forEach((ticker) => {
        if (ticker.name.includes(currentTicker.FullName))
          this.tickerExists = true;
      });


      if (!this.tickerExists) {
        this.sendTicker(currentTicker?.FullName)
      }
    }
  },
};
</script>
