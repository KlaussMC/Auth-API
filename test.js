let format = str => {
	return JSON.stringify(typeof str != "object" ? {
		output: str
	} : { ...str
	})
}

console.log(format({
	value: 12,
	amount: 5
}))