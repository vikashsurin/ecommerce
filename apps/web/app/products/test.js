console.log('hello')

const data = [
  {
    id: 1, attributes: {
      size: 1,
      color: "red",
      type: "shirt",
    },
  },
  {
    id: 2, attributes: {
      size: 3,
      color: "blue",
    },
  },
  {
    id: 3, attributes: {
      size: 4,
      color: "green",
    },
  },
]


function getKeys(data) {
  return data.map(item => item.attributes).flat().reduce((acc, curr) => {
    return [...acc, ...Object.keys(curr)]
  }, []).filter((key, index, arr) => arr.indexOf(key) === index)
}


const keys = getKeys(data)


console.log({ keys })
