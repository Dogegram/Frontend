import react from 'react'

const nFormatter = (num, digits, string) => {
    if(num === undefined || num === null || num === 0 ){
      return string ? '0' : 0
    }
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: " * 10^15" },
        { value: 1e18, symbol: " * 10^18" }
      ];
      
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

export default nFormatter